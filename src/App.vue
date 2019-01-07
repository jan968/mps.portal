<template>
  <v-container>
    <v-card class="v_card">
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
        <h1 style="text-align:center;">ZAHTJEV ZA POTPORU</h1>
        <h2
          style="text-align:center;"
        >Natječaj za dodjelu potpore u okviru mjere I.1. „Inovacije“ („Narodne novine“, broj 57/2017)</h2>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Ime"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="OIB"
          :counter="11"
          label="OIB (samo u slučaju fizičke osobe)"
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
        <v-select
          v-model="county"
          :items="counties"
          :rules="[v => !!v || 'Polje je obavezno']"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="text_field"
        ></v-text-field>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <v-radio-group v-model="tipKorisnika" label="Tip korisnika">
          <v-radio :key="gospodarskiRibolov" :label="'Gospodarski ribolov'" :value="0"></v-radio>
          <v-radio
            :key="preradaProizvodaRibarstva"
            :label="'Prerada proizvoda ribarstva'"
            :value="1"
          ></v-radio>
          <v-radio :key="zajedničkiKorisnik" :label="'Zajednički korisnik'" :value="2"></v-radio>
          <v-radio :key="znanstvenoTijelo" :label="'Znanstveno tijelo'" :value="3"></v-radio>
        </v-radio-group>
        <v-radio-group
          v-model="zaGospodraskiRibolov"
          v-if="tipKorisnika===0"
          label="Za gospodarski riblov"
        >
          <v-radio :key="vlasnikPovlastice" :label="'Vlasnik povlastice'" :value="0"></v-radio>
          <v-radio :key="ovlastenikPovlastice" :label="'Ovlaštenik povlastice'" :value="1"></v-radio>
        </v-radio-group>
        <v-radio-group
          v-model="pravniOblikKorisnika"
          v-if="tipKorisnika===1"
          label="Pravni oblik korisnika"
        >
          <v-radio :key="fizickaOsoba" :label="'Fizička osoba'" :value="0"></v-radio>
          <v-radio :key="obrt" :label="'Obrt'" :value="1"></v-radio>
          <v-radio :key="trgovackoDrustvo" :label="'Trgovačko društvo'" :value="2"></v-radio>
          <v-radio :key="ustanova" :label="'Ustanova'" :value="3"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="zaObrt" v-if="pravniOblikKorisnika===1" label="Za obrt">
          <v-radio :key="obveznikPorezaNaDohodak" :label="'Obveznik poreza na dohodak'" :value="0"></v-radio>
          <v-radio :key="obveznikPorezaNaDobit" :label="'Obveznik poreza na dobit'" :value="1"></v-radio>
        </v-radio-group>

        <v-radio-group
          v-model="zaTrgovackoDrustvo"
          v-if="pravniOblikKorisnika===2"
          label="Za trgovačko društvo"
        >
          <v-radio :key="doo" :label="'d.o.o.'" :value="0"></v-radio>
          <v-radio :key="jdoo" :label="'j.d.o.o.'" :value="1"></v-radio>
          <v-radio :key="dd" :label="'d.d.'" :value="2"></v-radio>
        </v-radio-group>
        <v-radio-group
          v-model="zaZajednickiKorisnik"
          v-if="tipKorisnika===2"
          label="Za zajednički korisnik"
        >
          <v-radio :key="zadruga" :label="'Ribarska zadruga'" :value="0"></v-radio>
          <v-radio
            :key="organizacija"
            :label="'Organizacija proizvođaća/udruženje organizacija proizvođaća / međusektorska organizacija '"
            :value="1"
          ></v-radio>
          <v-radio
            :key="javnoTijelo"
            :label="'Javno tijelo utemljeno zakonom koje predstavlja subjekte u ribarstvu '"
            :value="2"
          ></v-radio>
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
        </v-radio-group>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Morate se složiti da bi nastavili!']"
          label="Slažete li se?"
          required
        ></v-checkbox>
        </v-form>

        <v-form ref="form" v-model="valid" lazy-validation v-if="page===2">
        <h1 style="text-align:center;">SAMO ZA OBRTE</h1>
        <v-text-field
          v-model="vlasnikObrtaImePrezime"
          :counter="255"
          label="Ime i prezime vlasnika obrta"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibNositeljaObrta"
          :counter="11"
          label="OIB nositelja obrta"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeOdgovorneOsobeObrt"
          :counter="255"
          label="Ime i prezime odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibOdgovorneOsobeObrt"
          :counter="11"
          label="OIB odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===3">
        <h1 style="text-align:center;">SAMO ZA PRAVNE OSOBE</h1>
        <v-text-field
          v-model="imePrezimeVlasnikaDirektora"
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
          v-model="oibOdgovorneOsobePravna"
          :counter="11"
          label="OIB odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===4">
        <h1 style="text-align:center;">SAMO ZA JAVNA TIJELA/USTANOVE</h1>
        <v-text-field
          v-model="oibJavnogTijela"
          :counter="11"
          label="OIB javnog tijela"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeOdgovorneOsobeJavna"
          :counter="255"
          label="Ime i prezime odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibOdgovorneOsobeJavna"
          :counter="11"
          label="OIB odgovorne osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===5">
        <h1 style="text-align:center;">2. PODACI O KONTAKT OSOBI</h1>
        <v-text-field
          v-model="kontaktIme"
          :counter="255"
          label="Ime"
          required
          class="text_field"
        ></v-text-field>
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

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===6">
        <h1 style="text-align:center;">3. PODACI O VLASNICIMA/SUVLASNICIMA PLOVILA</h1>
        <h2 style="text-align:center;">(ispunjava se isključivo ako se operacija odnosi na fizičko ulaganje u plovilo
           i to u slučajevima kada Zahtjev za potporu podnosi vlasnik plovila, a nije jedini vlasnik te kada Zahtjev za 
           potporu podnosi ovlaštenik povlastice, a koji nije ujedno i vlasnik ribarskog plovila. Ako su operacijom obuhvaćena 
           fizička ulaganja u više ribarskih plovila, po potrebi dodati nove retke i navesti podatke za svako plovilo u slučaju više
           vlasnika/različitog vlasnika od ovlaštenika)
        </h2>
        <h2 class="subtitle">3.1.1. Gospodarski ribolov na moru</h2>
        <h3 class="subtext">Plovilo broj 1</h3>
        <v-text-field
          v-model="cfrPlovila1"
          :counter="255"
          label="CFR plovila"
          required
          class="text_field cfr_text"
        ></v-text-field>

        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Suvlasnici plovila</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi suvlasnik</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitlePlovilo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.rbr" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.imePrezime" label="Ime i prezime"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.oib" label="OIB"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closePlovilo">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="savePlovilo">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table :headers="headersPlovilo" :items="plovilo" class="elevation-1" rows-per-page-text="redaka po stranici">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" >{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.imePrezime }}</td>
              <td class="text-xs-left" >{{ props.item.oib }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemPlovilo(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemPlovilo(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
      </v-form>


      <v-form ref="form" v-model="valid" lazy-validation v-if="page===7">
        <h2 class="subtitle">3.1.1. Gospodarski ribolov na moru</h2>
        <h3 class="subtext">Plovilo broj 2</h3>
        <v-text-field
          v-model="cfrPlovila1"
          :counter="255"
          label="CFR plovila"
          required
          class="text_field cfr_text"
        ></v-text-field>
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Suvlasnici plovila</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi suvlasnik</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitlePlovilo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.rbr" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.imePrezime" label="Ime i prezime"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.oib" label="OIB"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closePlovilo">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="savePlovilo">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table :headers="headersPlovilo" :items="plovilo" class="elevation-1" rows-per-page-text="redaka po stranici">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" >{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.imePrezime }}</td>
              <td class="text-xs-left" >{{ props.item.oib }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemPlovilo(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemPlovilo(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===8">
        <h2 class="subtitle">3.1.2. Gospodarski ribolov na slatkim vodama</h2>
        <h3 class="subtext">Plovilo broj 1</h3>
        <v-text-field
          v-model="cfrPlovila1"
          :counter="255"
          label="CFR plovila"
          required
          class="text_field cfr_text"
        ></v-text-field>
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Suvlasnici plovila</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi suvlasnik</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitlePlovilo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.rbr" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.imePrezime" label="Ime i prezime"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.oib" label="OIB"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closePlovilo">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="savePlovilo">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table :headers="headersPlovilo" :items="plovilo" class="elevation-1" rows-per-page-text="redaka po stranici">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" >{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.imePrezime }}</td>
              <td class="text-xs-left" >{{ props.item.oib }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemPlovilo(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemPlovilo(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===9">
        <h2 class="subtitle">3.1.2. Gospodarski ribolov na slatkim vodama</h2>
        <h3 class="subtext">Plovilo broj 2</h3>
        <v-text-field
          v-model="cfrPlovila1"
          :counter="255"
          label="CFR plovila"
          required
          class="text_field cfr_text"
        ></v-text-field>
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Suvlasnici plovila</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi suvlasnik</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitlePlovilo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.rbr" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.imePrezime" label="Ime i prezime"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.oib" label="OIB"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closePlovilo">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="savePlovilo">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table :headers="headersPlovilo" :items="plovilo" class="elevation-1" rows-per-page-text="redaka po stranici">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" >{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.imePrezime }}</td>
              <td class="text-xs-left" >{{ props.item.oib }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemPlovilo(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemPlovilo(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===10">
        <h1 class="subtitle upper">4. Podaci o znanstevnom tijelu</h1>
        <v-text-field
          v-model="nazivZnanstevnogTijela"
          :counter="255"
          label="Naziv znanstvenog tijela:"
          required
          class="text_field"
        ></v-text-field>
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
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===11">
        <h1 class="subtitle upper">5. Podaci o operaciji</h1>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <v-radio-group v-model="operacijaObuhvaca" label="5.1 Operacija obuhvaća inovaciju koja se odnosi na:">
          <v-radio :key="gospodarskiRibolovNaMoru" :label="'Gospodarski ribolov na moru/preradu proizvoda gospodarskog ribolova na moru'" :value="0"></v-radio>
          <v-radio
            :key="gospodarskiRibolovNaSlatkimVodama"
            :label="'Gospodarski ribolov na slatkim vodama/preradu proizvoda gospodarskog ribolova na slatkim vodama'"
            :value="1"
          ></v-radio>
          <v-radio :key="oboje" :label="'Oboje'" :value="2"></v-radio>
        </v-radio-group>

        <hr>

        <h4 class="checkbox-text">5.2. Inovacija se odnosi na (naznačiti odgovarajuće i opisati aktivnost/i):</h4>
        
        <v-checkbox 
        v-model="opcije"
        label=" a) Nove ili poboljšane metode i tehnike"
        :value="1">
        </v-checkbox>

        <v-checkbox v-model="opcije"
        label=" b) Nove ili značajno poboljšana oprema"
        :value="2">
        </v-checkbox>

        <v-checkbox v-model="opcije"
        label=" c) Nove ili značajno poboljšani proizvodi"
        :value="3">
        </v-checkbox>

        <v-checkbox v-model="opcije"
        label="d) Novi ili poboljšani sustavi upravljanja i organizacije"
        :value="4">
        </v-checkbox>

        <v-textarea
            id="textAreaOne"
            name="opis"
            label="Opis a:"
            hint="Opišite"
          ></v-textarea>
          <v-textarea
            name="opis"
            label="Opis b:"
            hint="Opišite"
          ></v-textarea>
          <v-textarea
            name="opis"
            label="Opis c:"
            hint="Opišite"
          ></v-textarea>
          <v-textarea
            name="opis"
            label="Opis d:"
            hint="Opišite"
          ></v-textarea>
  
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===12">
        <h2 class="subtitle">5.3 Operacija obuhvaća ribarska plovila 
        (ako operacija obuhvaća ribarska plovila, navesti podatke za sva plovila koja su obuhvaćena/sudjeluju u provedbi operacije):</h2>
        <br>

        <h4 style="text-align:center;">5.3.1. Gospodarski ribolov na moru</h4>

        <v-text-field
          v-model="rBr"
          :counter="255"
          label="Rbr"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="cfrBrojPlovila"
          :counter="255"
          label="CFR broj plovila"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="serijskiBrojPovlastice"
          :counter="255"
          label="Serijski broj povlastice"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="vlasnikPovlasticePlovila"
          :counter="255"
          label="Vlasnik povlastice/plovila"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="ovlastenikPovlastice"
          :counter="255"
          label="Ovlaštenik povlastice"
          required
          class="text_field"
        ></v-text-field>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===13">
        <h1 class="subtitle upper" style="text-align:center;">6. kriterij za odabir operacija</h1>
        <br>

        <h2 class="subtitle">6.1. Tip operacije</h2>
        <br>
        <h4 style="text-align:center">Bodovi se na temelju ovoga kriterija dodjeljuju ovisno o tipu operacije koja je predmet potpore.</h4>
        <br>
        <br>
        <br>
        <br>
        <br>

        <v-checkbox 
        v-model="bodovi"
        label="6.1.1. Razvoj i/ili uvođenje metoda i tehnika za poboljšanje selektivnosti ribolovnih alata 
        i/ili smanjenje neželjenog ulova i/ili odbačenog ulova i/ili negativnog utjecaja na okoliš (8 bodova)"
        :value="1">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="6.1.2 Razvoj i/ili uvođenje nove ili značajno poboljšane opreme (6 bodova)"
        :value="2">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="6.1.3 Razvoj i/ili uvođenje novih ili značajno poboljšanih proizvoda (4 boda)"
        :value="3">
        </v-checkbox>

        <v-text-field
              class="kriterij-box"
              label="UKUPNO kriterij 6.1."
              placeholder="0"
              readonly="true"
        ></v-text-field>

      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===15">
        <h1 class="subtitle upper" style="text-align:center;">6. kriterij za odabir operacija</h1>
        <br>

        <h2 class="subtitle">6.3. Korisnik</h2>
        <br>
        <h4 style="text-align:center">Bodovi se na temelju ovoga kriterija dodjeljuju prema tipu korisnika, tj. 
          ako Zahtjev za potporu za zajedničku operaciju podnosi zajednički korisnik, tj. organizacija/udruženje 
          ribara ili javno tijelo utemeljeno zakonom koje predstavlja ribare ili ako je korisnik vlasnik i/ili ovlaštenik 
          povlastice za gospodarski ribolov na moru, a koja je izdana za ribarsko plovilo koje obavlja ribolov u segmentu malog
          priobalnog ribolova. Mali priobalni ribolov podrazumijeva ribolov koji obavljaju ribarska plovila čija ukupna duljina
          ne prelazi 12 metara i koja ne koriste vučnu ribolovnu opremu iz popisa u tablici 3. Priloga I. Uredbe Komisije (EZ) br.
          26/2004 od 30. prosinca 2003. o registru ribarske flote Unije te njene izmjene, tj. Provedbene uredbe Komisije (EU) br. 741/2014.
        </h4>
        <br>
        <br>
        <br>
        <br>
        <br>

        <v-checkbox 
        v-model="bodovi"
        label="6.3.1 Zajednički korisnik (4 boda)"
        :value="1">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="6.3.2 Mali priobalni ribolov (2 boda)"
        :value="2">
        </v-checkbox>

        <v-text-field
              class="kriterij-box"
              label="UKUPNO kriterij 6.3."
              placeholder="0"
              readonly="true"
        ></v-text-field>
        <v-text-field
              class="kriterij-box bold"
              label="SVEUKUPNO"
              placeholder="0"
              readonly="true"
        ></v-text-field>
      </v-form>

       <v-form ref="form" v-model="valid" lazy-validation v-if="page===14">
        <h2 class="subtitle">6.2. Povećanje vrijednosti proizvodnje uz održavanje ili smanjenje količine</h2>
        <br>
        <h4>Bodovi se na temelju ovoga kriterija dodjeljuju za operacije koje će rezultirati povećanje vrijednosti proizvodnje, ali isključivo uz održavanje ili smanjenje količine proizvodnje. Za povećanje vrijednosti uz povećanje količine proizvodnje se ne dodjeljuju bodovi na temelju ovoga kriterija.
           Vrijednošću proizvodnje se smatra vrijednost prodane količine na godišnjoj razini (u kunama), a količinom proizvodnje se smatra prodana količina na godišnjoj razini (u tonama ili kilogramima).
           Povećanje vrijednosti se računa na način da se uspoređuje planirana vrijednost proizvodnje, uz održavanje ili smanjenje količine proizvodnje, iz reprezentativne godine s prosječnom ostvarenom vrijednosti proizvodnje kroz razdoblje od zadnje tri godine koje prethode podnošenju Zahtjeva za potporu. Kod izračuna prosječne ostvarene količine i vrijednosti proizvodnje u razdoblju od zadnje tri godine koje prethode podnošenju Zahtjeva za potporu, uzimaju se u obzir one godine u kojima je proizvodnja ostvarena.
           Reprezentativnu godinu određuje korisnik, a podrazumijeva godinu u kojoj se očekuje da će doći do povećanja vrijednosti proizvodnje, uz održavanje ili smanjenje količine kao rezultat inovacije koja je predmet potpore.
        </h4>
        <br>
        <p>
          <span style="font-weight:600">NAPOMENA:</span> Uneseni podaci moraju biti realni, a njihovo ostvarenje biti će pod posebnim nadzorom za vrijeme trajanja praćenja operacije od strane nadležnih institucija, tj. Upravljačko tijelo će provjeriti postizanje povećanja u reprezentativnoj godini koju je odredio korisnik i to uvidom u prodajne listove odnosno uvidom u ostvarenu vrijednost i količinu proizvodnje u reprezentativnoj godini u odnosu na prosječnu ostvarenu količinu i vrijednost proizvodnje u razdoblju od zadnje tri godine koje prethode podnošenju Zahtjeva za potporu.
        </p>
        <v-text-field class="custom-box-godina"
              label="Reprezentativna godina:"
              hint="Unesite godinu"
        ></v-text-field>
        <br>
        <hr>
        <br>

         <v-checkbox 
        v-model="bodovi"
        label="6.2.1. Povećanje vrijednosti proizvodnje, uz održavanje ili smanjenje količine proizvodnje, za>10% u
         odnosu na prosječno ostvarenu proizvodnju kroz razdoblje od zadnjetri godine koje prethode podnošenju Zahtjeva za potporu (3 boda)"
        :value="1">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="6.2.2. Povećanje vrijednosti proizvodnje uz održavanje ili smanjenje količine proizvodnje za ≥5% ≤ 10% u odnosu na prosječno
         ostvarenu proizvodnju kroz razdoblje od zadnjetri godine koje prethode podnošenju Zahtjeva za potporu (2 boda)"
        :value="2">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="6.2.3. Povećanje vrijednosti proizvodnje za < 5% u odnosu na prosječno ostvarenu proizvodnju kroz razdoblje od zadnje tri 
        godine koje prethode podnošenju Zahtjeva za potporu (1 bod)"
        :value="3">
        </v-checkbox>

        <v-text-field
              class="kriterij-box"
              label="UKUPNO kriterij 6.2."
              placeholder="0"
              readonly="true"
        ></v-text-field>

       </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===16">
        <h1 style="text-align:center;">7. LISTA PRIHVATLJIVIH TROŠKOVA U OKVIRU OPERACIJE</h1>
        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista prihvatljivih troškova</v-toolbar-title>
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
                        <v-text-field class="inputPrice" type="number" v-model="editedItem.iznos" label="Iznos bez PDV-a"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field class="inputPrice" type="number" v-model="editedItem.pdv" label="PDV"></v-text-field>
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
          <v-data-table :headers="headers" :items="troskovi" class="elevation-1" rows-per-page-text="redaka po stranici">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" >{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.nazivTroska }}</td>
              <td class="text-xs-left" >{{ props.item.dobavljac }}</td>
              <td class="text-xs-left" >{{ props.item.brojDokumenta }}</td>
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

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===17">
        <h1 class="subtitle upper" style="text-align:center;">8. Rekapitulacija troškova i izračun javne potpore</h1>

         <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="A. Ukupni iznos prihvatljivih troškova"
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="B. Osnovni udio javne potpore"
          class="text_field"
          readonly="true"
          placeholder="50%"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="C. Povećanje/smanjenje udjela javne potpore"
          class="text_field"
          readonly="true"
          placeholder="0 postotnih bodova"
        ></v-text-field>
        <br>
        <hr>
        <br>

        <v-checkbox 
        v-model="bodovi"
        label="Operacija je vezana uz mali priobalni ribolov. ( + 30 postotnih bodova)" 
        :value="1">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="Operacija se provodi otocima Dugi otok, Vis, Mljet i Lastovo. ( + 35 postotnih bodova)" 
        :value="2">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="Operaciju provodi ribarska zadruga. ( + 10 postotnih bodova)" 
        :value="3">
        </v-checkbox>
        <v-checkbox 
        v-model="bodovi"
        label="Operaciju provodi organizacija proizvođača, udruženje organizacija proizvođača ili međusektorska organizacija. ( + 25 postotnih bodova)" 
        :value="4">
        </v-checkbox>
         <v-checkbox 
        v-model="bodovi"
        label="Operaciju provodi poduzeće koje nije obuhvaćeno definicijom malih i srednjih poduzeća. ( - 20 postotnih bodova)" 
        :value="5">
        </v-checkbox>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===18">
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="D. Udio javne potpore."
          class="text_field"
          readonly="true"
          placeholder="0 %"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="E. Iznos javne potpore."
          class="text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <p>
          *   Ako je PDV prihvatljiv trošak, upisuje se ukupni iznos troškova (iznos „UKUPNO“ stupca G iz tablice 7.)
          ** Primjena dodatnih povećanja sukladno Provedbenoj Uredbi Komisije (EU) br. 772/2014:
          -  ako je na istu operaciju primjenjivo više povećanja postotnih bodova, primjenjuje se samo najveće povećanje
          -  ako je na istu operaciju primjenjivo više smanjenja postotnih bodova, primjenjuje se samo najveće smanjenje
          -  ako je na operaciju primjenjivo jedno dodatno povećanje postotnih bodova ili više njih i istodobno jedno dodatno 
            smanjenje postotnih bodova ili više njih, primjenjuje se samo najveće smanjenje
          *** Mali priobalni ribolov podrazumijeva ribolov kojeg obavljaju ribarska plovila čija ukupna duljina ne prelazi 12 metara i koja u povlastici izdanoj za ta plovila nemaju upisane povlačne ribolovne alate iz popisa u tablici 3. Priloga I. Uredbi Komisije (EZ) br. 26/2004 od 30. prosinca 2003. o registru ribarske flote Zajednice (SL L5, 09.01.2004.) te njene izmjene, tj. Provedbene uredbe Komisije (EU) br. 
          741/2014 оd 8. srpnja 2014. o izmjeni Uredbe (EZ) br. 26/2004 o registru ribarske flote Zajednice (SL L200, 09.07.2014.)
       </p>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===19">
        <h1 class="subtitle upper" style="text-align:center;">9. Okvirni rezultati koje očekuje korisnik</h1>

        <p>
          <span class="bold">NAPOMENA:</span> Podaci koje korisnik dostavlja u okviru ove tablice se ne koriste u svrhu utvrđivanja 
          udovoljavanja uvjetima i kriterijima za dodjelu potpore niti u svrhu dodjele bodova na temelju kriterija
          za odabir već se koriste isključivo za potrebe praćenja rezultata i provedbe operacije. Međutim, savjetuje
          se korisniku da kod procjene okvirnih rezultata planira u najvećoj mogućoj mjeri realno i objektivno s obzirom 
          da će Upravljačko tijelo rezultate operacija, prema pokazateljima iz ovih tablica, mjeriti nakon što isti budu 
          stvarno nastali. U tu svrhu, korisnik je dužan Upravljačkom tijelu dostaviti podatke i odgovarajuću dokumentaciju 
          vezano uz pokazatelje rezultata nakon što iste bude moguće mjeriti uzimajući u obzir referentnu godinu.
        </p>
        <p>
          Podaci koji se upisuju u ovu tablicu obuhvaćaju podatke o planiranim rezultatima provedene operacije, tj. podatke
          o očekivanim promjenama u vrijednosti proizvodnje, količini proizvodnje te neto dobiti.
        </p>
        <p>
          <span class="underline-bold">Prethodna godina</span> - podrazumijeva kalendarsku godinu koja prethodi godini podnošenja zahtjeva za potporu.
        </p>
        <p>
          <span class="underline-bold">Reprezentativna godina</span> - godina koju  odabire korisnik, a podrazumijeva godinu u kojoj dolazi do potpunog iskorištavanja 
          poslovnog kapaciteta operacije, tj. godina u kojoj će prema procjeni korisnika biti vidljiv utjecaj operacije na količinu 
          i/ili vrijednost proizvodnje i/ili neto dobit, tj. da će rezultati prema pokazateljima biti mjerljivi. Reprezentativna godina
           mora biti unutar razdoblja od pet godina nakon konačne isplate financijskih sredstava potpore korisniku.
        </p>
        <p>
          <span class="underline-bold">Planirana promjena</span> – razlika između reprezentativne i prethodne godine, 
          koja može biti pozitivna ili negativna, a u pojedinim slučajevima ista ne mora ni nastati, tj. operacija ne mora nužno 
          rezultirati promjenom u količini/vrijednosti/neto dobiti. Ako je planirana količina/vrijednost u reprezentativnoj godini veća od količine/vrijednosti/neto dobiti u prethodnoj godini, promjena 
          je pozitivna i podrazumijeva povećanje količine/vrijednosti/neto dobiti. U ovom slučaju je vrijednost promjene potrebno označiti 
          znakom plus „+“. Ako je manja u reprezentativnoj godini, tada je promjena negativna, tj. podrazumijeva smanjenje količine/vrijednosti/neto
          dobiti, te se vrijednost promjene označava znakom minus „-“. Ako se ne očekuje promjena u količini/vrijednosti/neto dobiti kao rezultat
          operacije, tj. ukoliko su količina/vrijednost/neto dobit u prethodnoj godini i reprezentativnoj godini jednake, vrijednost promjene je nula „0“.
        </p>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===20">
        <h2 style="text-align:center;">9.1. Količina proizvodnje (u kilogramima ili tonama)</h2>
        <h3 class="spacing" style="text-align:center;">Odnosi se na godišnju količinu proizvodnje koja podrazumijeva godišnju količinu iskrcaja u slučaju inovacija 
            u gospodarskom ribolovu odnosno godišnju prodanu količinu prerađenih proizvoda u slučaju inovacija u preradi vlastitih proizvoda
        </h3>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="reprezentativnaGodinaA"
                label="A. Reprezentativna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="kolicinaA"
                label="A. Količina:"
                class="text_field">
              </v-text-field>
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
                v-model="reprezentativnaGodinaB"
                label="B. Reprezentativna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="kolicinaB"
                label="B. Količina:"
                class="text_field">
              </v-text-field>
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
                  class="text_field">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm4 md4>
                <v-select
                  v-model="mjernaJedinica"
                  :items="mjere"
                  label="Mjerna jedinica"
                  class="text_field">
                </v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===21">
        <h2 style="text-align:center;">9.2. Vrijednost proizvodnje (u kunama)</h2>
        <h3 class="spacing" style="text-align:center;">Odnosi se na godišnju vrijednost proizvodnje koja podrazumijeva ukupni
          godišnji prihod od prodaje proizvoda ribarstva na razini plovila/povlastice u slučaju gospodarskog ribolova odnosno ukupni
          godišnji prihod od prodaje prerađenih proizvoda u slučaju inovacija u preradi vlastitih proizvoda
        </h3>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="reprezentativnaGodinaA"
                label="A. Reprezentativna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="prethodnaGodinaB"
                label="B. Prethodna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="vrijednostA"
                label="A. Vrijednost:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="vrijednostB"
                label="B. Vrijednost"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="planiranaPromjenaAB"
                label="PLANIRANA PROMJENA (A-B)"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===22">
        <h2 style="text-align:center;">9.3. Neto dobit (u kunama)</h2>
        <h3 class="spacing" style="text-align:center;">Odnosi se neto dobit (EBIT) koja podrazumijeva godišnju 
          dobit od prihoda vezanih uz proizvode ribarstva prije umanjenja za kamate i porez na razini korisnika.
        </h3>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="reprezentativnaGodinaA"
                label="A. Reprezentativna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="prethodnaGodinaB"
                label="B. Prethodna godina:"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="vrijednostA"
                label="A. Vrijednost:"
                class="text_field">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="vrijednostB"
                label="B. Vrijednost"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="planiranaPromjenaAB"
                label="PLANIRANA PROMJENA (A-B)"
                class="text_field">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===23">
        <h1 style="text-align:center;">10. PODACI O PROVEDBI OPERACIJE</h1>
        <br>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="brojOsobaOperacije"
                label="Broj osoba koje će imati izravne koristi od operacije">
              </v-text-field>
            </v-flex>
          </v-layout>
          <br>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation v-if="page===24">
        <h1 class="upper spacing" style="text-align:center;">11. izjava korisnika</h1>
        <p style="text-align:center" class="bold">Ja dolje potpisani, pod materijalnom i kaznenom odgovornošću, izjavljujem:</p>
        <hr>
        <ul class="spacing">
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat/a i suglasan/a sa sadržajem Pravilnika i Natječaja te s ostalim zakonskim/podzakonskim aktima i pratećim regulativama</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da su svi podaci u Zahtjevu i pratećoj dokumentaciji istiniti i točni, te da sam upoznat s posljedicama davanjem netočnih i krivih podataka</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da dopu&scaron;tam kori&scaron;tenje osobnih podataka (ime i prezime, OIB, e-mail adresa, kućna adresa i broj telefona, odnosno podaci koji inače nisu javno dostupni) i podataka iz službenih evidencija (naziv firme, obrta,zadruge, OIB, adresa,broj telefona i sl.) u skladu s propisima koji uređuju za&scaron;titu osobnih i drugih podataka</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da aktivnosti koje su predmet potpore nisu financirane nikakvim drugim javnim izdacima</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat sa činjenicom da se sredstva koja su nezakonito ostvarena moraju vratiti (zajedno sa zakonski propisanim zateznim kamatama)</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam u sukobu interesa s izvođačima radova i/ili ponuditeljima/dobavljačima roba i/ili usluga koji su predmet ulaganja</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam počinio te&scaron;ki prekr&scaron;aj na temelju članka 42. stavka 1. Uredbe Vijeća (EZ) br. 1005/2008 ili članka 90. stavka 1. Uredbe (EZ) br. 1224/2009 odnosno da mi, u odnosu na plovilo koje je predmet potpore, nije dodijeljeno devet ili vi&scaron;e kaznenih bodova za te&scaron;ke prekr&scaron;aje navedene u točkama 1., 2. i 5. Priloga XXX. Uredbe (EU) br. 404/2011.</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da plovilo/a kojemu/ima sam vlasnik i/ili ovla&scaron;tenik povlastice nije/nisu na Unijinom popisu nezakonitih, neprijavljenih i nereguliranih plovila kako je određeno u članku 40. stavku 3. Uredbe (EZ) br. 1005/2008.</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da plovilo/a kojemu/ima sam vlasnik i/ili ovla&scaron;tenik povlastice ne plovi/e pod zastavom zemlje s popisa nekooperativnih trećih zemalja iz članka 33. Uredbe (EZ) br. 1005/2008.</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam počinio prijevaru u okviru Europskog fonda za ribarstvo ili Europskog fonda za pomorstvo i ribarstvo, a sukladno članku 1. Konvencije o za&scaron;titi financijskih interesa Zajednice.</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću djelovati u skladu s uvjetima iz članka 7. stavka 2. Pravilnika tijekom cijelog razdoblja provedbe operacije te tijekom pet godina nakon primljene konačne uplate sredstava</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću čuvati svu dokumentaciju koja se odnosi na dodjelu sredstava iz EFPR- a najmanje dvije (2) godine od 31. prosinca nakon predaje računa kojima su uključeni izvr&scaron;ni izdaci operacije</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam suglasan/a da budem uvr&scaron;ten u popis korisnika koji se objavljuje u skladu s člankom 119. stavkom 2. Uredbe (EU) br. 508/2014 Europskog parlamenta i Vijeća o Europskom fondu za pomorstvo i ribarstvo</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću omogućiti kontrolu na terenu i pristup dokumentaciji vezanoj za aktivnosti za koje je ostvarena potpora temeljem Pravilnika i Natječaja Upravljačkom tijelu, Tijelu za ovjeravanje, Tijelu za reviziju i tijela uključenih u revizije Operativnog programa iz članka 127. stavka 2. Uredbe (EU) 1303/2013 kao i ovla&scaron;tenim predstavnicima Europske komisije, Europskog revizorskog suda, Europskog ureda za borbu protiv prijevara (OLAF) i drugih nadležnih nadzornih/revizorskih tijela</span></li>
          <li style="text-align: justify;"><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću voditi ili odvojeni računovodstveni sustav ili primjereni računovodstveni kod/oznaku za sve transakcije vezane uz operaciju za koju mi je dodijeljena potpora</span></li>
        </ul>
      </v-form>

      <div class="text-md-center text-lg-center text-xs-center">
        <v-pagination v-model="page" :length="24" :total-visible="5" class="pagi"></v-pagination>
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
      "Dubrovačko-neretvanska"
    ],
    tipKorisnika: -1,
    pravniOblikKorisnika: -1,
    checkbox: false,
    page: 1,
    dialog: false,
    headers: [
        { text: 'Rbr. (A)', value: 'rbr' },
        {
          text: 'Naziv i opis troška (B)',
          align: 'left',
          sortable: false,
          value: 'nazivTroska'
        },
        { text: 'Naziv izvođača radova /dobavljača/ pružatelja usluge (C)', value: 'dobavljac' },
        { text: 'Broj ponude /predračuna /računa (D)', value: 'brojDokumenta' },
        { text: 'Iznos bez PDV-a (E)', value: 'iznos' },
        { text: 'Iznos PDV-a (F)', value: 'pdv' },
        { text: 'Ukupan iznos (F)', value: 'ukupno' }
      ],
    troskovi: [],
    editedIndex: -1,
    editedItem: {
      rbr: 0,
      nazivTroska: '',
      dobavljac: '',
      brojDokumenta: '',
      iznos: 0,
      pdv:0 ,
      ukupno: 0
    },
    defaultItem: {
      rbr: 0,
      nazivTroska: '',
      dobavljac: '',
      brojDokumenta: '',
      iznos: 0,
      pdv:0 ,
      ukupno: 0},
    headersPlovilo: [
        { text: 'Rbr. (A)', value: 'rbr' },
        { text: 'Ime i prezime', value: 'imePrezime' },
        { text: 'OIB', value: 'oib' }
      ],
    plovilo: [],
    editedIndexPlovilo: -1,
    editedItemPlovilo: {
      rbr: 0,
      imePrezime: '',
      oib: ''
    },
    defaultItemPlovilo: {
      rbr: 0,
      imePrezime: '',
      oib: ''
    },
  }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novi trošak' : 'Ažuriraj trošak';
      },
      formTitlePlovilo () {
        return this.editedIndexPlovilo === -1 ? 'Novi suvlasnik' : 'Ažuriraj suvlasnika';
      },
      ukupnoSUM (){
        let sum = 0;
        this.troskovi.forEach(function(item) {
          sum += (parseFloat(item.ukupno));
        });

        return this.formatMoney(sum);
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.troskovi = [

        ]
      },
      formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")+" kn";
      },
      editItem (item) {
        this.editedIndex = this.troskovi.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.troskovi.indexOf(item)
        confirm('Jeste li sigurni da želite obrisati stavku?') && this.troskovi.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.editedItem.ukupno=(Number(this.editedItem.iznos)+Number(this.editedItem.pdv)).toFixed(2);
        if (this.editedIndex > -1) {
          Object.assign(this.troskovi[this.editedIndex], this.editedItem)
        } else {
          this.troskovi.push(this.editedItem)
        }
        this.close()
      },

      editItemPlovilo (item) {
        this.editedIndexPlovilo = this.plovilo.indexOf(item)
        this.editedItemPlovilo = Object.assign({}, item)
        this.dialog = true
      },

      deleteItemPlovilo (item) {
        const index = this.plovilo.indexOf(item)
        confirm('Jeste li sigurni da želite obrisati stavku?') && this.plovilo.splice(index, 1)
      },

      closePlovilo () {
        this.dialog = false
        setTimeout(() => {
          this.editedItemPlovilo = Object.assign({}, this.defaultItemPlovilo)
          this.editedIndexPlovilo = -1
        }, 300)
      },

      savePlovilo () {
        
        if (this.editedIndexPlovilo > -1) {
          Object.assign(this.plovilo[this.editedIndexPlovilo], this.editedItemPlovilo)
        } else {
          this.plovilo.push(this.editedItemPlovilo)
        }
        this.close()
      },

    submit() {
      if (this.$refs.form.validate()) {
        // Form is valid, process
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};

</script>

<style>

.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}


:root {
  --primary-color: #0868ac !important;
  --secondary-color: #fff !important;
  --third-color: rgba(0,0,0,0.87)!important;
  --message-color: #FF4136 !important;
  --input-text-color: #3e4444 !important;
}

/* Theming */
h1,
.v-input--radio-group__input .v-label:first-child {
  color: var(--primary-color);
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

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
   color: var(--input-text-color) !important;
}

 i.v-icon.mr-2.v-icon--link.material-icons.theme--light {
   color: var(--primary-color) !important;
 }

 i.v-icon.v-icon--link.material-icons.theme--light {
   color: #3D9970;
   opacity: 0.7;
 }

  i.v-icon.v-icon--link.material-icons.theme--light:hover {
    opacity: 1;
  }

/*----- custom ------------- */

.bold {
  font-weight: 600;
}

.underline-bold {
  text-decoration: underline;
  font-weight: bold;
}

hr {
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}

.v-input--selection-controls {
  margin-top: 0;
}

.checkbox-text {
  padding-bottom: 8px;
  font-size: 1.1em;
}

h1 {
  margin: 0;
}

h2 {
  margin-top: 15px;
}

.spacing {
  padding: 20px 0;
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
  color: var(--input-text-color) !important;
  text-align: center;
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
  width: 99px !important;
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
   display:block;
   margin: 0 auto;
 }

/* responsive */

@media only screen and (max-width: 320px) {
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
    bottom: 0
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

@media only screen and (max-width: 1023px) {
 table.v-table thead th:nth-child(5),
 table.v-table thead th:nth-child(6),
 table.v-table thead th:nth-child(7) {
  min-width: 115px !important;
}
}


</style>
