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
    },

    getters: {
        getFilteredDocketActions: (state) => {
            state.yedekData[0].filter(item => item.slice(78, 79) == "1")
        },
    }
    // getters: { dataAl: state => state.yedekData[0].slice(78, 79) }

});