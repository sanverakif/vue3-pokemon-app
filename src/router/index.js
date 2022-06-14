import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonView from '../views/PokemonView.vue'
import PokemonDetail from '../components/PokemonDetail'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/PokemonView',
        name: 'PokemonView',
        component: PokemonView
    },
    {
        path: '/PokemonDetail/:pokemonId',
        name: 'PokemonDetail',
        component: PokemonDetail
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router