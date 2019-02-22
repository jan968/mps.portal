<template>
  <v-container>
    <v-card class="v_card">
        <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
            <h1 style="text-align:center;"> ZAHTJEV ZA POTPORU</h1>
            <h2
          style="text-align:center;"
        >Natječaj zaprovedbu mjere IV.4. „Prerada proizvoda ribarstva i akvakulture“ („Narodne novine“, broj 74/2017)</h2>
        <br>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Naziv korisnika"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field v-model="city" :counter="50" label="Mjesto" required class="text_field"></v-text-field>
        <v-text-field
          v-model="ZIP"
          :counter="50"
          label="Poštanski broj"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="ulicaBroj"
          :counter="255"
          label="Ulica i broj:"
          required
          class="text_field"
        ></v-text-field>
        <v-select
          v-model="county"
          :items="counties"
          :rules="[v => !!v || 'Polje je obavezno']"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <br>
        <br>
        <hr>
        <br>
        <br>
        
        <v-radio-group
          v-model="oblikKorisnika" 
          label="Oblik korisnika"
        >
          <v-radio :key="obrt" :label="'Obrt'" :value="0"></v-radio>
          <v-radio :key="trgovackoDrustvo" :label="'Trgovačko društvo'" :value="1"></v-radio>
          <v-radio :key="trgovackoDrustvo" :label="'Priznanje po posebnim propisima'" :value="2"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="zaObrt" v-if="oblikKorisnika===0" label="Za obrt">
          <v-radio :key="obveznikPorezaNaDohodak" :label="'Obveznik poreza na dohodak'" :value="0"></v-radio>
          <v-radio :key="obveznikPorezaNaDobit" :label="'Obveznik poreza na dobit'" :value="1"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="zaTrgovackoDrustvo" v-if="oblikKorisnika===1" label="Za trgovačko društvo">
          <v-radio :key="doo" :label="'d.o.o.'" :value="0"></v-radio>
          <v-radio :key="jdoo" :label="'j.d.o.o.'" :value="1"></v-radio>
          <v-radio :key="dd" :label="'d.d.'" :value="2"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="zaTrgovackoDrustvo" v-if="oblikKorisnika===2" label="Za priznanje po posebnim propisima">
          <v-radio :key="ribarskaZadruga" :label="'Ribarska zadruga'" :value="0"></v-radio>
          <v-radio :key="jdoo" :label="'Organizacija proizvođača'" :value="1"></v-radio>
        </v-radio-group>


        <v-radio-group v-model="korisnikObveznikPDVa" label="Korisnik obveznik PDV-a">
          <v-radio :key="da" :label="'Da'" :value="0"></v-radio>
          <v-radio :key="ne" :label="'ne'" :value="1"></v-radio>
        </v-radio-group>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Morate se složiti da bi nastavili!']"
          label="Slažete li se?"
          required
        ></v-checkbox>
        </v-form>

        <!-- page 2 -->
        <v-form ref="form" v-model="valid" lazy-validation v-if="page===2">
        <h1 style="text-align:center;">SAMO ZA OBRTE</h1>
        <v-text-field
          v-model="imePrezimeVlasnikaObrta"
          :counter="255"
          label="Ime i prezime vlasnika obrta"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="oibObrta"
          :counter="11"
          label="OIB obrta"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="maticniBrojObrta"
          label="Matični broj obrta"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeOdgovorneOsobeObrta"
          :counter="255"
          label="Ime i prezime odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibOdgovorneOsobeObrta"
          :counter="11"
          label="OIB odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
        </v-form>

        <!-- page 3 -->
        <v-form ref="form" v-model="valid" lazy-validation v-if="page===3">
        <h1 style="text-align:center;">SAMO ZA PRAVNE OSOBE</h1>
        <v-text-field
          v-model="imePrezimeVlasnikaDirektoraPravna"
          :counter="255"
          label="Ime i prezime vlasnika ili direktora"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibPravneOsobe"
          :counter="11"
          label="OIB pravne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeOdgovorneOsobePravna"
          :counter="255"
          label="Ime i prezime odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="oibOdgovorneOsobe"
          :counter="11"
          label="OIB pravne osobe"
          required
          class="text_field"
        ></v-text-field>   
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
        </v-form>

      <!-- page 4 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===4">
        <h1 style="text-align:center;">2. PODACI O KONTAKT OSOBI</h1>
        <v-text-field v-model="kontaktIme" :counter="255" label="Ime" required class="text_field"></v-text-field>
        <v-text-field
          v-model="kontaktPrezime"
          :counter="255"
          label="Prezime"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="kontaktTelFax"
          :counter="255"
          label="Telefon/faks"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="kontaktMobitel"
          :counter="255"
          label="Mobitel"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="kontaktEmail"
          :counter="255"
          label="Email"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
      </v-form>

      <!-- page 5 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===5">
        <h1 style="text-align:center;">3. PODACI O LOKACIJI ULAGANJA
       </h1>
       <h2 class="normal_text" style="text-align:center">(U slučaja ulaganja na više lokacija, ispuniti za svaku lokaciju)</h2>
        <br>
        <br>
        <h2 class="normal_text" style="text-align:center">Lokacija 1</h2>
         <v-text-field
          v-model="mjestoPostanskiBroj"
          :counter="255"
          label="Mjesto i poštanski broj:"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="ulicaBroj"
          :counter="255"
          label="Ulica i broj:"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="opcina"
          :counter="255"
          label="Općina:"
          required
          class="text_field"
        ></v-text-field>
         <v-select
          v-model="countyLokacija"
          :items="counties"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field
          v-model="odobreniBroj"
          :counter="255"
          label="Odobreni broj/evidencijska oznaka odobrenog objekta za preradu:"
          required
          class="text_field font_fit"
        ></v-text-field>
        <br>
        <hr>
        <br>
        
        <h2 class="normal_text" style="text-align:center">Lokacija 2</h2>

         <v-text-field
          v-model="mjestoPostanskiBrojLokacijaDva"
          :counter="255"
          label="Mjesto i poštanski broj:"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="ulicaBrojLokacijaDva"
          :counter="255"
          label="Ulica i broj:"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="opcinaLokacijaDva"
          :counter="255"
          label="Općina:"
          required
          class="text_field"
        ></v-text-field>
         <v-select
          v-model="countyLokacijaDva"
          :items="counties"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field
          v-model="odobreniBrojLokacijaDva"
          :counter="255"
          label="Odobreni broj/evidencijska oznaka odobrenog objekta za preradu:"
          required
          class="text_field font_fit"
        ></v-text-field>
        
        <br>
        <hr>
        <br>
        <h2 class="normal_text" style="text-align:center">Lokacija 3</h2>

         <v-text-field
          v-model="mjestoPostanskiBrojLokacijaTri"
          :counter="255"
          label="Mjesto i poštanski broj:"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="ulicaBrojLokacijaTri"
          :counter="255"
          label="Ulica i broj:"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="opcinaLokacijaTri"
          :counter="255"
          label="Općina:"
          required
          class="text_field"
        ></v-text-field>
         <v-select
          v-model="countyLokacijaTri"
          :items="counties"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field
          v-model="odobreniBrojLokacijaTri"
          :counter="255"
          label="Odobreni broj/evidencijska oznaka odobrenog objekta za preradu:"
          required
          class="text_field font_fit"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
      </v-form>

      <!-- page 6 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===6">
        <h1 style="text-align:center;">4. OPIS ULAGANJA ZA KOJE SE TRAŽI POTPORA</h1>
        <h2 style="text-align:center;" class="textOperacije spacing">
          4.1. Ulaganje/a se odnosi/e na (naznačiti odgovarajuće i opisati na koji način doprinosi naznačenom):
        </h2>
        <br>
        <hr>
        <br>

        <v-checkbox class="bold" v-model="opcijePotpore" label="a) Štednju energije ili smanjenje utjecaja na okoliš, uključujući obradu otpada" :value="1">
        </v-checkbox>

        <v-textarea auto-grow=true name="opis" label="Opis a:" hint="Opišite"></v-textarea>

        <v-checkbox class="bold" v-model="opcijePotpore" label="b) Unaprjeđenje sigurnosti,higijene, zdravstvenih i radnih uvjeta" :value="2">
        </v-checkbox>
        <v-textarea auto-grow=true name="opis" label="Opis b:" hint="Opišite"></v-textarea>

        <v-checkbox class="bold" v-model="opcijePotpore" label="c) Preradu ulova komercijalne ribe koja ne može biti namijenjena za prehranu ljudi" :value="3">   
        </v-checkbox>
        <v-textarea auto-grow=true name="opis" label="Opis c:" hint="Opišite"></v-textarea>

        <v-checkbox class="bold" v-model="opcijePotpore" label="d) Preradu nusproizvoda nastalih prilikom glavnih aktivnosti prerade" :value="4">
        </v-checkbox>
        <v-textarea auto-grow=true name="opis" label="Opis d:" hint="Opišite"></v-textarea>

        <v-checkbox class="bold" v-model="opcijePotpore" label="e) Preradu ekoloških proizvoda akvakulture" :value="5">
        </v-checkbox>
        <v-textarea auto-grow=true name="opis" label="Opis e:" hint="Opišite"></v-textarea>

        <v-checkbox class="bold" v-model="opcijePotpore" label="f) Uvođenje novih ili u naprjeđenje postojećih proizvoda, 
        procesa ili sustava upravljanja i organiz acije" :value="5">
        </v-checkbox>
        <v-textarea auto-grow=true name="opis" label="Opis f:" hint="Opišite"></v-textarea>
        
        
      </v-form>

      <!-- page 7 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===7">
       <h1 style="text-align:center;">5. KRITERIJI ZA ODABIR OPERACIJA
       </h1>
       <h2 class="normal_text" style="text-align:center">(označiti i upisati odgovarajuće. Upute i pojašnjenja primjene 
        kriterija su navedeni u Prilogu I. Pravilnika)</h2>
        <br>
        <h2 style ="text-align:center" class="textOperacije"> 
        5.1. Tip ulaganja
        </h2>
        <br>
        <hr>
        <br>

      <v-checkbox class="bold" v-model="opcijeUlaganja" label="5.1.1. Rekonstrukcija ili modernizacija s ciljem unaprjeđenja
       sigurnosti,higijene, zdravstvenih i radnih uvjeta (8 bodova)" :value="0">
      </v-checkbox>
      <v-checkbox class="bold" v-model="opcijeUlaganja" label="5.1.2. Rekonstrukcija ili modernizacija s ciljem doprinošenja štednji
       energije ili smanjenju utjecaja na okoliš, uključujući obradu otpada (6 bodova)" :value="1">
      </v-checkbox>
      <v-checkbox class="bold" v-model="opcijeUlaganja" label="5.1.3. Nova izgradnja (4 boda)" :value="2">
      </v-checkbox>
      <v-checkbox class="bold" v-model="opcijeUlaganja" label="5.1.4. Ulaganje koje integrira proizvodnju i preradu (4 boda)" :value="3">
      </v-checkbox>
      <br>
      <hr>
      <br>
      <v-text-field
          class="kriterij-box"
          label="UKUPNO kriterij 5.1."
          placeholder="0"
          readonly="true"
      ></v-text-field>

      </v-form>

      <!-- page 8 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===8">
      <h2 style ="text-align:center" class="textOperacije"> 
        5.2. Inovativnost – uvođenje novog ili poboljšanog tehnološkog ili organizacijskog procesa
      </h2>
      <br>
      <hr>
      <br>

      <v-checkbox class="bold" v-model="opcijeInovativnosti" label="5.2.1. Ulaganjem se uvodi prerada nusproizvoda (8 bodova)" :value="0">
      </v-checkbox>
      <v-checkbox class="bold" v-model="opcijeInovativnosti" label="5.2.2. Ulaganjem se uvodi prerada proizvoda ekološke akvakulture (6 bodova)" :value="1">
      </v-checkbox>
      <v-checkbox class="bold" v-model="opcijeInovativnosti" label="5.2.3. Ulaganje se odnosi na preradu neželjenog ulova i/ili ulova 
      komercijalne ribe koja ne može biti namijenjena za prehranu ljudi (4 boda)" :value="2">
      </v-checkbox>
      <br>
      <hr>
      <br>

      <v-text-field
          class="kriterij-box"
          label="UKUPNO kriterij 5.2."
          placeholder="0"
          readonly="true"
      ></v-text-field>
      </v-form>

       <!-- page 9 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===9">

        <h2 style ="text-align:center" class="textOperacije"> 
        5.3. Povećanje proizvodnog asortimana
        </h2>
        <br>
        <hr>
        <br>

        <v-checkbox class="bold" v-model="opcijePovecanjaAsortimana" label="5.3.1. Ulaganjem se uvodi
        tri (3) ili više novih proizvoda (8 bodova)" :value="0">
        </v-checkbox>
        <v-checkbox class="bold" v-model="opcijePovecanjaAsortimana" label="5.3.2. Ulaganjem se uvode dva (2) 
        nova proizvoda (6 bodova)" :value="1">
        </v-checkbox>
        <v-checkbox class="bold" v-model="opcijePovecanjaAsortimana" label="5.3.3. Ulaganjem se uvodi jedan (1) novi proizvod (4 boda)" :value="2">
        </v-checkbox>
        <br>
        <hr>
        <br>
        <v-text-field
            class="kriterij-box"
            label="UKUPNO kriterij 5.3."
            placeholder="0"
            readonly="true"
        ></v-text-field>
      </v-form>

       <!-- page 10 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===10">

        <h2 style ="text-align:center" class="textOperacije"> 
        5.4. Indeks razvijenosti JLS - prema lokaciji ulaganja
        </h2>
        <br>
        <hr>
        <br>

        <v-checkbox class="bold" v-model="opcijeIndexa" label="5.4.1. < 50% prosjeka Republike Hrvatske (4 boda)" :value="0">
        </v-checkbox>
        <v-checkbox class="bold" v-model="opcijeIndexa" label="5.4.2. ≥ 50% ≤ 75% prosjeka Republike Hrvatske (3 boda)" :value="1">
        </v-checkbox>
        <v-checkbox class="bold" v-model="opcijeIndexa" label="5.4.3. > 75% ≤ 100% prosjeka Republike Hrvatske (2 boda)" :value="2">
        </v-checkbox>
        <br>
        <hr>
        <br>
        <v-text-field
            class="kriterij-box"
            label="UKUPNO kriterij 5.4."
            placeholder="0"
            readonly="true"
        ></v-text-field>
      </v-form>

      
      <!-- Page 11 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===11">
        <h1 style="text-align:center;">7. LISTA TROŠKOVA U OKVIRU OPERACIJE</h1>
        <!-- Lista Troškova operacije-->
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista troškova operacije</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi trošak</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemNew.rbrNew" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemNew.nazivTroskaNew" label="Naziv troška"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemNew.brojDokumentaNew" label="Broj dokumenta"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemNew.oznakaAktivnosti" label="Oznaka aktivnosti"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemNew.dobavljacNew" label="Dobavljač"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          class="inputPrice"
                          type="number"
                          v-model="editedItemNew.iznos"
                          label="Iznos bez PDV-a"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          class="inputPrice"
                          type="number"
                          v-model="editedItemNew.pdv"
                          label="PDV"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="save">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headersNew"
            :items="troskovi"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.rbrNew }}</td>
              <td class="text-xs-left">{{ props.item.nazivTroskaNew }}</td>
              <td class="text-xs-left">{{ props.item.dobavljacNew }}</td>
              <td class="text-xs-left">{{ props.item.brojDokumentaNew }}</td>
              <td class="text-xs-left">{{ props.item.oznakaAktivnosti }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.iznosNew) }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.pdvNew) }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.ukupnoNew) }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
        <v-text-field
          v-model="ukupnoSUM"
          label="Ukupno (G)"
          class="text_field ukupno_g_text"
          readonly="true"
        ></v-text-field>
      </v-form>

      <!-- page 12 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===12">
        
        <!-- Lista općih troškova -->
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista općih troškova</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi trošak</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.rbr" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.nazivTroska" label="Naziv troška"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.brojDokumenta" label="Broj dokumenta"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.dobavljac" label="Dobavljač"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          class="inputPrice"
                          type="number"
                          v-model="editedItem.iznos"
                          label="Iznos bez PDV-a"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          class="inputPrice"
                          type="number"
                          v-model="editedItem.pdv"
                          label="PDV"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="save">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="troskovi"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.nazivTroska }}</td>
              <td class="text-xs-left">{{ props.item.dobavljac }}</td>
              <td class="text-xs-left">{{ props.item.brojDokumenta }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.iznos) }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.pdv) }}</td>
              <td class="text-xs-right">{{ formatMoney(props.item.ukupno) }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
        <v-text-field
          v-model="ukupnoSUM"
          label="Ukupno (G)"
          class="text_field ukupno_g_text"
          readonly="true"
        ></v-text-field>
      </v-form>

      <!-- page 13 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===13">
        <h1 class="bold" style="text-align:center;">8. REKAPITULACIJA TROŠKOVA I IZRAČUN JAVNE POTPORE</h1>
        <br>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="A. Ukupni iznos prihvatljivih troškova"
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosOpcihTroskova"
          label="B. Ukupan iznos općih troškova"
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosOpcihTroskova"
          label="C. Prihvatljiv iznos općih troškova."
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskovaPotpore"
          label="D. Ukupan iznos prihvatljivih troškova za izračun potpore"
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="osnovniUdioJavnePotpore"
          label="E. Osnovni udio javne potpore "
          class="text_field"
          readonly="true"
          placeholder="50%"
        ></v-text-field>
        <v-text-field
          v-model="povecanjeUdjelaJavnePotpore"
          label="F. Povećanje udjela javne potpore"
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <br>
        <hr>
        <br>

        <v-checkbox
          v-model="bodovi"
          label="Operacija se provodi otocima Dugi otok, Vis, Mljet i Lastovo. ( + 35 postotnih bodova)"
          :value="2"
        ></v-checkbox>
        <v-checkbox
          v-model="bodovi"
          label="Operaciju provodi ribarska zadruga. ( + 10 postotnih bodova)"
          :value="3"
        ></v-checkbox>
        <v-checkbox
          v-model="bodovi"
          label="Operaciju provodi organizacija proizvođača, 
          udruženje organizacija proizvođača ili međusektorska organizacija. ( + 25 postotnih bodova)"
          :value="4"
        ></v-checkbox>
       <br>
      </v-form>
      
      <!-- page 14 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===14">
        <br>
        <v-text-field
          v-model="udioJavnePotpore"
          label="G. Udio javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0 %"
        ></v-text-field>
        <v-text-field
          v-model="iznosJavnePotpore"
          label="H. Iznos javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <!-- <p>
          * Ako je PDV prihvatljiv trošak
          ** Primjena dodatnih povećanja sukladno Provedbenoj Uredbi Komisije (EU) br. 772/2014:
          - ako je na istu operaciju primjenjivo više povećanja postotnih bodova, primjenjuje se samo najveće povećanje
        </p> -->
        <br>
      </v-form>

      <!-- page 15-->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===15">
      <h1 style="text-align:center;"> 8. OKVIRNI REZULTATI KOJE OČEKUJE KORISNIK</h1>

      <p>
        <span class="bold">NAPOMENA:</span> Podaci koje korisnik dostavlja u okviru ove tablice se ne koriste u svrhu utvrđivanja
        udovoljavanja uvjetima i kriterijima za dodjelu potpore niti u svrhu dodjele bodova na temelju
        kriterija za odabir već se koriste isključivo za potrebe praćenja rezultata i provedbe operacije. 
        Međutim, savjetuje se korisniku da kod procjene okvirnih rezultata planira u najvećoj mogućoj mjeri
        realno i objektivno s obzirom da će Upravljačko tijelo rezultate operacija, prema pokazateljima iz 
        ovih tablica, mjeriti nakon što isti budu stvarno nastali. U tu svrhu, korisnik je dužan Upravljačkom
        tijelu dostaviti podatke i odgovarajuću dokumentaciju vezano uz pokazatelje rezultata nakon što iste 
        bude moguće mjeriti uzimajući u obzir referentnu godinu.
      </p>

      <p>Podaci koji se upisuju u ovu tablicu obuhvaćaju podatke o planiranim rezultatima provedene operacije,
         tj. podatke o očekivanim promjenama u vrijednosti proizvodnje, količini proizvodnje te neto dobiti.
      </p>

      <p><span class="underline-bold">Prethodna godina</span>  - podrazumijeva kalendarsku godinu koja prethodi godini podnošenja zahtjeva za potporu.</p>

      <p><span class="underline-bold">Reprezentativna godina</span> - godina koju  odabire korisnik, a podrazumijeva godinu u kojoj dolazi do
         potpunog iskorištavanja poslovnog kapaciteta operacije, tj. godina u kojoj će prema procjeni korisnika
         biti vidljiv utjecaj operacije na količinu i/ili vrijednost proizvodnje i/ili neto dobit, tj. da će rezultati
         prema pokazateljima biti mjerljivi. Reprezentativna godina mora biti unutar razdoblja od pet godina nakon 
         konačne isplate financijskih sredstava potpore korisniku.
      </p>

      <p>
        <span class="underline-bold">Planirana promjena</span> – razlika između reprezentativne i prethodne godine, 
        koja može biti pozitivna ili negativna, a u pojedinim slučajevima ista ne mora ni nastati,
        tj. operacija ne mora nužno rezultirati promjenom u količini/vrijednosti/neto dobiti. Ako
        je planirana količina/vrijednost u reprezentativnoj godini veća od količine/vrijednosti/neto
        dobiti u prethodnoj godini, promjena je pozitivna i podrazumijeva povećanje količine/vrijednosti/neto
        dobiti. U ovom slučaju je vrijednost promjene potrebno označiti znakom plus „+“. Ako je manja u
        reprezentativnoj godini, tada je promjena negativna, tj. podrazumijeva smanjenje količine/vrijednosti/neto 
        dobiti, te se vrijednost promjene označava znakom minus „-“. Ako se ne očekuje promjena u 
        količini/vrijednosti/neto dobiti kao rezultat operacije, tj. ukoliko su količina/vrijednost/neto dobit 
        u prethodnoj godini i reprezentativnoj godini jednake, vrijednost promjene je nula „0“.
       </p>
      
      </v-form>

      <!-- page 16-->
       <v-form ref="form" v-model="valid" lazy-validation v-if="page===16">
         <h2 class="textOperacije" style="text-align:center;">7.1. Količina prve prodaje proizvoda ribarstva i akvakulture (u kilogramima ili tonama)</h2>
         <br>
         <hr>
         <br>
        <h3 class="normal_text" style="text-align:center;">
          Odnosi se na količinu prve prodaje prerađenih proizvoda ribarstva i akvakulture u tonama ili kilogramima
        </h3>
        <br>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="reprezentativnaGodinaA"
                label="A. Reprezentativna godina:"
                class="text_field"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="kolicinaA" label="A. Količina:" class="text_field"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-select
                v-model="mjernaJedinica"
                :items="mjere"
                :rules="[v => !!v || 'Polje je obavezno']"
                label="Mjerna jedinica"
                required
                class="text_field"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="prethodnaGodinaB"
                label="B. Prethodna godina:"
                class="text_field"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="kolicinaB" label="B. Količina:" class="text_field"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-select
                v-model="mjernaJedinica"
                :items="mjere"
                :rules="[v => !!v || 'Polje je obavezno']"
                label="Mjerna jedinica"
                required
                class="text_field"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="planiranaPromjenaAB"
                label="PLANIRANA PROMJENA (A-B):"
                class="text_field"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-select
                v-model="mjernaJedinica"
                :items="mjere"
                label="Mjerna jedinica"
                class="text_field"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <!-- page 17-->
       <v-form ref="form" v-model="valid" lazy-validation v-if="page===17">
         <h2 class="textOperacije" style="text-align:center;">7.2. Vrijednost prve prodaje prerađenih proizvoda ribarstva i akvakulture (u kunama)</h2>
         <br>
         <hr>
         <br>
        <h3 class="normal_text" style="text-align:center;">
          Odnosi se na vrijednost prve prodaje prerađenih proizvoda ribarstva i akvakulture u tonama ili kilogramima
        </h3>
        <br>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="reprezentativnaGodinaA"
                label="A. Reprezentativna godina:"
                class="text_field"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="prethodnaGodinaB"
                label="B. Prethodna godina:"
                class="text_field"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="vrijednostA" label="A. Vrijednost:" class="text_field"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="vrijednostB" label="B. Vrijednost" class="text_field"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="planiranaPromjenaAB"
                label="PLANIRANA PROMJENA (A-B)"
                class="text_field"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
       </v-form>

       <!-- page 18-->
       <v-form ref="form" v-model="valid" lazy-validation v-if="page===18">
         <h1 class="upper spacing no-margin" style="text-align:center;">8. IZJAVA KORISNIKA</h1>
        <p
          style="text-align:center"
          class="bold"
        >Ja dolje potpisani, pod materijalnom i kaznenom odgovornošću, izjavljujem:</p>
        <hr>
        <ul class="izjava">
          <li style="text-align: justify;">Da sam upoznat/a i suglasan/a sa sadržajem Pravilnika i Natječaja te s ostalim zakonskim/podzakonskim aktima i pratećim regulativama</li>
          <li style="text-align: justify;">Da su svi podaci u Zahtjevu i pratećoj dokumentaciji istiniti i točni, te da sam upoznat s posljedicama davanjem netočnih i krivih podataka</li>
          <li style="text-align: justify;">Da dopu&scaron;tam kori&scaron;tenje osobnih podataka ( ime i prezime, OIB, e-mail adresa, kućna adresa i broj telefona, odnosno podaci koji inače nisu javno dostupni) i podataka iz službenih evidencija (naziv firme, obrta,zadruge, OIB, adresa,broj telefona i sl.) u skladu s propisima koji uređuju za&scaron;titu osobnih i drugih podataka</li>
          <li style="text-align: justify;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</li>
          <li style="text-align: justify;">Da aktivnosti koje su predmet potpore nisu financirane nikakvim drugim javnim izdacima</li>
          <li style="text-align: justify;">Da sam upoznat sa činjenicom da se sredstva koja su nezakonito ostvarena moraju vratiti (zajedno sa zakonski propisanim zateznim kamatama)</li>
          <li style="text-align: justify;">Da nisam u sukobu interesa s izvođačima radova i/ili ponuditeljima/dobavljačima roba i/ili usluga koji su predmet ulaganja</li>
          <li style="text-align: justify;">Da nisam počinio prijevaru u okviru Europskog fonda za ribarstvo ili Europskog fonda za pomorstvo i ribarstvo, a sukladno članku 1. Konvencije o za&scaron;titi financijskih interesa Zajednice.</li>
          <li style="text-align: justify;">Da sam suglasan/a da budem uvr&scaron;ten u popis korisnika koji se objavljuje u skladu s člankom 119. stavkom 2. Uredbe (EU) br. 508/2014 Europskog parlamenta i Vijeća o Europskom fondu za pomorstvo i ribarstvo</li>
          <li style="text-align: justify;">Da ću čuvati svu dokumentaciju koja se odnosi na dodjelu sredstava iz EFPR- a najmanje dvije (2) godine od 31. prosinca nakon predaje računa kojima su uključeni izvr&scaron;ni izdaci operacije</li>
          <li style="text-align: justify;">Da ću omogućiti kontrolu na terenu i pristup dokumentaciji vezanoj za aktivnosti za koje je ostvarena potpora temeljem Pravilnika i Natječaja Upravljačkom tijelu, Tijelu za ovjeravanje, Tijelu za reviziju i tijela uključenih u revizije Operativnog programa iz članka 127. stavka 2. Uredbe (EU) 1303/2013 kao i ovla&scaron;tenim predstavnicima Europske komisije, Europskog revizorskog suda, Europskog ureda za borbu protiv prijevara (OLAF) i drugih nadležnih nadzornih/revizorskih tijela</li>
          <li style="text-align: justify;">Da ću voditi ili odvojeni računovodstveni sustav ili primjereni računovodstveni kod/oznaku za sve transakcije vezane uz operaciju za koju mi je dodijeljena potpora</li>
        </ul>
     </v-form>
     
     <!-- Page 19 -->
     <v-form ref="form" v-model="valid" lazy-validation v-if="page===19">
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm2 md2>
              <v-text-field v-model="mjesto" label="U:" class="text_field"></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <v-text-field v-model="godina" label="Godine:" class="text_field"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="imePrezimeOdgovorneOsobe"
                label="Ime i prezime odgovorne osobe:"
                class="text_field"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      <template>
          <div id="app">
            <vueSignature ref="signature" :sigOption="option" :w="'400px'" :h="'200px'" class="signature-box"></vueSignature>
            <vueSignature ref="signature1" :sigOption="option"></vueSignature>
            <button class="sig-btn first-sig-btn" @click="saveSig">Shrani</button>
            <button class="sig-btn" @click="clearSig">Počisti</button>
            <button class="sig-btn" @click="undoSig">Ukinuti</button>
            <button class="sig-btn" @click="addWaterMarkSig">Dodaj vodeni žig</button>
          </div>
        </template>
     </v-form>
     
     <div class="text-md-center text-lg-center text-xs-center">
        <v-pagination v-model="page" :length="19" :total-visible="5" class="pagi"></v-pagination>
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
    page: 1,
    checkbox: false,
    dialog: false,

    // Lista općih troškova
    headers: [
      { text: "Rbr. (A)", value: "rbr" },
      {
        text: "Naziv i opis troška (B)",
        align: "left",
        sortable: false,
        value: "nazivTroska"
      },
      {
        text: "Naziv ponuditelja/pružatelja usluge(C)",
        value: "dobavljac"
      },
      { text: "Broj ponude /predračuna /računa (D)", value: "brojDokumenta" },
      { text: "Iznos bez PDV-a (E)", value: "iznos" },
      { text: "Iznos PDV-a (F)", value: "pdv" },
      { text: "Ukupan iznos (G)", value: "ukupno" }
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
  },


}

 </script>¸


