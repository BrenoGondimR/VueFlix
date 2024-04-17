<template>
  <div class="py-4 container-fluid">
    <!-- Header with logo and stylish cut with shadow -->
    <div class="row home-header align-items-center">
      <div class="col-lg-4">
        <img class="vueflix-logo" src="@/assets/img/Vue-removebg-preview.png" alt="VueFlix Logo">
      </div>
      <div class="col-lg-8 header-text-container">
        <h1 class="header-title">Discover. Watch. Get Inspired.</h1>
        <p class="header-description">
          VueFlix brings you a diverse universe of entertainment. From blockbuster hits to indie gems, find trailers, exclusive insights, and behind-the-scenes that teleport you right into the stories you love. Dive into the worlds you’ve yet to explore, all from the comfort of your home.
        </p>
      </div>
    </div>

    <!-- Trending section -->
    <div class="row">
      <div class="col-lg-12" style="margin-bottom: 15px">
        <h3 class="trend-tops-title">Trending Tops</h3>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in trendingItems" :key="item.id" style="margin-bottom: 35px;">
        <movie-card
            :image-url="item.imageUrl"
            :title="item.originalTitle"
            :release-date="item.releaseDate"
            @click.native="goToDetails(item.id, item.mediaType)"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import MovieCard from "@/components/MovieSerieCard.vue";

export default {
  name: "home",
  components: {
    MovieCard

  },
  data() {
    return {
      trendingItems: []
    };
  },
  mounted() {
    this.fetchTrendingItems();
  },
  methods: {
    goToDetails(id, mediaType) {
      this.$router.push({ name: 'details', params: { id: id, mediaType: mediaType } });
    },
    async fetchTrendingItems() {
      const timeWindow = 'week'; // or 'day'
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
          imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`
        }));
      } catch (error) {
        console.error('Error fetching trending items:', error);
      }
    }
  }
};
</script>
<style>
.home-header {
  position: relative;
  margin-bottom: 3rem;
}

.vueflix-logo {
  max-width: 100%;
  height: auto;
}

.header-text-container {
  background: #121124; /* Deep background color for text contrast */
  padding: 2rem;
  border-radius: 15px;
  position: relative;
  box-shadow: -10px 0px 17px 0 rgb(110, 53, 68); /* Shadow on the cut */
}

.header-title {
  color: #e52a5a; /* VueFlix primary color */
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header-description {
  color: #ffffff; /* Light text for dark backgrounds */
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 500px; /* Ensures text readability */
}

@media (max-width: 991px) {
  .home-header {
    text-align: center;
  }

  .vueflix-logo {
    margin-bottom: 2rem;
  }

  .header-text-container {
    box-shadow: none; /* Remove the shadow for smaller devices */
    text-align: left;
  }

  .header-title {
    font-size: 2rem;
  }
}
</style>
