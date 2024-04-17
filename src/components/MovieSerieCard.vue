<template>
  <div class="movie-card">
    <div class="movie-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
    <div class="movie-content">
      <div>
        <h3 class="movie-title">{{ title }}</h3>
        <p class="movie-studio">{{ formatDate(releaseDate) }}</p>
        <Button class="button-favorite" icon="pi pi-heart" outlined></Button>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
export default {
  name: 'MovieCard',
  components: {
    Button,
  },
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    },
  },
  methods: {
    formatDate(dateString) {
      // Assuming dateString is in YYYY-MM-DD format
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY format
    },
  }
}
</script>

<style scoped>
.movie-card {
  max-width: 365px;
  border-radius: 20px;
  margin: auto;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  color: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out; /* Smooth transition for box-shadow and transform */
}

.movie-card:hover {
  transform: translateY(-5px); /* Move the card up slightly */
  box-shadow: 0px 15px 20px rgba(108, 108, 108, 0.4); /* Increase the shadow size */
}

.movie-image {
  width: 100%;
  height: 530px;
  background-size: cover;
  background-position: center;
  display: block; /* Add this line if you decide to use img tag instead */
  object-fit: cover; /* Ensures that the image covers the area without losing aspect ratio */
}

.movie-content {
  position: absolute;
  display: flex;
  justify-content: space-between;
  opacity: 90%;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  width: 95%;
  padding: 10px;
  left: 8px;
  bottom: 8px;
}

.movie-title {
  font-size: 1.2rem;
  margin: 0;
}

.movie-studio {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 1px;
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
