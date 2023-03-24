from pysubparser import parser
from transformers import AutoTokenizer, AutoModelWithLMHead
from pysubparser.cleaners import brackets, formatting, lower_case

import json
import numpy as np
import pandas as pd

from tqdm import tqdm
from collections import Counter

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, RegexpTokenizer

import seaborn as sns
import matplotlib.pyplot as plt

# update this location to where your saved model is
model_location = "../../requirements/model"
tokenizer_location = "../../requirements/tokenizer"

# getting tokenizers and model
model = AutoModelWithLMHead.from_pretrained(model_location)
tokenizer = AutoTokenizer.from_pretrained(tokenizer_location)

# initializing requirements
stop_words = stopwords.words("english")
punctiation_tokenizer = RegexpTokenizer(r'\w+')
bad_words = pd.read_csv(
    '../../requirements/bad-words.csv', header=None)[0].tolist()

# helper funtions


def remove_duplicates(input):
    unique_words = Counter(input)
    result = unique_words.keys()
    return result

# function to get emotion from subtitle text


def get_emotion(text):
    input_ids = tokenizer.encode(text + '</s>', return_tensors='pt')
    output = model.generate(input_ids=input_ids, max_length=2)
    dec = [tokenizer.decode(ids) for ids in output]
    label = dec[0]
    label = label.replace("<pad> ", "")
    return label

# function to break the subtitle file into chunks of text


def generate_subtitle_group(number_of_subtitles, movie_name):
    subtitles = parser.parse(movie_name)
    subtitles = brackets.clean(lower_case.clean(formatting.clean(subtitles)))
    subtitles = list(subtitles)

    result = []

    subtitles_groups = [subtitles[i:i + number_of_subtitles]
                        for i in range(0, len(subtitles), number_of_subtitles)]

    for subtitles_group in subtitles_groups:
        start_time = subtitles_group[0].start
        end_time = subtitles_group[-1].end
        sentences = []

        for subtitle in subtitles_group:
            sentences.append(subtitle.text)

        subtitle_data = {
            "text": " ".join(sentences),
            "start_time": start_time,
            "end_time": end_time
        }

        result.append(subtitle_data)
    return result

#  function to generate emotoins for given subtitle chunks


def generate_emotion_and_profanity_dataset(movie_data):
    result_data = []

    for subtitle_text_group in tqdm(movie_data):
        text = subtitle_text_group["text"]
        start_time = subtitle_text_group["start_time"]
        end_time = subtitle_text_group["end_time"]
        emotion = get_emotion(text)

        bag_of_words = generate_bag_of_words(text)
        all_profanity_words = get_all_profanity_words(bag_of_words)
        unique_profanity_words = get_unique_profanity_words(
            all_profanity_words)

        data = {
            "text": text,
            "start_time": start_time,
            "end_time": end_time,
            "emotion": emotion,
            "all_profanity_words": all_profanity_words,
            "unique_profanity_words": list(unique_profanity_words),
            "all_profanity_words_count": len(all_profanity_words),
            "unique_profanity_words_count": len(unique_profanity_words)

        }

        result_data.append(data)
    return result_data

# function to generate bins of subtitle emotion array


def generate_bins(size, subtitle_array):
    result = np.array_split(subtitle_array, size)
    return result

# function to get emotion distribution in each bin


def get_bin_emotions(bin_array):
    emotions = []
    for bin in bin_array:
        bin_dict = bin["emotion"].value_counts().to_dict()
        joy_count = bin_dict.get("joy", 0)
        anger_count = bin_dict.get("anger", 0)
        sadness_count = bin_dict.get("sadness", 0)
        love_count = bin_dict.get("love", 0)
        fear_count = bin_dict.get("fear", 0)
        surprise_count = bin_dict.get("surprise", 0)
        emotions.append([joy_count, anger_count, sadness_count,
                        love_count, fear_count, surprise_count])
    return emotions

# function to get profanity distribution in each bin


def get_bin_profanity(bin_array):
    punctiation_tokenizer = RegexpTokenizer(r'\w+')
    result = []
    for bin in bin_array:
        text = " ".join(list(bin["text"]))
        cleaned_text = punctiation_tokenizer.tokenize(text)
        cleaned_text = [
            word for word in cleaned_text if word not in stop_words]
        unique_bad_words_present = [
            word for word in cleaned_text if word in bad_words]
        result.append(len(unique_bad_words_present))

# function to generate bag of words from text block


def generate_bag_of_words(text_block):
    bag_of_words = punctiation_tokenizer.tokenize(text_block)
    bag_of_words = [word for word in bag_of_words if word not in stop_words]
    return bag_of_words

# function to find total profanity words in bag of words


def get_all_profanity_words(word_array):
    all_profanity_words = [word for word in word_array if word in bad_words]
    return all_profanity_words

# function to find unique profanity words in total profanity words array


def get_unique_profanity_words(word_array):
    unique_profanity_words = remove_duplicates(word_array)
    return unique_profanity_words

# main funtion to generate movie analysis data


def generate_analysis_data(subtitle_file):
    movie_data = generate_subtitle_group(5, subtitle_file)
    result_data = generate_emotion_and_profanity_dataset(movie_data)
    return result_data
