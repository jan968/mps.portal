<template>
  <v-container>
    <v-card class="v_card">
      <!-- page 1 -->
        <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
            <h1 style="text-align:center;"> ZAHTJEV ZA POTPORU</h1>
            <h2 style="text-align:center;"
        >Natječajza dodjelu potpore u okviru mjere I.8.„Zaštita zdravlja i sigurnost“ („Narodne novine“, broj 92/2016)</h2>

        <br>
        <v-radio-group v-model="tipKorisnika" label="Tip korisnika">
          <v-radio :key="vlasnikRibarskogPlovila" :label="'Vlasnik ribarskog plovila'" :value="0"></v-radio>
          <v-radio
            :key="zajednickiKorisnik"
            :label="'Ovlaštenik povlastice'"
            :value="1"
          ></v-radio>
        </v-radio-group>

        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="Naziv korisnika"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibNositeljaObrta"
          :counter="11"
          label="OIB (samo v slučaju fizičke osobe)"
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
          v-model="pravniOblikKorisnika"
          label="Oblik korisnika"
        >
          <v-radio :key="fizickaOsoba" :label="'Fizička osoba'" :value="0"></v-radio>
          <v-radio :key="pravnaOsoba" :label="'Pravna osoba'" :value="1"></v-radio>
          <v-radio :key="obrt" :label="'Obrt'" :value="2"></v-radio>

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
        <h1 style="text-align:center;">3. PODACI O PLOVILU</h1>
        <h3 class="subtext">Gospodarski ribolov na moru</h3>
        <h2 class="textOperacije">3.1. Osnovni podaci</h2>
        <br>
        <br>

        <v-text-field
          v-model="cfrBrojPlovila"
          :counter="255"
          label="CFR broj plovila"
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
          v-model="oibVlasnikaPlovila"
          :counter="11"
          label="OIB vlasnika plovila"
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
          v-model="ovlastenikPovlastice"
          :counter="255"
          label="Ovlaštenik povlastice"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibOvlastenikaPovlastice"
          :counter="11"
          label="OIB ovlaštenika povlastice"
          required
          class="text_field"
        ></v-text-field>

        <br>
        <hr>
        <br>
        <h2 class="textOperacije">3.2 Podaci o suvlasnicima plovila</h2>
        <br>

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
          <v-data-table
            :headers="headersPlovilo"
            :items="plovilo"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.rbr }}</td>
              <td class="text-xs-left">{{ props.item.imePrezime }}</td>
              <td class="text-xs-left">{{ props.item.oib }}</td>
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

      <!-- page 6 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===6">
        
        <h3 class="subtext">Gospodarski ribolov slatkim vodama</h3>
        <h2 class="textOperacije">3.1. Osnovni podaci</h2>
        <br>
        <br>

        <v-text-field
          v-model="NazivRegisterskaOznakaPlovilaSlatkim"
          :counter="255"
          label="Naziv ili registarska oznaka plovila:"
          required  
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="vlasnikPlovilaSlatkim"
          :counter="255"
          label="Vlasnik plovila"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibVlasnikaPlovilaSlatkim"
          :counter="11"
          label="OIB vlasnika plovila"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="serijskiBrojPovlasticeSlatkim"
          :counter="255"
          label="Serijski broj povlastice"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="ovlastenikPovlasticeSlatkim"
          :counter="255"
          label="Ovlaštenik povlastice"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibOvlastenikaPovlasticeSlatkim"
          :counter="11"
          label="OIB ovlaštenika povlastice"
          required
          class="text_field"
        ></v-text-field>

        <br>
        <hr>
        <br>
        <h2 class="textOperacije">3.2 Podaci o suvlasnicima plovila</h2>
        <br>

        <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>Suvlasnici plovila</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novi suvlasnik</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitlePlovilo}}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.rbrSlatkim" label="Rbr."></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.imePrezimeSlatkim" label="Ime i prezime"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItemPlovilo.oibSlatkim" label="OIB"></v-text-field>
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
          <v-data-table
            :headers="headersPloviloSlatkim"
            :items="ploviloSlatkim"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.rbrSlatkim }}</td>
              <td class="text-xs-left">{{ props.item.imePrezimeSlatkim }}</td>
              <td class="text-xs-left">{{ props.item.oibSlatkim }}</td>
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

      <!-- page 7 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===7">
        <h1 style="text-align:center;">4. OPIS ULAGANJA ZA KOJE SE TRAŽI POTPORA</h1>
        <h3 class="subtext"> 
        (naznačiti područje ulaganja te troškove unutar područja ulaganja, moguć višestruki izbor)
        </h3>
      <br>

        <h2 class="textOperacije">4.1 Poboljšanje sigurnosnih uvjeta na ribarskom plovilu</h2>
        <br>
        <br>
        <br>
      
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.1. čamci za spašavanje i/ili hidrostatski uređaji za otpuštanje čamaca za spašavanje" :value="0">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.2. osobni lokacijski uređaji koji mogu biti ugrađeni u prsluk za spašavanje i radnu odjeću ribara" :value="1">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.3. osobna oprema za plutanje, a posebno hidro-termo odijela ili odijela zapreživljavanje,
        koluti i prsluci za spašavanje" :value="2">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.4. signalne baklje i rakete" :value="3">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.5. sprave za dobacivanje konopa" :value="4">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.6. sustavi za spašavanje čovjeka u moru (MOB)" :value="5">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.7. oprema za gašenje požara kao što su aparati za gašenje požara,
       vatrogasni pokrivači, detektori požara i dima, aparati za disanje" :value="6">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.8. protupožarna vrata" :value="7">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.9. zaporni ventili na spremniku za gorivo" :value="8">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.10. detektori plinova i alarmni sustavi za plin" :value="9">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.11. kaljužne pumpe i alarmi" :value="10">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.12. oprema za radiovezu ili satelitsku komunikaciju" :value="11">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.13. vodonepropusni poklopci grotala i vrata" :value="12">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.14. osigurači na strojevima kao što su vitla ili mrežna vitla" :value="14">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.15. prolazi i pristupne ljestve" :value="15">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.16. rasvjeta za potragu, rasvjeta na palubi ili rasvjeta za nuždu" :value="16">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.17. sigurnosni uređaji za otpuštanje u slučaju zapinjanja ribolovnog alataza podvodne  prepreke" :value="17">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.18. sigurnosne kamere i monitori" :value="18">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeUvjetaPlovila" 
       label="4.1.19. oprema i dijelovi potrebni za poboljšanje sigurnosti na palubi" :value="19">
       </v-checkbox>
         

        
      </v-form>

       <!-- page 8 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===8">
         <h2 class="textOperacije">4.2. Poboljšanje zdravstvenih uvjeta na ribarskom plovilu</h2>
        <br>
        <br>
        <br>
      
       <v-checkbox class="bold" v-model="opcijeZdravstvenihUvjeta" 
       label="4.2.1. pribor za prvu pomoć" :value="0">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeZdravstvenihUvjeta" 
       label="4.2.2. lijekovi i uređaji za hitno liječenje na plovilu" :value="1">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeZdravstvenihUvjeta" 
       label="4.2.3. usluge telemedicine uključujući elektronske tehnologije,
       opremu imedicinsko snimanje koje se na plovilu upotrebljavaju za savjetovanje nadaljinu" :value="2">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeZdravstvenihUvjeta" 
       label="4.2.4. vodiči i priručnici za poboljšanje zdravlja na plovilu" :value="3">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeZdravstvenihUvjeta" 
       label="4.2.5. informativne kampanje za poboljšanje zdravlja na plovilu" :value="4">
       </v-checkbox>
       
      </v-form>

       <!-- page 9 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===9">
         <h2 class="textOperacije">4.3. Poboljšanje higijenskih uvjeta na ribarskom plovilu</h2>
        <br>
        <br>
        <br>
      
       <v-checkbox class="bold" v-model="opcijeHigijenskihUvjeta" 
       label="4.3.1. sanitarne prostorije" :value="0">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeHigijenskihUvjeta" 
       label="4.3.2. kuhinjske prostorije i oprema za prostorije za skladištenje hrane" :value="1">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeHigijenskihUvjeta" 
       label="4.3.3. uređaji za pročišćavanje vode u pitku vodu" :value="2">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeHigijenskihUvjeta" 
       label="4.3.4. oprema za čišćenje radi održavanja sanitarnih uvjeta na plovilu" :value="3">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeHigijenskihUvjeta" 
       label="4.3.5. vodiči i priručnici za poboljšanje higijene na plovilu, uključujućiprogramske alate" :value="4">
       </v-checkbox>
       
      </v-form>

        <!-- page 10 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===10">
         <h2 class="textOperacije">4.4. Poboljšanje radnih uvjeta na ribarskom plovilu</h2>
        <br>
        <br>
        <br>
      
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.1. ograde na palubi" :value="0">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.2. zakloni na palubi i osuvremenjivanje kabina radi pružanja zaštite odnepovoljnih vremenskih uvjeta" :value="1">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.3. predmeti povezani s unaprjeđenjem sigurnosti u kabinama
       te saosiguravanjem zajedničkih prostora za posadu" :value="2">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.4. oprema za smanjenje ručnog dizanja teških predmeta" :value="3">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.5. boje i gumene podloge za sprječavanje klizanja" :value="4">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.6. oprema za zvučnu i toplinsku izolaciju i oprema za poboljšanje ventilacije" :value="5">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.7. radna odjeća i sigurnosna odjeća" :value="6">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.8. znakovi za hitne slučajeve i sigurnosni znakova" :value="7">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.9. usluge analize rizika i procjene u cilju utvrđivanja rizika 
       za ribare ulukama ili na plovilu kako bi se poduzele mjere za sprječavanje ili smanjenjerizika" :value="8">
       </v-checkbox>
       <v-checkbox class="bold" v-model="opcijeRadnihUvjeta" 
       label="4.4.10. vodiči i priručnici o poboljšanju radnih uvjeta na plovilu" :value="9">
       </v-checkbox>
       
      </v-form>

      <!-- page 11 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===11">

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

      <!-- page 12 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===12">
        <h1 style="text-align:center;"
        >6. REKAPITULACIJA TROŠKOVA I IZRAČUN JAVNE POTPORE</h1>

        <br>
        <br>

        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="A. Ukupni iznos prihvatljivih troškova"
          class="medium_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="B. Osnovni udio javne potpore"
          class="medium_text_field"
          readonly="true"
          placeholder="50%"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="C. Povećanje/smanjenje udjela javne potpore"
          class="medium_text_field"
          readonly="true"
          placeholder="0 postotnih bodova"
        ></v-text-field>
        <br>
        <hr>
        <br>

        <v-checkbox
          v-model="bodovi"
          label="Operacija je vezana uz mali priobalni ribolov. ( + 30 postotnih bodova)"
          :value="1"
        ></v-checkbox>
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
          label="Operaciju provodi organizacija proizvođača, udruženje organizacija proizvođača
          ili međusektorska organizacija. ( + 25 postotnih bodova)"
          :value="4"
        ></v-checkbox>
        <v-checkbox
          v-model="bodovi"
          label="Operaciju provodi poduzeće koje nije obuhvaćeno definicijom malih i srednjih poduzeća. ( -20 postotnih bodova)"
          :value="5"
        ></v-checkbox>
        <br>
      </v-form>

      <!-- page 13 -->
     <v-form ref="form" v-model="valid" lazy-validation v-if="page===13">
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="D. Udio javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0 %"
        ></v-text-field>
        <v-text-field
          v-model="ukupniIznosPrihvatljivihTroskova"
          label="E. Iznos javne potpore."
          class="short_text_field"
          readonly="true"
          placeholder="0"
        ></v-text-field>
        <br>
        <!-- <p>
          * Ukoliko je PDV prihvatljiv trošak
          ** Primjena dodatnih povećanja sukladno Provedbenoj Uredbi Komisije (EU) br. 772/2014:
          - ako je na istu operaciju primjenjivo više povećanja postotnih bodova, primjenjuje se samo najveće povećanje
          - ako je na istu operaciju primjenjivo više smanjenja postotnih bodova, primjenjuje se samo najveće smanjenje
          - ako je na operaciju primjenjivo jedno dodatno povećanje postotnih bodova ili više njih i istodobno
          jedno dodatno smanjenje postotnih bodova ili više njih, primjenjuje se samo najveće smanjenje
          *** Mali priobalni ribolov podrazumijeva ribolov koji obavljaju ribarska plovila čija ukupna duljina
          ne prelazi 12 metra i koja ne koristi povlačne ribolovne alate sukladno Tablici 3. Priloga I. Uredbe Komisije
          (EZ) br. 26/2004 od 30. prosinca 2003. godine o registru ribarske flote Zajednice (SL L5, 9.1.2004.)
        </p> -->
      </v-form>

       <!-- page 14-->
       <v-form ref="form" v-model="valid" lazy-validation v-if="page===14">
         <h1 class="upper spacing" style="text-align:center;">7. IZJAVA KORISNIKA</h1>
        <p
          style="text-align:center"
          class="bold"
        >Ja dolje potpisani, pod materijalnom i kaznenom odgovornošću, izjavljujem:</p>
        <hr>
        <ul class="izjava">
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat/a i suglasan/a sa sadržajem Pravilnika i Natječaja te s ostalim zakonskim/podzakonskim aktima i pratećim regulativama</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da su svi podaci u Zahtjevu i pratećoj dokumentaciji istiniti i točni, te da sam upoznat s posljedicama davanjem netočnih i krivih podataka</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da dopu&scaron;tam kori&scaron;tenje osobnih podataka (ime i prezime, OIB, e-mail adresa, kućna adresa i broj telefona, odnosno podaci koji inače nisu javno dostupni), podataka iz službenih evidencija (naziv firme, obrta,zadruge, OIB, adresa,broj telefona i sl.) u skladu s propisima koji uređuju za&scaron;titu osobnih i drugih podataka te podataka koji se prikupljaju kroz obrasce za prikupljanje ekonomskih podataka za ribolovnu flotu u okviru programa prikupljanja podataka, a koji se upotrebljavaju za provedbu ovoga Natječaja.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da operacija nije fizički zavr&scaron;ena ili provedena u cijelosti u trenutku podno&scaron;enja Zahtjeva za potporu</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da aktivnosti koje su predmet potpore nisu financirane nikakvim drugim javnim izdacima</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću djelovati u skladu s uvjetima iz članka 4. stavka 2. Pravilnika tijekom cijelog razdoblja provedbe operacije i tijekom pet godina nakon primljene konačne uplate sredstava</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat sa činjenicom da se sredstva koja su nezakonito ostvarena moraju vratiti (zajedno sa zakonski propisanim zateznim kamatama)</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam u sukobu interesa s izvođačima radova i/ili ponuditeljima/dobavljačima roba i/ili usluga koji su predmet ulaganja</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam suglasan/a da budem uvr&scaron;ten u popis korisnika koji se objavljuje u skladu s člankom 119. stavkom 2. Uredbe (EU) br. 508/2014 Europskog parlamenta i Vijeća o Europskom fondu za pomorstvo i ribarstvo</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću čuvati svu dokumentaciju koja se odnosi na dodjelu sredstava iz EFPR- a najmanje dvije (2) godine od 31. prosinca nakon predaje računa kojima su uključeni izvr&scaron;ni izdaci operacije</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću omogućiti kontrolu na terenu i pristup dokumentaciji vezanoj za aktivnosti za koje je ostvarena potpora temeljem Pravilnika i Natječaja Upravljačkom tijelu, Tijelu za ovjeravanje, Tijelu za reviziju i tijela uključenih u revizije Operativnog programa iz članka 127. stavka 2. Uredbe (EU) 1303/2013 kao i ovla&scaron;tenim predstavnicima Europske komisije, Europskog revizorskog suda, Europskog ureda za borbu protiv prijevara (OLAF) i drugih nadležnih nadzornih/revizorskih tijela</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću voditi ili odvojeni računovodstveni sustav ili primjereni računovodstveni kod za sve transakcije vezane uz operaciju za koju mi je dodijeljena potpora</span></li>
        </ul>
        <br>
     </v-form>
     
     <!-- Page 15 -->
     <v-form ref="form" v-model="valid" lazy-validation v-if="page===15">
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
        <v-pagination v-model="page" :length="15" :total-visible="5" class="pagi"></v-pagination>
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

    // plovilo more
    headersPloviloSlatkim: [
      { text: "Rbr. (A)", value: "rbr" },
      { text: "Ime i prezime", value: "imePrezime" },
      { text: "OIB", value: "oib" }
    ],
    ploviloSlatkim: [],
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
    },

    // plovilo slatkim
   headersPlovilo: [
      { text: "Rbr. (A)", value: "rbr" },
      { text: "Ime i prezime", value: "imePrezime" },
      { text: "OIB", value: "oib" }
    ],
    plovilo: [],
    editedIndexPloviloSlatkim: -1,
    editedItemPloviloSlatkim: {
      rbrSlatkim: 0,
      imePrezimeSlatkim: "",
      oibSlatkim: ""
    },
    defaultItemPloviloSlatkim: {
      rbrSlatkim: 0,
      imePrezimeSlatkim: "",
      oibSlatkim: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      }
    },

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

/* counties */
.v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: 0! important;
}

h1 {
  font-weight: bold;
  margin-bottom: 25px;
}

.bold {
  font-weight: 600;
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

.troskovi_field {
  width: 100%;
  max-width: 150px;
}

.textOperacije {
  font-size: 20px;
  margin-top: 20px;
  color:#001f3f;
  font-weight: bold;
  text-align: center;
}

.aktivnost-text {
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0 10px;
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
    font-size:18px;  
}

.subtext {
  color: var(--primary-color) !important;
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
  font-size: 18px;
}

.spacing {
  padding: 20px 0;
}

/* responsive */

@media only screen and (max-width: 320px) {

    .v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: -273px !important;
    }

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