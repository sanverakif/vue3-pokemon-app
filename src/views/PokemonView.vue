<template>
  <div class="container">
    <table class="table" style="width: 500px">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pokemonData" :key="item.Id">
          <td>{{ item.Id }}</td>
          <td>{{ item.Name }}</td>
          <td>
            <button
              @click="gotoDetail(item.Id)"
              class="btn btn-primary"
              style="margin-left: 5px"
            >
              Detaya git
            </button>
          </td>
          <td>
            <button
              @click="favorilereEkleKaldir(item, true)"
              class="btn btn-success"
              style="margin-left: 5px"
            >
              Fav. Ekle
            </button>
          </td>
          <td>
            <button
              @click="favorilereEkleKaldir(item, false)"
              class="btn btn-danger"
              style="margin-left: 5px"
            >
              Fav. Kaldır
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PokemonView",
  data() {
    return {
      pokemonData: [],
      show: true,
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
      });
    },
    gotoDetail(id) {
      this.$router.push({
        name: "PokemonDetail",
        params: { pokemonId: id },
      });
    },
    favorilereEkleKaldir: function (row, favoriyeEkle) {
      console.log("data", row);
      if (favoriyeEkle == true) {
        var localData = localStorage.getItem("favoriPokemon");
        if (localData == null) {
          localStorage.setItem("favoriPokemon", JSON.stringify([row.Id]));
        } else {
          var idGonder = JSON.parse(localStorage.getItem("favoriPokemon"));
          if (idGonder.includes(row.Id) == false) {
            idGonder.push(row.Id);
            localStorage.setItem("favoriPokemon", JSON.stringify(idGonder));
          }
        }
      } 
      else 
      {
        var localData1 = localStorage.getItem("favoriPokemon");
        if (localData1 != null) 
        {
          var idSil = JSON.parse(localStorage.getItem("favoriPokemon"));
          if (idSil.includes(row.Id) == true) 
          {
            idSil.splice(idSil.indexOf(row.Id), 1);
            localStorage.setItem("favoriPokemon", JSON.stringify(idSil));
          }
        }
      }
    },
  },
  mounted: function () {
    this.getPokemonData();
  },
};
</script>
