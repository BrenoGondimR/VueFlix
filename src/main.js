import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Importa o CSS do MDI

// Importar o arquivo CSS global
import '@/assets/styles/style.scss';




const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi',  // Define o conjunto de ícones padrão como 'mdi'
    },
})


createApp(App).use(router).use(vuetify).use(BootstrapVue3).use(PrimeVue).mount('#app')

