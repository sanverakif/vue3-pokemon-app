<template>
  <!-- <button
    @click="$emit('favori', favorilereEkleKaldir(item,true))"
    class="btn btn-success"
  >
    ekle
  </button> -->
  <button
    @click="sendPokemonItem(false, true)"
    class="btn btn-success"
    style="margin-left: 5px"
    v-show="show"
  >
    fav. Ekle
  </button>

  <!-- fav.sil butonu çıkartır -->
  <button
    @click="sendPokemonItem(false, false)"
    class="btn btn-danger"
    style="margin-left: 5px"
    v-show="!show"
  >
    fav. sil
  </button>
  <small>{{ idKontrol }}</small>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      result: true,
      show: true,
      idKontrol: null,
    };
  },
  methods: {
    favorilerePokemonEkle: function (row, favoriyeEkle) {
      //butona ilk parametresini item olarak verdik ve item, rowun yerine geçer
      console.log("data", row);

      //2.parametre true ise
      if (favoriyeEkle == true) {
        //localdata kontrolu yapıyoruz deger ataması için
        var localData = localStorage.getItem("favoriPokemon");

        //localdata boşsa
        if (localData == null) {
          //seçilen id yi string formatına çeviriyoruz 0: "1"
          localStorage.setItem("favoriPokemon", JSON.stringify([row.Id]));
        } else {
          /*
          set ettikten sonra 1+ item eklemek istiyoruz Localdata boş değilse ++
          aynı id eklenilmesini engelliyoruz,string fonksiyonu kullanıyoruz
          aynı id değil farklı id ise yeni id yi puslayıp ekliyoruz
          */

          //localdaki girilen dataları aldık
          var idGonder = JSON.parse(localStorage.getItem("favoriPokemon"));
          // aynı id yoksa bulunmuyorsa
          if (idGonder.includes(row.Id) == false) {
            //yeni id yi ekle
            idGonder.push(row.Id);
            //son hali ile set ediyoruz, son deger eklendi
            localStorage.setItem("favoriPokemon", JSON.stringify(idGonder));
          } else {
            this.idKontrol = "Favorilerde mevcuttur.";
            setInterval(() => {
              this.idKontrol = "";
            }, 1000);
          }
        }
      }
    },

    favorilereEklenenPokemonuKaldir(row, favoridenSil) {
      if (favoridenSil == true) {
        //localdaki dataları değiskene atadık
        var favoriData = localStorage.getItem("favoriPokemon");
        //değisken boş değilse
        if (favoriData != null) {
          //objeleri id sile atadık
          var idSil = JSON.parse(localStorage.getItem("favoriPokemon"));
          //elemanlar içerisinden seçilen id nin silinmesini istiyoruz değer varsa
          if (idSil.includes(row.Id) == true) {
            //seçilen idyi silmek istiyoruz İdsil içerisinde row.id varsa(indexof ile diğerin içerip içermediğini kontrol ederiz içerirse 1 içermezse -1)
            idSil.splice(idSil.indexOf(row.Id), 1);
            //değer bulunduktan sonra son halini setleriz
            localStorage.setItem("favoriPokemon", JSON.stringify(idSil));
          } else {
            console.log("id değerler içerisinde yok");
          }
        }
      }
    },
    sendPokemonItem: function (show, result) {
      //   this.favorilerePokemonEkle(this.row, this.favoriyeEkle);
      if (result == true) {
        this.$emit("favori", this.favorilerePokemonEkle(this.item, true));
        this.show = show;
      } else {
        this.$emit(
          "favori",
          this.favorilereEklenenPokemonuKaldir(this.item, true)
        );
        this.show = !show;
      }
    },
  },
};
</script>
