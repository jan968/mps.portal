<template>
  <v-container>
    <v-card class="v_card">
      <!-- page 1 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
        <h1 style="text-align:center;">POSLOVNI PLAN</h1>
        <h2 style="text-align:center;">Mjera I.6. „Diversifikacija i novi oblici prihoda“</h2>
        <h2
          style="text-align:center;"
        >Natječaj za dodjelu potpore u okviru mjere I.6. „Diversifikacija i novi oblici prihoda“ („Narodne novine“, 56/2018)</h2>
        
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Naziv korisnika"
          required
          class="text_field"
        ></v-text-field>
        <br>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Morate se složiti da bi nastavili!']"
          label="Slažete li se?"
          required
        ></v-checkbox>
      </v-form>

     
      <!--page 2 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===2">
        <h1 style="text-align:center;">1. POSTOJEĆE POSLOVANJE</h1>
        <br>
         <v-textarea name="opis" label="
         Opišite Vaše dosadašnje poslovanje" hint="(osnovnu djelatnost ribolova, ostale djelatnosti ako postoje)"></v-textarea>
        <br>
      </v-form>

    <!-- page 3 -->
    <v-form ref="form" v-model="valid" lazy-validation v-if="page===3">
        <h1 class="subtitle upper">2. Podaci o operaciji</h1>
        <br>
        <br>

        <h2 class="textOperacije">2.1. Opis operacije</h2>
        <br>

        <p class="normal_text">Opišite glavne karakteristike operacije koja je predmet potpore, tj. opišite komplementarnu djelatnost
          na način da je jasno vidljiva povezanost komplementarne djelatnosti sa osnovnom djelatnosti ribolova</p>
        <v-textarea name="opis" label="Opis"></v-textarea>
      
        <hr>
        <br>

        <h2 class="textOperacije">2.2. Svrha, namjena i ciljevi operacije</h2>
        <br>

        <p class="normal_text">Opišite razloge zbog kojih ste odabrali razvoj predmetne komplementarne djelatnosti, 
          tj. navedite na temelju čeka smatrate da će razvoj te komplementarne djelatnosti doprinijeti novim oblicima 
          vaših prihoda (npr. ispitivanjem tržišta, područja,konkurencije, na temelju dosadašnjeg poslovanja u djelatnosti
          ribolova islično)</p>
        <v-textarea name="opis" label="Opis"></v-textarea>

        <hr>
        <br>

        <h2 class="textOperacije">2.3. Aktivnosti u okviru operacije</h2>
        <br>

        <p class="normal_text">Opišite planirane aktivnosti za uspostavu komplementarne
           djelatnosti koja je predmet potpore (navesti opisno tip aktivnosti/ulaganja – npr.
           kod prilagodbe ribarskog plovila za ribolovni turizam jedna aktivnost može biti rekonstrukcija,
           a druga opremanje). Po potrebi dodati nove retke. U ovom poglavlju ne navoditi pojedinačne troškove
           planirane u okviru tih aktivnosti (pojedinačni troškovi se navode u dodatku A. Poslovnog plana)</p>
        <br>
        <v-textarea name="opis" label="1.1 Aktivnost i opis aktivnosti"></v-textarea>
        <v-textarea name="opis" label="1.2 Aktivnost i opis aktivnosti"></v-textarea>
        <v-textarea name="opis" label="1.3 Aktivnost i opis aktivnosti"></v-textarea>
        <v-textarea name="opis" label="1.4 Aktivnost i opis aktivnosti"></v-textarea>
        <v-textarea name="opis" label="1.5 Aktivnost i opis aktivnosti"></v-textarea>

        <hr>
        <br>

        <h2 class="textOperacije">2.4. Financiranje operacije</h2>
        <br>

        <p class="normal_text">Opišite na koji način planirate osigurati vaš udio u sufinanciranju razvoja
           komplementarne djelatnosti (vlastita sredstva, krediti islično). U slučaju kredita, navedite i 
           financijske troškove (otplata glavnice, troškovi kamata)</p>
        <v-textarea name="opis" label="Opis"></v-textarea>

       

       
      
      </v-form>

      <!-- page 4 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===4">
        <h1 style="text-align:center;">3. PLANIRANO POSLOVANJE NAKON ZAVRŠETKA OPERACIJE</h1>
        <br>

        <h2 class="textOperacije">3.1 Troškovi poslovanja</h2>
        <br>

        <p class="normal_text">Navedite glavne operativne troškove (npr. sirovine i repromaterijal,
           energija, troškovi radne snage, troškovi održavanja, javnadavanja i slično) predviđene u
           okviru obavljanja komplementarne djelatnosti. Nenavoditi troškove u okviru aktivnosti 
           uspostave koji su predmet potpore koji senavode u Dodatku A. Poslovnog plana.</p>
        <v-textarea name="opis" label="Opis"></v-textarea>

         <h2 class="textOperacije">3.2 Proizvodi/usluge</h2>
        <br>

        <p class="normal_text">Opišite planirane proizvode/usluge koji će rezultirati izkomplementarne 
          djelatnosti te način distribucije i promocije tihproizvoda/usluga (kanali prodaje, metode oglašavanja i slično).
          Navedite iplanirane prodajne količine/cijene proizvoda/usluga.</p>
        <v-textarea name="opis" label="Opis"></v-textarea>

        <h2 class="textOperacije">3.3 Zaposlenici</h2>
        <br>

        <p class="normal_text">Opišite planiranu strukturu zaposlenika koji ćesudjelovati u obavljanju komplementarne 
          djelatnosti, tj. navesti stručne kvalifikacije zaposlenika i okvirni broj. U ovom poglavlju nije potrebno 
          specificirati planirani broj zaposlenika u godišnjim jedinicama rada u točno određenoj godini već navesti okvirni
          broj i strukturu koji su previđeni zaodržavanje i upravljanje realiziranom operacijom 
          (za obavljanje komplementarne djelatnosti) u razdoblju od najmanje pet godina od dana konačne isplate.
          Specifikacija planiranih zaposlenika (za potrebu kriterija za odabir broj 3 teza potrebe pokazatelja rezultata) 
          se navodi u dodatku B. Poslovnog plana.</p>
        <v-textarea name="opis" label="Opis"></v-textarea>

      </v-form>

      <!-- page 5 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===5">
       <h1 style="text-align:center;">4. OSTALO</h1>
       <br>
          <p class="normal_text">Navedite dodatne napomene, pojašnjenja ili opise vezano za operaciju
           koja je predmet potpore, ako smatrate da je potrebno.</p>
        <v-textarea name="opis" label="Opis"></v-textarea>
      </v-form>

      <div class="text-md-center text-lg-center text-xs-center">
        <v-pagination v-model="page" :length="5" :total-visible="5" class="pagi"></v-pagination>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Ime je obavezno",
      v => (v && v.length <= 255) || "Ime mora biti manje od 10 karaktera"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail je obavezan",
      v => /.+@.+/.test(v) || "E-mail mora biti u ispravnom formatu"
    ],
    select: null,
    county: null,
    counties: [
      "Grad Zagreb",
      "Splitsko-dalmatinska",
      "Primorsko-goranska",
      "Dubrovačko-neretvanska",
      "Zagrebačka",
      "Krapinsko-zagorska",
      "Sisačko-moslavačka",
      "Karlovačka",
      "Varaždinska",
      "Koprivničko križevačka",
      "Bjelovarsko-bilogorska",
      "Ličko-senjska",
      "Virovitičko-podravska",
      "Požeško-slavonska",
      "Brodsko-posavska",
      "Zadarska",
      "Osječko-baranjska",
      "Šibensko-kninska",
      "Vukovarsko-srijemska",
      "Istarska",
      "Međimurska"
    ],
    tipKorisnika: -1,
    oblikKorisnika: -1,
    checkbox: false,
    page: 1,
    dialog: false,
    headers: [
      { text: "Rbr. (A)", value: "rbr" },
      {
        text: "Naziv i opis troška (B)",
        align: "left",
        sortable: false,
        value: "nazivTroska"
      },
      {
        text: "Naziv izvođača radova /dobavljača/ pružatelja usluge (C)",
        value: "dobavljac"
      },
      { text: "Broj ponude /predračuna /računa (D)", value: "brojDokumenta" },
      { text: "Iznos bez PDV-a (E)", value: "iznos" },
      { text: "Iznos PDV-a (F)", value: "pdv" },
      { text: "Ukupan iznos (F)", value: "ukupno" }
    ],
    troskovi: [],
    editedIndex: -1,
    editedItem: {
      rbr: 0,
      nazivTroska: "",
      dobavljac: "",
      brojDokumenta: "",
      iznos: 0,
      pdv: 0,
      ukupno: 0
    },
    defaultItem: {
      rbr: 0,
      nazivTroska: "",
      dobavljac: "",
      brojDokumenta: "",
      iznos: 0,
      pdv: 0,
      ukupno: 0
    },

    // Lista troškova operacije
    headersNew: [
      { text: "Rbr. (A)", value: "rbrNew" },
      {
        text: "Naziv i opis troška (B)",
        align: "left",
        sortable: false,
        value: "nazivTroskaNew"
      },
      {
        text: "Naziv ponuditelja/pružatelja usluge(C)",
        value: "dobavljacNew"
      },
      { text: "Broj ponude /predračuna /računa (D)", value: "brojDokumentaNew" },
      { text: "Oznaka aktivnosti na koju se odnosi trošak(E) ", value: "oznakaAktivnosti" },

      { text: "Iznos bez PDV-a (F)", value: "iznosNew" },
      { text: "Iznos PDV-a (G)", value: "pdvNew" },
      { text: "Ukupan iznos (H)", value: "ukupnoNew" },
    ],

    troskoviNew: [],
    editedIndexNew: -1,
    editedItemNew: {
      rbrNew: 0,
      nazivTroskaNew: "",
      dobavljacNew: "",
      brojDokumentaNew: "",
      iznosNew: 0,
      pdvNew: 0,
      ukupnoNew: 0
    },
    defaultItemNew: {
      rbrNew: 0,
      nazivTroskaNew: "",
      dobavljacNew: "",
      brojDokumentaNew: "",
      iznosNew: 0,
      pdvNew: 0,
      ukupnoNew: 0
    },


    headersPlovilo: [
      { text: "Rbr. (A)", value: "rbr" },
      { text: "Ime i prezime", value: "imePrezime" },
      { text: "OIB", value: "oib" }
    ],
    plovilo: [],
    editedIndexPlovilo: -1,
    editedItemPlovilo: {
      rbr: 0,
      imePrezime: "",
      oib: ""
    },
    defaultItemPlovilo: {
      rbr: 0,
      imePrezime: "",
      oib: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      }
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novi trošak" : "Ažuriraj trošak";
    },
    formTitlePlovilo() {
      return this.editedIndexPlovilo === -1
        ? "Novi suvlasnik"
        : "Ažuriraj suvlasnika";
    },
    ukupnoSUM() {
      let sum = 0;
      this.troskovi.forEach(function(item) {
        sum += parseFloat(item.ukupno);
      });

      return this.formatMoney(sum);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

/* Metode  ************************************************************/
  methods: {
    initialize() {
      this.troskovi = [];
    },
    formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "") +
        " kn"
      );
    },
    editItem(item) {
      this.editedIndex = this.troskovi.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.troskovi.indexOf(item);
      confirm("Jeste li sigurni da želite obrisati stavku?") &&
        this.troskovi.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.editedItem.ukupno = (
        Number(this.editedItem.iznos) + Number(this.editedItem.pdv)
      ).toFixed(2);
      if (this.editedIndex > -1) {
        Object.assign(this.troskovi[this.editedIndex], this.editedItem);
      } else {
        this.troskovi.push(this.editedItem);
      }
      this.close();
    },

    editItemPlovilo(item) {
      this.editedIndexPlovilo = this.plovilo.indexOf(item);
      this.editedItemPlovilo = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItemPlovilo(item) {
      const index = this.plovilo.indexOf(item);
      confirm("Jeste li sigurni da želite obrisati stavku?") &&
        this.plovilo.splice(index, 1);
    },

    closePlovilo() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItemPlovilo = Object.assign({}, this.defaultItemPlovilo);
        this.editedIndexPlovilo = -1;
      }, 300);
    },

    savePlovilo() {
      if (this.editedIndexPlovilo > -1) {
        Object.assign(
          this.plovilo[this.editedIndexPlovilo],
          this.editedItemPlovilo
        );
      } else {
        this.plovilo.push(this.editedItemPlovilo);
      }
      this.close();
    },

    submit() {
      if (this.$refs.form.validate()) {
        // Form is valid, process
      }
    },
    clear() {
      this.$refs.form.reset();
    },

    // saveSig() {
    //   var _this = this;
    //   var png = _this.$refs.signature.saveSig();
    //   var jpeg = _this.$refs.signature.saveSig("image/jpeg");
    //   var svg = _this.$refs.signature.saveSig("image/svg+xml");
    // },
    // clearSig() {
    //   var _this = this;
    //   _this.$refs.signature.clearSig();
    // },
    // undoSig() {
    //   var _this = this;
    //   _this.$refs.signature.undoSig();
    // },
    // addWaterMarkSig() {
    //   var _this = this;
    //   _this.$refs.signature.addWaterMarkSig({
    //     text: "mark text", // watermark text, > default ''
    //     font: "20px Arial", // mark font, > default '20px sans-serif'
    //     style: "all", // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
    //     fillStyle: "red", // fillcolor, > default '#333'
    //     strokeStyle: "blue", // strokecolor, > default '#333'
    //     x: 100, // fill positionX, > default 20
    //     y: 200, // fill positionY, > default 20
    //     sx: 100, // stroke positionX, > default 40
    //     sy: 200 // stroke positionY, > default 40
    //   });
    // },
    // fromDataURLSig(url) {
    //   var _this = this;
    //   _this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
    // }
  }
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

