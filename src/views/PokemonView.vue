<template>
  <div class="container">
    <table class="table" style="width: 400px">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Url</th>
          <th>Favoriler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pokemonData" :key="item.Id">
          <td>{{ item.Id }}</td>
          <td>{{ item.Name }}</td>
          <td>
            <!-- <button @click="gotoDetail(item.Id)" class="btn btn-info">
              Detay
            </button> -->
            <router-link
              :to="{ name: 'PokemonDetail', params: { pokemonId: item.Id } }"
              ><button class="btn btn-info">Detay</button></router-link
            >
          </td>
          <td>
            sonuc:
            <small v-if="dataKontrolu()">{{ dataSonuc }}</small>
            <small v-else>{{ dataSonuc2 }}</small>
          </td>
          <!-- <button @click="dataKontrolu" class="btn btn-primary">tıkla</button> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// import { mapGetters } from "vuex";
export default {
  name: "PokemonView",
  data() {
    return {
      pokemonData: [],
      dataSonuc: "",
      dataSonuc2: "",
    };
  },
  methods: {
    getPokemonData: function () {
      axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
        res.data.results.forEach((row) => {
          var pokemonItem = {};
          pokemonItem.Id = row.url.split("/")[row.url.split("/").length - 2];
          pokemonItem.Name = row.name;
          pokemonItem.url = row.url;
          this.pokemonData.push(pokemonItem);
        });
        console.log("pokemonlar alındı", this.pokemonData);
      });

      // console.log(
      //   "pokemonlar getirildi",
      //   localStorage.getItem("favoriPokemon", JSON.stringify(this.$store.state.yedekData))
      // );
    },
    dataKontrolu: function () {
      // this.$store.state.yedekData != null
      if (localStorage.getItem("favoriPokemon") != null) {
        console.log("data geldi");
        this.dataSonuc = this.$store.state.veri[0].sonuc;
        return true;
      } else {
        this.dataSonuc2 = this.$store.state.veri[1].sonuc;
        return false;
      }
    },
    //roota parametre ekledim Evente çağırırken döngüde olduğu için id yi atayabildim.
    // gotoDetail: function (id) {
    //   this.$router.push("PokemonDetail/" + id);
    //   // this.$router.push('/PokemonDetail');
    //   // this.$router.push({ name: "PokemonDetail", params: { id: this.pokemonItem. Id } });
    //   // this.$router.push({ name: "PokemonDetail", params: { pokemonId: this.pokemonItem.Id } });
    //   // this.$router.push({ name: "PokemonDetail" + this.$route.params.pokemonItem.id });
    // },
  },
  // mounted: function () {
  //   this.getPokemonData(); //method1 will execute at pageload
  // },
  mounted: function () {
    this.dataKontrolu();
  },
  created() {
    this.dataKontrolu();
    this.getPokemonData();
  },
  // computed: {
  //   ...mapGetters({
  //     insan3: "insan3",
  //   }),
  // },
};
</script>
