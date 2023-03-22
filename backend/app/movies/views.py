import json
import requests
import environ

import os
from django.conf import settings
from pymongo import MongoClient
from bson.json_util import dumps, loads
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

# environment variables configuration
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# machine learning stuff
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# tokenizer = AutoTokenizer.from_pretrained("mrm8488/t5-base-finetuned-emotion")
# tokenizer.save_pretrained("tokenizer")
# model = AutoModelForSequenceClassification.from_pretrained("mrm8488/t5-base-finetuned-emotion")

connection_string = "mongodb://localhost:27017"
opensubtitles_api_key = "ITWoYHcIuEH5NEWIGrZb3ZBkW2vKjSTO"
client = MongoClient(connection_string)

# database stuff
db = client["genresights"]
collection_movies = db["movies"]
collection_movies_genre_pages_downloaded = db["movies_genre_pages_downloaded"]

# tmbd api url
tmdb_api_base = "https://api.themoviedb.org/3/"
tmdb_discover = "discover/movie"


def get_data(data):
    data['_id'] = str(data['_id'])
    return data


@api_view(['GET'])
def getMovies(request):
    data = [get_data(i) for i in collection_movies.find(
        {"original_language": "en"})]
    return Response(data)


@api_view(['GET'])
def getMoviesGenrePagesDownloaded(request):
    data = [get_data(i) for i in collection_movies_genre_pages_downloaded.find(
        {"genre": 28})]
    return Response(data[0])


@api_view(['POST'])
def downloadMoviesFromGenre(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            start_range = data["start_range"]
            end_range = data["end_range"]
            genre = data["genre"]

            movie_data = [get_data(i) for i in collection_movies_genre_pages_downloaded.find(
                {"genre": genre})]

            for i in range(start_range, end_range + 1):
                if i not in movie_data[0]['pages']:
                    # req = requests.get(tmdb_api_base + tmdb_discover + ("?api_key={key}&language={lang}&page={page}&with_genres={genre}").format(key = "5f10f3a4c56bb99149a2c33ce3c77aae", lang="en-US", page=str(i), genre=genre))
                    res = requests.get(
                        ("https://api.themoviedb.org/3/discover/movie?api_key={tmdb_api_key}&language=en-US&page=" + str(i) + "&with_genres=28").format(tmdb_api_key=env('TMDB_API_KEY')))
                    try:
                        json_res = json.loads(res.content)
                        print(json_res["page"])
                        collection_movies.insert_many(json_res["results"])
                        print("finished: " + str(i))
                    except:
                        print("failed: " + str(i))
            response = {"message": "sucessful"}
            return Response(response)
        except:
            response = {"message": "request cannot be processed"}
            return Response(response, 400)


@api_view(['POST'])
def downloadsubtitle(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            tmdb_id = data['tmdb_id']
            auth_token = data['auth_token']
            file_name = data['file_name']
            url = "https://api.opensubtitles.com/api/v1/subtitles?tmdb_id={tmdb_id}?languages=en".format(
                tmdb_id=tmdb_id)
            headers = {"Api-Key": opensubtitles_api_key,
                       "Content-Type": "application/json"}

            # get the subtitle file id
            res = requests.get(url, headers=headers)
            json_res = json.loads(res.content)
            file_id = json_res["data"][0]["attributes"]["files"][0]["file_id"]

            # downloaded the subtitle by file id
            url = "https://api.opensubtitles.com/api/v1/download"
            headers = {"Authorization": auth_token,
                       "Api-Key": opensubtitles_api_key, "Content-Type": "application/json"}
            json_payload = {"file_id": file_id, "file_name": file_name}
            res = requests.post(url=url, json=json_payload, headers=headers)
            json_res = json.loads(res.content)
            file_link = json_res["link"]

            response = requests.get(file_link)

            if response.status_code != requests.codes.ok:
                response = {"message": "request cannot be processed"}
                return Response(response, 400)

            content = ContentFile(response.content)

            default_storage.save(
                "subtitles/{file_name}.srt".format(file_name=file_name), content)

            collection_movies.update_one(
                {"id": tmdb_id}, {"$set": {"subtitle_downloaded": True}})

            response = {"message": "sucessful"}
            return Response(response)
        except:
            response = {"message": "request cannot be processed"}
            return Response(response, 400)


@api_view(["GET"])
def getTotalMoviesCount(request):
    if request.method == "GET":
        try:
            # if request.GET.get("id"):
            #     movies_count = collection_movies.count_documents(
            #         {"id": request.GET.get("id")})
            # else:
            movies_count = collection_movies.count_documents({})
            # movies_count = 1

            response = {
                "message": "successfull",
                "result": movies_count
            }
            return Response(response)
        except:
            response = {"message": "request cannot be processed"}
            return Response(response, 400)


@api_view(["GET"])
def getPopularMovies(request):
    if request.method == "GET":
        try:
            res = requests.get(tmdb_api_base + "movie/popular?api_key={tmdb_api_key}".format(tmdb_api_key = env("TMDB_API_KEY")))
            return Response(res)
        except:
            response = {"message": "request cannot be processed"}
            return Response(response, 400)