:root {
  --primary-color: #0868ac !important;
  --secondary-color: #fff !important;
  --third-color: rgba(0, 0, 0, 0.87) !important;
  --message-color: #ff4136 !important;
  --input-text-color: #3e4444 !important;
}

/* Theming */
h1,
.v-input--radio-group__input .v-label:first-child {
  color: var(--primary-color);
}

label.v-label.theme--light {
  font-weight: bold;
}

.theme--light.v-table thead tr:first-child {
  border-bottom: 3px solid var(--primary-color);
}

.theme--light.v-label {
  color: var(--primary-color) !important;
}

.theme--light.v-card {
  color: var(--primary-color) !important;
}

.theme--light.v-messages {
  color: var(--message-color) !important;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: var(--input-text-color) !important;
}

i.v-icon.mr-2.v-icon--link.material-icons.theme--light {
  color: var(--primary-color) !important;
}

i.v-icon.v-icon--link.material-icons.theme--light {
  color: #3d9970;
  opacity: 0.7;
}

i.v-icon.v-icon--link.material-icons.theme--light:hover {
  opacity: 1;
}

/*----- custom ------------- */

/* counties */
.v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: 0! important;
}

.bold {
  font-weight: 600;
}

.fix_width {
  padding: 0 20px;
}

.izjava li span {
  line-height: 1.3;
}

