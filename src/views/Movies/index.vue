<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <movie-card
            image-url="url-to-image.jpg"
            title="Daredevil"
            studio="Marvel Studio"
            release-date="Release Date Here"
            average-rating="4.8">
        </movie-card>
      </div>
    </div>
  </div>
</template>

<script>


import MovieCard from "@/components/MovieSerieCard.vue";

export default {
  name: "movies",
  components: {
    MovieCard

  },
  data() {
    return {

    };
  },
};
</script>
