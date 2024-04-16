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
          value="true"
      >
        <v-btn @click="changeRoute('home')" value="home">
          <v-icon color="white">mdi-home</v-icon>
          <span style="color: white">Home</span>
        </v-btn>

        <v-btn @click="changeRoute('favorites')" value="favorites">
          <v-icon color="white">mdi-heart</v-icon>
          <span style="color: white">Favorites</span>
        </v-btn>

        <v-btn @click="changeRoute('movies')" value="movies">
          <v-icon color="white">mdi-filmstrip</v-icon>
          <span style="color: white">Movies</span>
        </v-btn>

        <v-btn @click="changeRoute('series')" value="series">
          <v-icon color="white">mdi-television-classic</v-icon>
          <span style="color: white">Series</span>
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
  methods: {
    changeRoute(routeName) {
      // Aqui, ajuste para as rotas correspondentes de seu aplicativo
      this.$router.push({ name: routeName });
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  width: 100%;
  position: fixed; /* Fixa a navegação na parte inferior da tela */
  bottom: 0; /* Posiciona a navegação no fundo da tela */
  left: 0; /* Alinha a navegação à esquerda */
  z-index: 100; /* Garante que a navegação fique acima de outros elementos */
  background-color: #1f1e31;
}
</style>
