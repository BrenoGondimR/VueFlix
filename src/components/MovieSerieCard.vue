<template>
  <div class="movie-card">
    <div class="movie-image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
    <div class="movie-content">
      <div>
        <h3 class="movie-title">{{ title }}</h3>
        <p class="movie-studio">{{ formatDate(releaseDate) }}</p>
        <Button @click="toggleFavorite(contentType, id)" class="button-favorite" :icon="isFavorited ? 'pi pi-heart-fill' : 'pi pi-heart'" :class="{ 'favorited': isFavorited }" outlined></Button>
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
    contentType: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavorited: false,
    };
  },
  created() {
    this.checkFavorite();
  },
  methods: {
    checkFavorite() {
      const storageKey = 'favorites';
      const favorites = JSON.parse(localStorage.getItem(storageKey)) || [];
      this.isFavorited = favorites.some(fav => fav.id === this.id && fav.mediaType === this.contentType);
    },
    formatDate(dateString) {
      // Assuming dateString is in YYYY-MM-DD format
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY format
    },
    toggleFavorite(mediaType, id) {
      const storageKey = 'favorites';
      // Tenta buscar os favoritos existentes do localStorage ou começa com uma lista vazia
      let favorites = JSON.parse(localStorage.getItem(storageKey)) || [];
      const favoriteItem = { mediaType, id };

      // Verifica se o item já está na lista de favoritos
      const index = favorites.findIndex(fav => fav.id === id && fav.mediaType === mediaType);

      if (index >= 0) {
        favorites.splice(index, 1);
      } else {
        favorites.push(favoriteItem);
      }
      localStorage.setItem(storageKey, JSON.stringify(favorites));
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

.button-favorite.favorited .p-button-icon {
  color: red; /* Isso vai mudar a cor do ícone para vermelho */
}

.favorited{
  color: red;
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
