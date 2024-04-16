<template>
  <div class="movie-card">
    <div class="movie-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
    <div class="movie-content">
      <h3 class="movie-title">{{ title }}</h3>
      <p class="movie-studio">{{ studio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    studio: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    },
    averageRating: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style scoped>
.movie-card {
  max-width: 245px;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  color: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out; /* Smooth transition for box-shadow and transform */
}

.movie-card:hover {
  transform: translateY(-5px); /* Move the card up slightly */
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.4); /* Increase the shadow size */
}

.movie-image {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
}

.movie-content {
  position: absolute;
  bottom: 0;
  opacity: 50%;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 10px;
}

.movie-title {
  font-size: 1.2rem;
  margin: 0;
}

.movie-studio {
  font-size: 0.8rem;
  opacity: 0.7;
}

.movie-rating {
  display: flex;
  align-items: center;
}

.movie-score {
  background: #ff0;
  color: #000;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
}

</style>
