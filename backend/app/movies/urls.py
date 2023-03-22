from django.urls import path
from movies import views

urlpatterns = [
    path('', views.getMovies),
    path('moviesGenrePagesDownloaded', views.getMoviesGenrePagesDownloaded),
    path('downloadMoviesFromGenre', views.downloadMoviesFromGenre),
    path('downloadSubtitle', views.downloadsubtitle),
    path('getTotalMoviesCount', views.getTotalMoviesCount),
    path('getPopularMovies', views.getPopularMovies)
]
