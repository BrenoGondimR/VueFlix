<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-lg-12" style="margin-bottom: 15px">
        <h3 class="trend-tops-title">Favorites</h3>
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


import MovieCard from "@/components/MovieSerieCard.vue";
import axios from "axios";

export default {
  name: "favorites",
  components: {
    MovieCard

  },
  data() {
    return {
      trendingItems: []
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    goToDetails(id, mediaType) {
      console.log(mediaType)
      this.$router.push({ name: 'details', params: { id: id, mediaType: mediaType } });
    },
    async fetchFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      for (let favorite of favorites) {
        await this.fetchItemDetails(favorite.mediaType, favorite.id);
      }
    },
    async fetchItemDetails(mediaType, id) {
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2I0MWQ2ZjIzNGNkZjg0YTI1ZjM3NzE3NzRiNTg5ZSIsInN1YiI6IjY2MWVhYWJkNmQ5ZmU4MDE3ZDYwNzRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJmwB2TgtKxYLQCt0HLtsyqLnV060M5Epe0o_HY19hM'; // Replace with your TMDB API key
      let url = `https://api.themoviedb.org/3/${mediaType}/${id}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.trendingItems.push({
          mediaType: mediaType,
          originalTitle: response.data.original_title || response.data.original_name,
          releaseDate: response.data.release_date || response.data.first_air_date,
          voteAverage: response.data.vote_average,
          id: response.data.id,
          imageUrl: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        });
        console.log(this.trendingItems)
      } catch (error) {
        console.error(`Error fetching details for ${mediaType} with id ${id}:`, error);
      }
    }

  }
};
</script>
