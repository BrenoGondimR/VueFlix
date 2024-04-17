<template>
  <v-app>
    <!-- Conteúdo principal -->
    <v-main style="background-color: #121124">
      <router-view></router-view>
    </v-main>

    <!-- Navegação no fundo da página -->
    <div class="navigation-container">
      <v-bottom-navigation
          absolute
          :elevation="15"
          class="bottom-nav"
          v-model="currentRoute"
      >
        <v-btn @click="changeRoute('home')" :class="{ 'selected-button': currentRoute === 'home' }" value="home">
          <v-icon :color="currentRoute === 'home' ? '#e52a5a' : 'white'">mdi-home</v-icon>
          <span :style="{ color: currentRoute === 'home' ? '#e52a5a' : 'white' }">Home</span>
        </v-btn>

        <v-btn @click="changeRoute('favorites')" :class="{ 'selected-button': currentRoute === 'favorites' }" value="favorites">
          <v-icon :color="currentRoute === 'favorites' ? '#e52a5a' : 'white'">mdi-heart</v-icon>
          <span :style="{ color: currentRoute === 'favorites' ? '#e52a5a' : 'white' }">Favorites</span>
        </v-btn>

        <v-btn @click="changeRoute('movies')" :class="{ 'selected-button': currentRoute === 'movies' }" value="movies">
          <v-icon :color="currentRoute === 'movies' ? '#e52a5a' : 'white'">mdi-filmstrip</v-icon>
          <span :style="{ color: currentRoute === 'movies' ? '#e52a5a' : 'white' }">Movies</span>
        </v-btn>

        <v-btn @click="changeRoute('series')" :class="{ 'selected-button': currentRoute === 'series' }" value="series">
          <v-icon :color="currentRoute === 'series' ? '#e52a5a' : 'white'">mdi-television-classic</v-icon>
          <span :style="{ color: currentRoute === 'series' ? '#e52a5a' : 'white' }">Series</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </v-app>
</template>

<script>
import {VIcon} from "vuetify/lib/components/VIcon";
export default {
  name: 'AppNavigation',
  components: {
    VIcon
  },
  data() {
    return {
      currentRoute: 'home', // Default route or get it from the router
    };
  },
  methods: {
    changeRoute(routeName) {
      this.currentRoute = routeName; // Update the current route
      this.$router.push({ name: routeName });
    }
  }
}
</script>

<style scoped>

.selected-button .v-icon {
  color: #e52a5a !important;
}

.selected-button span {
  color: #e52a5a !important;
}
.bottom-nav {
  width: 100%;
  position: fixed !important; /* Fixa a navegação na parte inferior da tela */
  bottom: 0; /* Posiciona a navegação no fundo da tela */
  left: 0; /* Alinha a navegação à esquerda */
  z-index: 100; /* Garante que a navegação fique acima de outros elementos */
  background-color: #1f1e31;
}
</style>
