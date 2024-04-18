<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-lg-12" style="margin-bottom: 15px">
        <h3 class="trend-tops-title">Series</h3>
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

export default {
  name: "series",
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
      const url = `https://api.themoviedb.org/3/trending/tv/${timeWindow}`;

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