<!-- css .................................................. -->
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

.theme--light.v-pagination .v-pagination__item--active {
  background-color: #0868ac;
  color: #fff;
  font-weight: bold;
}



/*----- custom ------------- */

h1 {
  font-weight: bold;
  margin-bottom: 25px;
}

.bold {
  font-weight: 600;
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

.no-margin {
  margin: 0;
}

hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.v_card {
  position: relative;
  width: 100%;
  max-width: 1050px;
  margin: 0;
  padding: 5%;
  margin: 0 auto;
}

.text_field {
  width: 100%;
  max-width: 450px;
  font-weight: bold;
}

.short_text_field {
  width: 100%;
  max-width: 150px;
  font-weight: bold;
}

.medium_text_field {
  width: 100%;
  max-width: 250px;
  font-weight: bold;
}

.font_fit label {
  font-size: 13px !important;
}

.troskovi_field {
  width: 100%;
  max-width: 150px;
}

.textOperacije {
  font-size: 20px;
  margin-top: 20px;
  color:#001f3f;
  font-weight: bold;
}

.aktivnost-text {
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0 10px;
}

.subtext {
  color: var(--primary-color) !important;
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
}

/* textarea {
    display: block;
    width: 100%;
    padding: 10px;
    color:#3e4444;
    border: 1px solid #979797;
    border-radius: 3px;
} */

hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.aktivnost-subtext {
  display: block;
  font-weight: bold;
  margin: 10px 0;
}

.signature-box {
  border: 1px solid #979797;
}

#app div:nth-child(2) {
  display: none;
}