.v-input.text_field.shorten.v-text-field.theme--light label { 
    font-size: 13px;
}

.normal_text {
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
}

.underline-bold {
  text-decoration: underline;
  font-weight: bold;
}

hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.v-input--selection-controls {
  margin-top: 0;
}

.checkbox-text {
  padding-bottom: 8px;
  font-size: 1.1em;
}

.signature-box {
  border: 1px solid #666;
}

.sig-btn {
  padding: 0 10px;
  margin: 20px 0;
}

h1 {
  margin: 0;
  font-weight: bold;
}

h2 {
  margin-top: 15px;
}

.custom-box-godina {
  width: 175px;
}

.subtitle {
  margin: 30px 0;
  text-align: center;
}

.upper {
  text-transform: uppercase;
}

.kriterij-box {
  width: 120px;
  white-space: pre;
  margin-bottom: 20px;
}


h4.checkbox-text {
  margin-top: 20px;
}

.subtext {
  color: var(--primary-color) !important;
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
}

.theme--light.v-datatable .v-datatable__actions {
  margin-bottom: 15px;
}

.v_card {
  position: relative;
  width: 100%;
  max-width: 1050px;
  margin: 0;
  padding: 5%;
  margin: 0 auto;
}

.v-dialog.v-dialog--active {
  position: relative;
  z-index: 999;
}

