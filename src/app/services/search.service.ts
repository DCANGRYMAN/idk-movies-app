// search.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiKey = '7cae5a17235db1e562be2395a2096779';
const apiUrl = 'https://api.themoviedb.org/3/search/movie';
const youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
const tmdbImageUrl = 'https://image.tmdb.org/t/p/w500';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<any> {
    const url = `${apiUrl}?api_key=${apiKey}&query=${query}`;
    return this.http.get(url);
  }

  getMovieRatings(movieId: number): Observable<any> {
    const ratingUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`;
    return this.http.get(ratingUrl);
  }

  getYouTubeTrailer(movieId: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
    return this.http.get(url);
  }

  openYoutubeTrailer(trailerKey: string): void {
    window.open(`${youtubeBaseUrl}${trailerKey}`, '_blank');
  }

  getTmdbImageUrl(posterPath: string): string {
    return `${tmdbImageUrl}${posterPath}`;
  }
}
