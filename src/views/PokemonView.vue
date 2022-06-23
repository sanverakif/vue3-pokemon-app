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

            <AddFavouritePokemon :item="item" @favori="addFavourite($event)" />
            <!-- <AddFavouritePokemon
              :item="item"
              @favori="addFavourite(item, true, $event)"
            /> -->
            <!-- <button
              @click="favorilereEkleKaldir(item, true)"
              class="btn btn-success"
              style="margin-left: 5px"
              v-show="item.Id"
            >
              Fav. Ekle
            </button> -->
          </td>
          <!-- <td>
            <button
              @click="favorilereEkleKaldir(item, false)"
              class="btn btn-danger"
              style="margin-left: 5px"
            >
              Fav. Kaldır
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AddFavouritePokemon from "@/components/AddFavouritePokemon";
export default {
  name: "PokemonView",
  components: { AddFavouritePokemon },
  data() {
    return {
      pokemonData: [],
      data: null,
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
    addFavourite(data) {
      this.data = data;
    },
    gotoDetail(id) {
      this.$router.push({
        name: "PokemonDetail",
        params: { pokemonId: id },
      });
    },
    // favorilereEkleKaldir: function (row, favoriyeEkle) {
    //   //butona ilk parametresini item olarak verdik ve item, rowun yerine geçer
    //   console.log("data", row);
    //   //2.parametre true ise
    //   if (favoriyeEkle == true) {
    //     //localdata kontrolu yapıyoruz deger ataması için
    //     var localData = localStorage.getItem("favoriPokemon");
    //     //localdata boşsa
    //     if (localData == null) {
    //       //seçilen id yi string formatına çeviriyoruz 0: "1"
    //       localStorage.setItem("favoriPokemon", JSON.stringify([row.Id]));
    //     } else {
    //       /*
    //       set ettikten sonra 1+ item eklemek istiyoruz Localdata boş değilse ++
    //       aynı id eklenilmesini engelliyoruz,string fonksiyonu kullanıyoruz
    //       aynı id değil farklı id ise yeni id yi puslayıp ekliyoruz
    //       */

    //       //localdaki girilen dataları aldık
    //       var idGonder = JSON.parse(localStorage.getItem("favoriPokemon"));
    //       // aynı id yoksa bulunmuyorsa
    //       if (idGonder.includes(row.Id) == false) {
    //         //yeni id yi ekle
    //         idGonder.push(row.Id);
    //         //son hali ile set ediyoruz, son deger eklendi
    //         localStorage.setItem("favoriPokemon", JSON.stringify(idGonder));
    //       }
    //     }
    //   }
    // },
  },
  mounted: function () {
    this.getPokemonData();
  },
};
</script>
