<template>
  <div class="py-4 container-fluid">
    <!-- Header with logo and stylish cut with shadow -->
    <div class="row home-header align-items-center">
      <div class="movie-details">
        <div class="movie-background" v-if="featuredMovie.backdropUrl">
          <img :src="featuredMovie.backdropUrl" alt="Movie Background" />
        </div>
        <div class="movie-info" v-if="featuredMovie.originalTitle">
          <h1 style="color:#e52a5a">{{ featuredMovie.originalTitle }}</h1>
          <div class="movie-meta">
            <span class="movie-year">Popularity: {{ featuredMovie.popularity }}</span>
          </div>
          <p class="movie-description" :class="{ 'typing-complete': isTypingComplete }">{{ typingDescription }}</p>
          <div class="movie-actions">
            <button class="btn-trailer" @click="openModal">Trailer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending section -->
    <div class="row">
      <div class="col-lg-12" style="margin-bottom: 15px">
        <h3 class="trend-tops-title">Trending Tops</h3>
        <ModalVideo
            :show-modal="showModal"
            :video-link="trailerLink"
            @close="showModal = false"
        ></ModalVideo>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in trendingItems" :key="item.id" style="margin-bottom: 35px;">
        <movie-card
            :id="item.id"
            :image-url="item.imageUrl"
            :title="item.originalTitle"
            :release-date="item.releaseDate"
            :content-type="item.mediaType"
            @click.native="goToDetails(item.id, item.mediaType)"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import MovieCard from "@/components/MovieSerieCard.vue";
import ModalVideo from "@/components/ModalVideo.vue";


export default {
  name: "home",
  components: {
    MovieCard,
    ModalVideo

  },
  data() {
    return {
      trendingItems: [],
      featuredMovie: {
        id: '',
        mediaType: '',
        backdropUrl: '',
        originalTitle: '',
        overview: '',
        releaseDate: '',
        popularity: ``,
      },
      typingDescription: '',
      typingSpeed: 20,
      isTypingComplete: false,
      showModal: false,
      trailerLink: '',
    };
  },
  mounted() {
    this.fetchTrendingItems();
    this.fetchTrendingItems().then(() => {
      this.typeDescription(this.featuredMovie.overview);
    });
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    goToDetails(id, mediaType) {
      this.$router.push({ name: 'details', params: { id: id, mediaType: mediaType } });
    },
    typeDescription(description) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < description.length) {
          this.typingDescription += description.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          this.isTypingComplete = true;
        }
      }, this.typingSpeed);
    },
    async fetchTrendingItems() {
      const timeWindow = 'week';
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2I0MWQ2ZjIzNGNkZjg0YTI1ZjM3NzE3NzRiNTg5ZSIsInN1YiI6IjY2MWVhYWJkNmQ5ZmU4MDE3ZDYwNzRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJmwB2TgtKxYLQCt0HLtsyqLnV060M5Epe0o_HY19hM'; // Replace with your TMDB API key
      const url = `https://api.themoviedb.org/3/trending/all/${timeWindow}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.trendingItems = response.data.results.map(item => ({
          mediaType: item.media_type,
          originalTitle: item.original_title || item.original_name,
          releaseDate: item.release_date || item.first_air_date,
          voteAverage: item.vote_average,
          id: item.id,
          imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          backdrop_path_url: item.backdrop_path,
          overview: item.overview,
          popularity: item.popularity
        }));
        if (this.trendingItems.length) {
          const mostRecentMovie = this.trendingItems[0];
          this.featuredMovie = {
            backdropUrl: `https://image.tmdb.org/t/p/original${mostRecentMovie.backdrop_path_url}`,
            originalTitle: mostRecentMovie.originalTitle,
            overview: mostRecentMovie.overview,
            mediaType: mostRecentMovie.mediaType,
            id: mostRecentMovie.id,
            releaseDate: mostRecentMovie.releaseDate,
            popularity: mostRecentMovie.popularity,
          };
        }
      } catch (error) {
        console.error('Error fetching trending items:', error);
      }
      const videosUrl = `https://api.themoviedb.org/3/movie/${this.featuredMovie.id}/videos`;
      try {
        const videoResponse = await axios.get(videosUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const trailer = videoResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailerLink = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      } catch (error) {
        console.error('Error fetching movie videos:', error);
      }
    }
  }
};
</script>
<style scoped>
.home-header {
  position: relative;
  margin-bottom: 3rem;
}

.movie-details {
  position: relative;
  color: white;
  height: 60vh;
  width: 100%;
  text-align: left;
}

.movie-background img {
  height: 60vh;
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  filter: blur(2px);
  opacity: 0.5;
}

.movie-description {
  position: relative;
  white-space: pre-wrap; /* Preserve whitespace and wrap text */
}

.movie-description::after {
  content: '|';
  position: absolute;
  right: -2px; /* Position cursor at the end of the text */
  animation: blink 1s infinite;
}

.movie-description::after {
  content: '|';
  animation: blink 1s infinite;
}

.typing-complete::after {
  /* Removendo a barra ao finalizar a digitação */
  content: '';
  animation: none;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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

.home-header .movie-details::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 20%; /* Altura do fade-out */
  background: linear-gradient(to bottom, transparent, #121124); /* Gradiente de transparente para a cor de fundo da página */
  z-index: 1;
}


</style>
