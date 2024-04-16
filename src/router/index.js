import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'
import MoviesView from '../views/Movies/index.vue'
import SeriesView from '../views/Series/index.vue'
import FavoritesView from '../views/Favorites/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesView
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