.text_field {
  width: 100%;
  max-width: 450px;
  font-weight: bold;
}

.text_field:nth-of-type(1) {
  margin-top: 40px;
}

.clean-btn:hover {
  background: var(--primary-color) !important;
  color: var(--secondary-color);
  box-shadow: 3px solid #043e67;
}

.theme--light.v-pagination .v-pagination__item--active,
.theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background: var(--primary-color) !important;
  color: var(--secondary-color);
}

.v-toolbar__content {
  margin-top: 50px !important;
}

.v-input.text_field.v-text-field.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light {
  margin-top: 30px;
}

/* !!! */
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 300px;
}

.v-card__title {
  padding-bottom: 0;
}

.v-card__text {
  padding: 0 16px;
}

th.column.text-xs-left {
  color: var(--primary-color) !important;
  font-weight: bold;
  font-size: 15px;
}

.headline {
  color: var(--primary-color) !important;
  font-weight: bold;
  text-align: center;
  margin: 10px auto 0;
}

.cfr_text {
  max-width: 300px;
  width: 100%;
}

.ukupno_g_text {
  width: 100px;
}

.theme--light.v-datatable thead th.column.sortable .v-icon,
.theme--light.v-datatable thead th.column.sortable.active .v-icon {
  color: var(--primary-color) !important;
}

