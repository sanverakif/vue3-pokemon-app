import { createStore } from "vuex";


// const store = createStore({
//     state: {
//         fullName: "akif emre sanver",
//     },
// })

export default createStore({
    state: {
        yedekData: [],
        // data: localStorage.getItem("favoriPokemon"),
        veri: [
            { sonuc: "basarili" },
            { sonuc: "basarisiz" }
        ],
        // name: this.$route.params.pokemonId
    },

    // getters: {

    //     dataAl: state => state.yedekData.slice(78, 79).filter(x => x.state.yedekData == this.yedekData),
    // }
    // }
    // getters: {
    //     insan: state => state.veri.filter(x => x.sonuc == "basarili"),
    //     insan2: state => state.veri.filter(x => x.sonuc == "basarisiz"),
    //     insan3: state => state.yedekData.filter(x => x.state.yedekData)
    // }
});