.sig-btn {
  padding: 0 10px;
  margin: 20px 0;
}

.custom_field {
  max-width: 60px;
}

.iznos_field {
  max-width: 120px;
}

.izjava li span {
  line-height: 1.3;
}

.hidden {
  display: none;
}

.show {
  display: block;
}

/* counties */
.v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: 0! important;
}

.spacing {
  padding: 20px;
}

.kriterij-box {
  width: 120px;
  white-space: pre;
  margin-bottom: 20px;
}

.underline-bold {
  text-decoration: underline;
  font-weight: bold;
}


/* Tabela ----------------------------------------------------------- */
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
  width: 115px !important;
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

.theme--light.v-datatable .v-datatable__actions {
  margin-bottom: 15px;
}

th.column.sortable.text-xs-left {
  padding-bottom: 5px;
}

.ukupno_g_text {
  width: 100px;
}

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

.clean-btn:hover {
  background: var(--primary-color) !important;
  color: var(--secondary-color);
  box-shadow: 3px solid #043e67;
}

  .clean-btn {
    margin-bottom: 50px !important;
  }


.v-textarea label:first-child {
    font-weight:bold;
    font-size:16px;  
}

/* responsive */

@media only screen and (max-width: 320px) {
    h1 {
      font-size: 16px !important;
    }

    h2 {
      font-size: 13px !important;
    }

    h2.rekap_title {
    letter-spacing: 1.3px !important; 
   }

    textarea {
      margin: 0 auto;
      width: 100%;
    }

   .pagi {
    position: absolute;
    left: -7px;
    bottom: -50px;
  }

  .theme--light.v-datatable .v-datatable__actions {
    margin-bottom: 40px;
  }

  .signature-box {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }

   .clean-btn {
    margin-bottom: 50px !important;
  }

  .sig-btn {
    padding: 0 4px;
    margin-bottom: 40px;
  }

  .table-header {
    width: 50px;
  }

  .v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: -273px !important;
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
    font-weight: normal;
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