table.v-table thead th {
  white-space: normal !important;
}

table.v-table thead th:nth-child(1) {
  width: 10px !important;
}

table.v-table thead th:nth-child(2) {
  white-space: nowrap !important;
}

table.v-table thead th:nth-child(5),
table.v-table thead th:nth-child(6),
table.v-table thead th:nth-child(7) {
  width: 105px !important;
}

table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 14px;
}

th.column.sortable.text-xs-left {
  padding-bottom: 5px;
}

.text-center {
  text-align: center;
  display: block;
  margin: 0 auto;
}

.textOperacije {
  font-size: 20px;
  margin-top: 20px;
  color:#001f3f;
  font-weight: bold;
  text-align: center;
}

 #app div:nth-child(2) {
  display: none !important;
  }

/* responsive */

@media only screen and (max-width: 320px) {

    .v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: -273px !important;
}

  .pagi {
    position: absolute;
    left: -7px;
    bottom: 0;
  }

  .ukupno_g_text {
    margin-bottom: 30px;
  }

  .clean-btn {
    margin-bottom: 50px !important;
  }

  .theme--light.v-datatable .v-datatable__actions {
    margin-bottom: 40px;
  }

   .signature-box {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }

   .sig-btn {
    padding: 0 4px;
    margin-bottom: 40px;
  }

}

@media only screen and (min-width: 321px) and (max-width: 360px) { 

    .v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: -298px! important;
  }
    .sig-btn {
      padding: 0 8px;
    }
}

 @media only screen and (min-width: 361px) and (max-width: 415px) { 

    .v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: -320px! important;
  }
}

@media only screen and (min-width: 400px) and (max-width: 415px) {
    .first-sig-btn {
      margin-left: 23px;
    }
 }

@media screen and (min-width: 321px) and (max-width: 600px) { 

 .signature-box {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }

  .clean-btn {
    display: block;
    margin: 20px auto 20px;
  }

  .v-toolbar__title {
    width: 200px;
  }

  .reset-btn {
    position: absolute;
    bottom: 0;
  }

  table.v-table thead th:nth-child(1) {
    white-space: normal !important;
  }

  th.column.sortable.text-xs-left {
    padding-bottom: 0;
  }

  .text-center {
    display: inline;
  }

  td.text-xs-left {
    word-wrap: break-word;
  }

  h4.checkbox-text {
    font-weight: bold;
}

}

@media only screen and (max-width: 1024px) {
  table.v-table thead th:nth-child(5),
  table.v-table thead th:nth-child(6),
  table.v-table thead th:nth-child(7) {
    min-width: 115px !important;
  }
}
</style>
