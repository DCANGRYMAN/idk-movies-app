// search.component.ts

import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchInput: string = '';
  movieResults: any[] = [];
  noResultsMsg: string = '';

  constructor(private searchService: SearchService) {}

  searchMovies() {
    this.searchService.searchMovies(this.searchInput).subscribe((data: any) => {
      this.movieResults = data.results.map((movie: { poster_path: any }) => ({
        ...movie,
        poster_path: this.searchService.getTmdbImageUrl(movie.poster_path),
      }));

      this.getMovieRatings();
      this.updateNoResultsMsg();
    });
  }

  getMovieRatings() {
    this.movieResults.forEach((movie, index) => {
      this.searchService.getMovieRatings(movie.id).subscribe((data: any) => {
        const releaseDates = data.results.find(
          (result: any) => result.iso_3166_1 === 'US'
        );
        this.movieResults[index].rating = releaseDates
          ? releaseDates.release_dates[0].certification
          : 'N/A';
      });
    });
  }

  openYoutubeTrailer(movieId: number) {
    this.searchService.getYouTubeTrailer(movieId).subscribe((data: any) => {
      if (data.results.length > 0) {
        const trailerKey = data.results[0].key;
        this.searchService.openYoutubeTrailer(trailerKey);
      } else {
        alert('Trailer não encontrado.');
      }
    });
  }

  updateNoResultsMsg() {
    this.noResultsMsg =
      this.movieResults.length === 0 ? 'Nenhum resultado encontrado.' : '';
  }
}
