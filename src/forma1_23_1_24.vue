<template>
  <v-container>
    <v-card class="v_card">
      <!-- page 1 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
        <h1 style="text-align:center;">ZAHTJEV ZA POTPORU</h1>
        <h2
          style="text-align:center;"
        >Natječaj za dodjelu potpore u okviru mjere „Ribarske luke, iskrcajna mjesta, burze riba i zakloništa“
        („Narodne novine“, broj 10/2018 i 11/2018)</h2>
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
        <v-text-field
          v-model="OIB"
          :counter="11"
          label="OIB (samo u slučaju fizičke osobe)"
          required
          class="text_field"
        ></v-text-field>
        

        
        <br>
        <br>
        <hr>
        <br>
        
        <v-text-field
          v-model="imePrezimeOdgovorneOsobeKorisnika"
          :counter="255"
          label="Ime i prezime odgovorne osobe ovlaštene za zastupanje korisnika:"
          required
          class="text_field shorten"
        ></v-text-field>
        <br>
       

         <v-radio-group
          v-model="oblikKorisnika" 
          label="Tip korisnika"
        >
          <v-radio :key="fizickaOsoba" :label="'Lučka uprava'" :value="0"></v-radio>
          <v-radio :key="obrt" :label="'Jedinica lokalne i područne samouprave'" :value="1"></v-radio>
          <v-radio :key="trgovackoDrustvo" :label="'Ovlaštenik koncesije zaupravljanje lučkim područjem'" :value="2"></v-radio>
        </v-radio-group>

        

         <v-radio-group v-model="korisnikObveznikPDVa" label="Korisnik obveznik PDV-a">
          <v-radio :key="da" :label="'Da'" :value="0"></v-radio>
          <v-radio :key="ne" :label="'ne'" :value="1"></v-radio>
        </v-radio-group>

        <v-radio-group
          v-model="korisnikObveznikPostupkaJavneNabave"
          label="Korisnik obveznik postupka javne nabave"
        >
          <v-radio :key="da" :label="'Da'" :value="0"></v-radio>
          <v-radio :key="ne" :label="'ne'" :value="1"></v-radio>
        </v-radio-group>

         <v-radio-group v-model="velicinaPoduzeca" label="Veličina poduzeća">
          <v-radio :key="mikro" :label="'Mikro'" :value="0"></v-radio>
          <v-radio :key="malo" :label="'Malo'" :value="1"></v-radio>
          <v-radio :key="srednje" :label="'Srednje'" :value="2"></v-radio>
          <v-radio :key="veliko" :label="'Veliko'" :value="3"></v-radio>
          <v-radio :key="veliko" :label="'Nije primjenjivo'" :value="4"></v-radio>
        </v-radio-group>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Morate se složiti da bi nastavili!']"
          label="Slažete li se?"
          required
        ></v-checkbox>
      </v-form>

     
      <!--page 2 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===2">
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

    <!-- page 3 -->
    <v-form ref="form" v-model="valid" lazy-validation v-if="page===3">
        <h1 class="subtitle upper">3. Podaci o operaciji</h1>
        <br>
        <br>
        <v-radio-group
          v-model="operacijaObuhvaca"
          label="Operacija obuhvaća:"
        >
          <v-radio
            :key="podaciOperacije"
            :label="'Ulaganje/a u ribarsku luku'"
            :value="0"
          ></v-radio>
          <v-radio
            :key="podaciOperacije"
            :label="'Ulaganje/a u iskrcajno mjesto'"
            :value="1"
          ></v-radio>
        </v-radio-group>

        <hr>
        <br>
        <h2 class="textOperacije" style="text-align: center">Lokacija ulaganja (lokacija ribarske luke/iskrcajnog mjesta):</h2>
        <br>
        <v-text-field v-model="mjestoUlaganja" :counter="50" label="Mjesto ulaganja" required class="text_field"></v-text-field>
        <v-text-field v-model="opcina" :counter="50" label="Opčina" required class="text_field"></v-text-field>    
        <v-select
          v-model="county"
          :items="counties"
          :rules="[v => !!v || 'Polje je obavezno']"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field v-model="luckoPodrucje" :counter="50" label="Lučko područje" required class="text_field"></v-text-field>
        <br>
        <hr>
        <br>

        <p
          class="normal_text"
        >Ulaganje/a se odnosi/e na (naznačiti odgovarajuće i opisati ulaganje.
         Moguć je višestruki odabir tipova ulaganja u okviru jedne operacije):</p>
         <br>

        <v-checkbox v-model="opcijeUlaganja" label=" a) Povećanje kvalitete, kontrole i sljedivosti iskrcaja ribarskih plovila" :value="0"></v-checkbox>
        <v-textarea id="textAreaOne" name="opis" label="Opis a:" hint="Opišite"></v-textarea>
        <v-checkbox v-model="opcijeUlaganja" label=" b) Poboljšanje zdravlja, sigurnosti i radnih uvjeta" :value="1"></v-checkbox>
        <v-textarea name="opis" label="Opis b:" hint="Opišite"></v-textarea>
        <v-checkbox v-model="opcijeUlaganja" label=" c) Zaštita okoliša i prirode i energetska učinkovitost" :value="2"></v-checkbox>
        <v-textarea name="opis" label="Opis c:" hint="Opišite"></v-textarea>
        <br>
        <hr>
        <br>
        <p class="normal_text"> Podaci provedbi operacije</p>
        <p class="normal_text">Broj osoba koje će imati izravne koristi od operacije (ne uključujućiribare) (upisati broj djelatnika u ribarskoj luci/iskrcajnom mjestu ili drugih osoba koje će imati koristi od operacije):</p>
        <v-text-field v-model="brojOsobaOperacije" label="Broj osoba" required class="ukupno_g_text"></v-text-field>
      
      </v-form>

      <!-- page 4 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===4">
        <h1 style="text-align:center;">4. LISTA TROŠKOVA U OKVIRU OPERACIJE</h1>
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

      <!-- page 5 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===5">
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

      <!-- page 6 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===6">
        <h1
          class="subtitle upper"
          style="text-align:center;"
        >5. Rekapitulacija troškova i izračun javne potpore</h1>
      
        <p class="normal_text" style="text-align: center">(ispuniti 5.1. ili 5.2. ovisno o tipu korisnika)</p>
        <br>
         <h2 class="textOperacije" style="text-align: center">5.1. Javnopravno tijelo ili poduzeće kojem je povjereno obavljanje
            usluga od općeg gospodarskog interesa</h2>
         <br>
         <hr>
         <br>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="A. Ukupni iznos prihvatljivih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosOpcihTroskova"
          label="B. Ukupan iznos općih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="prihvatljiviIznosOpcihTroskova"
          label="C. Prihvatljivi iznos općih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupanIznosPrihvatljivihTroskova"
          label="D. Ukupan iznos prihvatljivih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <br>
      </v-form>

      <!-- page 7 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===7">
        <br>
        <v-text-field
          v-model="udioJavnePotpore"
          label="E. Udio javne potpore "
          class="short_text_field"
          readonly="true"
          placeholder="100%"
        ></v-text-field>
        <v-text-field
          v-model="udioJavnePotpore"
          label="F. Iznos javne potpore"
          class="short_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <br>
      </v-form>

      <!-- page 8 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===8">
       
         <h2 class="textOperacije" style="text-align: center">5.2. Ostali korisnici</h2>
         <br>
         <hr>
         <br>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskovaOstalo"
          label="A. Ukupni iznos prihvatljivih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosOpcihTroskovaOstalo"
          label="B. Ukupan iznos općih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="prihvatljiviIznosOpcihTroskovaOstalo"
          label="C. Prihvatljivi iznos općih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupanIznosPrihvatljivihTroskovaOstalo"
          label="D. Ukupan iznos prihvatljivih troškova za izračun potpore"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
         <v-text-field
          v-model="osnovniUdioJavnePotporeOstalo"
          label="E. Osnovni udio javne potpore "
          class="medium_text_field"
          readonly="true"
          placeholder="50%"
        ></v-text-field>
        <br>
        <hr>
        <br>
         <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskovaOstalo"
          label="F. Povećanje/smanjenje udjela javne potpore"
          class="medium_text_field"
          readonly="true"
          placeholder="0 postotnih bodova"
        ></v-text-field>
        <br>

        <v-checkbox
          v-model="bodoviOstalo"
          label="Operacija se provodi otocima Dugi otok, Vis, Mljet i Lastovo. ( + 35 postotnih bodova)"
          :value="0"
        ></v-checkbox>
        <v-checkbox
          v-model="bodoviOstalo"
          label="Operaciju provodi ribarska zadruga. ( + 10 postotnih bodova)"
          :value="1"
        ></v-checkbox>
        <v-checkbox
          v-model="bodoviOstalo"
          label="Operaciju provodi organizacija proizvođača, udruženje organizacija proizvođača ili međusektorska organizacija. ( + 25 postotnih bodova)"
          :value="2"
        ></v-checkbox>
        <v-checkbox
          v-model="bodoviOstalo"
          label="Operaciju provodi poduzeće koje nije obuhvaćeno definicijom malih i srednjih poduzeća. ( - 20 postotnih bodova)"
          :value="3"
        ></v-checkbox>
        <br>
      </v-form>

      <!-- page 9 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===9">
        <br>
         <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="G. Udio javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0 %"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="H. Iznos javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <br>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===10">
        <h1 class="upper subtext" style="text-align:center;">11. izjava korisnika</h1>
        <p
          style="text-align:center"
          class="bold"
        >Ja dolje potpisani, pod materijalnom i kaznenom odgovornošću, izjavljujem:</p>
        <hr>
        <ul class="izjava">
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat/a i suglasan/a sa sadržajem Pravilnika i Natječaja te s ostalim zakonskim/podzakonskim aktima i pratećim regulativama</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da su svi podaci u Zahtjevu i pratećoj dokumentaciji istiniti i točni, te da sam upoznat s posljedicama davanjem netočnih i krivih podataka</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da dopu&scaron;tam kori&scaron;tenje osobnih podataka (ime i prezime, OIB, e-mail adresa, kućna adresa i broj telefona, odnosno podaci koji inače nisu javno dostupni) i podataka iz službenih evidencija (naziv firme, obrta,zadruge, OIB, adresa,broj telefona i sl.) u skladu s propisima koji uređuju za&scaron;titu osobnih i drugih podataka te, ako je primjenjivo, podataka koji se prikupljaju kroz obrasce za prikupljanje ekonomskih podataka za ribolovnu flotu u okviru programa prikupljanja podataka, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam u sukobu interesa s izvođačima radova i/ili ponuditeljima/dobavljačima roba i/ili usluga koji su predmet ulaganja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Ako je primjenjivo, Da nisam počinio te&scaron;ki prekr&scaron;aj na temelju članka 42. stavka 1. Uredbe Vijeća (EZ) br. 1005/2008 ili članka 90. stavka 1. Uredbe (EZ) br. 1224/2009 odnosno da mi, u odnosu na plovilo koje je predmet potpore, nije dodijeljeno devet ili vi&scaron;e kaznenih bodova za te&scaron;ke prekr&scaron;aje navedene u točkama 1., 2. i 5. Priloga XXX. Uredbe (EU) br. 404/2011.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Ako je primjenjivo, da plovilo/a kojemu/ima sam vlasnik i/ili ovla&scaron;tenik povlastice nije/nisu na Unijinom popisu nezakonitih, neprijavljenih i nereguliranih plovila kako je određeno u članku 40. stavku 3. Uredbe (EZ) br. 1005/2008. </span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Ako je primjenjivo, da plovilo/a kojemu/ima sam vlasnik i/ili ovla&scaron;tenik povlastice ne plovi/e pod zastavom zemlje s popisa nekooperativnih trećih zemalja iz članka 33. Uredbe (EZ) br. 1005/2008.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam počinio prijevaru u okviru Europskog fonda za ribarstvo ili Europskog fonda za pomorstvo i ribarstvo, a sukladno članku 1. Konvencije o za&scaron;titi financijskih interesa Zajednice.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću djelovati u skladu s uvjetima iz članka 6. stavka 2. Pravilnika tijekom cijelog razdoblja provedbe operacije te tijekom pet godina nakon primljene konačne uplate sredstava</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću čuvati svu dokumentaciju koja se odnosi na dodjelu sredstava iz EFPR- a najmanje dvije (2) godine od 31. prosinca nakon predaje računa kojima su uključeni izvr&scaron;ni izdaci operacije</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam suglasan/a da budem uvr&scaron;ten u popis korisnika koji se objavljuje u skladu s člankom 119. stavkom 2. Uredbe (EU) br. 508/2014 Europskog parlamenta i Vijeća o Europskom fondu za pomorstvo i ribarstvo</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću omogućiti kontrolu na terenu i pristup dokumentaciji vezanoj za aktivnosti za koje je ostvarena potpora na temelju Pravilnika i Natječaja Upravljačkom tijelu, Tijelu za ovjeravanje, Tijelu za reviziju i tijela uključenih u revizije Operativnog programa iz članka 127. stavka 2. Uredbe (EU) 1303/2013 kao i ovla&scaron;tenim predstavnicima Europske komisije, Europskog revizorskog suda, Europskog ureda za borbu protiv prijevara (OLAF) i drugih nadležnih nadzornih/revizorskih tijela</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću voditi ili odvojeni računovodstveni sustav ili primjereni računovodstveni kod/oznaku za sve transakcije vezane uz operaciju za koju mi je dodijeljena potpora</span></li>
        </ul>
        <br>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===11">
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
        <v-pagination v-model="page" :length="11" :total-visible="5" class="pagi"></v-pagination>
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
