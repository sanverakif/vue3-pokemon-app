<template>
  <div>
    <!-- {{this.$store.state.yedekData}}
    {{this.pokemonDetail.name}} -->
    <div class="container">
      <table class="table" style="margin-top: 50px">
        <thead>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Abilities/ability/name</th>
          <th scope="col">Hp/attack/defense</th>
          <th scope="col">Weight</th>
          <th scope="col">Height</th>
        </thead>
        <tbody>
          <tr>
            <td><img :src="pokemonDetail.sprites.back_default" /></td>
            <td>{{ pokemonDetail.name }}</td>
            <td>{{ pokemonDetail.types[0].type.name }}</td>
            <td>
              <ul>
                <li v-for="item in pokemonDetail.abilities" :key="item.id">
                  {{ item.ability.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li
                  v-for="(item, index) in pokemonDetail.stats.slice(0, 3)"
                  :key="item.id"
                >
                  {{ index }} {{ item.stat.name }}
                </li>
              </ul>
            </td>

            <td>{{ pokemonDetail.weight }}</td>
            <td>{{ pokemonDetail.height }}</td>
          </tr>
        </tbody>

        <td v-for="item in pokemonDetail.abilities.ability" :key="item.id">
          {{ item }}
        </td>
      </table>

      <router-link :to="{ name: 'PokemonView' }"
        ><button class="btn btn-info">Pokemonlar</button></router-link
      >
      <button
        @click="favorilereEklenenPokemonuKaldir(true)"
        class="btn btn-danger"
        style="margin-left: 5px"
      >
        Fav. Kaldır
      </button>

      <!-- <button
        @click="favorilereEklenenPokemonuKaldir(false)"
        class="btn btn-success"
        style="margin-left: 5px"
      >
        Fav. Ekle
      </button> -->
      <!-- <button
        @click="deleteLocalStorageGetData()"
        class="btn btn-danger"
        style="margin-left: 5px"
        v-show="!show"
      >
        Favorilerden sil
      </button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PokemonDetail",
  data() {
    return {
      result: "kalp",
      pokemonDetail: [],
      pokemon: [],
      localData: localStorage.getItem("favoriPokemon"),
      akif: [],
      show: true,
      favoriPokemon: [],
      metin: "başarılı",
    };
  },
  methods: {
    getPokemonDetail: function (id) {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then((res) => {
        this.pokemonDetail = res.data;
        console.log("datalar", res.data);
      });
    },
    favorilereEklenenPokemonuKaldir(itemKontrol) {
      //localdaki dataları değiskene atadık

      if (itemKontrol == true) {
        var favoriData = localStorage.getItem("favoriPokemon");
        //değisken boş değilse
        if (favoriData != null) {
          //objeleri id sile atadık
          var idSil = JSON.parse(localStorage.getItem("favoriPokemon"));
          //elemanlar içerisinden seçilen id nin silinmesini istiyoruz değer varsa
          if (idSil.includes(this.$route.params.pokemonId) == true) {
            //seçilen idyi silmek istiyoruz İdsil içerisinde row.id varsa(indexof ile diğerin içerip içermediğini kontrol ederiz içerirse 1 içermezse -1)
            idSil.splice(idSil.indexOf(this.$route.params.pokemonId), 1);
            //değer bulunduktan sonra son halini setleriz
            localStorage.setItem("favoriPokemon", JSON.stringify(idSil));
          } else {
            console.log("id değerler içerisinde yok");
          }
        }
      }
    },
    // getLocalStorageGetData: function () {
    //   this.localData.split(" ");
    //   this.akif = this.localData.split(" ");
    //   var x = {};
    //   x.image = this.akif[0];
    //   x.name = this.akif[1];
    //   x.typesName = this.akif[2];
    //   x.weight = this.akif[3];
    //   x.height = this.akif[4];

    //   this.akif.push(x);
    // },
  },

  created: function () {
    var pokemonId = this.$route.params.pokemonId;
    this.getPokemonDetail(pokemonId); //method1 will execute at pageload
    this.favorilereEklenenPokemonuKaldir();
  },
};
</script>

<style>
.btnHidden {
  visibility: hidden !important;
}
</style>
