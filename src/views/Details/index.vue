<template>
  <div class="movie-details">
    <!-- The background image from the fetched movieDetails data -->
    <div class="movie-background" v-if="movieDetails.backdropUrl">
      <img :src="movieDetails.backdropUrl" alt="Movie Background" />
    </div>

    <div class="movie-info" v-if="movieDetails.title">
      <h1>{{ movieDetails.title }}</h1>
      <div class="movie-meta">
        <span class="movie-year">{{ movieDetails.releaseYear }}</span>
        <span class="movie-rating">{{ movieDetails.voteAverage }}/10</span>
        <span class="movie-duration">{{ movieDetails.duration }}</span>
      </div>
      <p class="movie-description">{{ movieDetails.overview }}</p>
      <div class="movie-actions">
        <button class="btn-trailer">Trailer</button>
        <button class="btn-save">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MovieDetails",
  data() {
    return {
      movieDetails: {
        backdropUrl: '',
        title: '',
        releaseYear: '',
        voteAverage: '',
        duration: '',
        overview: '',
        tagline: '',
      },
    };
  },
  async beforeRouteEnter(to, from, next) {
    const { id, mediaType } = to.params;
    if (mediaType === 'movie') {
      next(vm => vm.fetchMovieDetails(id));
    } else if (mediaType === 'tv') {
      next(vm => vm.fetchTVDetails(id));
    }
  },
  methods: {
    async fetchMovieDetails(movieId) {
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2I0MWQ2ZjIzNGNkZjg0YTI1ZjM3NzE3NzRiNTg5ZSIsInN1YiI6IjY2MWVhYWJkNmQ5ZmU4MDE3ZDYwNzRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJmwB2TgtKxYLQCt0HLtsyqLnV060M5Epe0o_HY19hM'; // Replace with your TMDB API key
      const url = `https://api.themoviedb.org/3/movie/${movieId}&language=en-US`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data;
        this.movieDetails = {
          backdropUrl: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          title: data.title,
          releaseYear: new Date(data.release_date).getFullYear().toString(),
          voteAverage: data.vote_average,
          duration: `${data.runtime} min`,
          overview: data.overview,
          tagline: data.tagline,
        };
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    async fetchTVDetails(seriesId) {
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2I0MWQ2ZjIzNGNkZjg0YTI1ZjM3NzE3NzRiNTg5ZSIsInN1YiI6IjY2MWVhYWJkNmQ5ZmU4MDE3ZDYwNzRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJmwB2TgtKxYLQCt0HLtsyqLnV060M5Epe0o_HY19hM'; // Replace with your TMDB API key
      const url = `https://api.themoviedb.org/3/tv/${seriesId}&language=en-US`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data;
        this.movieDetails = {
          backdropUrl: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          title: data.name,
          releaseYear: new Date(data.first_air_date).getFullYear().toString(),
          voteAverage: data.vote_average,
          duration: `${data.number_of_episodes} Episodes`,
          overview: data.overview,
          tagline: data.tagline || '',
        };
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    }
  }
};
</script>

<style scoped>
.movie-details {
  position: relative;
  color: white;
  height: 100vh;
  width: 100%;
  text-align: left;
}

.movie-background img {
  height: 100vh;
  width: 100%;
  object-fit: cover;
  filter: blur(8px);
  opacity: 0.5;
}

.movie-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}

.movie-meta {
  display: flex;
  gap: 2rem;
  font-size: 1.2rem;
}

.movie-meta .movie-rating,
.movie-meta .movie-duration {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

.movie-actions {
  margin-top: 2rem;
}

.btn-trailer,
.btn-save {
  background-color: #e52a5a;
  border: none;
  padding: 1rem 2rem;
  margin-right: 1rem;
  border-radius: 20px;
  cursor: pointer;
  color: white;
}

.btn-trailer:hover,
.btn-save:hover {
  opacity: 0.8;
}

.movie-description {
  max-width: 600px;
  margin-top: 1rem;
}
</style>
