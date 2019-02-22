<template>
  <v-container>
    <v-card class="v_card">
     

     
      <!--page 1 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===1">
        <h1 style="text-align:center;">ZAHTJEV ZA POTPORU</h1>
         <h2
          style="text-align:center;"
         >u okviru mjere III.1. „Pripremna potpora“</h2>

         <v-text-field
          v-model="nazivLokalneInicijative"
          :rules="nameRules"
          :counter="255"
          label="Naziv lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="oibLokalne"
          :counter="11"
          label="OIB lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeOvlasteneOsobe"
          :rules="nameRules"
          :counter="255"
          label="Ime, prezime i funkcija ovlaštene osobe za zastupanje lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
         <v-text-field
          v-model="oibOvlasteneOsobe"
          :counter="11"
          label="OIB ovlaštene osobe za zastupanje lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imeVoditeljaLokalneInicijative"
          :rules="nameRules"
          :counter="255"
          label="Ime i prezime voditelja lokalne inicijative (1.5)"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="imePrezimeKontaktOsobe"
          :rules="nameRules"
          :counter="255"
          label="Ime, prezime i funkcija kontakt osobe"
          required
          class="text_field"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Morate se složiti da bi nastavili!']"
          label="Slažete li se?"
          required
        ></v-checkbox>

      </v-form>

    <!-- page 2 -->
    <v-form ref="form" v-model="valid" lazy-validation v-if="page===2">
        <h1 class="subtitle upper">2. PODACI O SJEDIŠTU LOKALNE INICIJATIVE</h1>

         <v-select
          v-model="county"
          :items="counties"
          :rules="[v => !!v || 'Polje je obavezno']"
          label="Županija"
          required
          class="text_field"
        ></v-select>
        <v-text-field v-model="gradOpcina" :counter="50" label="Grad/opčina" required class="text_field"></v-text-field>
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
         <v-text-field
          v-model="kontaktTelFax"
          :counter="255"
          label="Telefon/faks"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="webStranica"
          label="Web stranica"
          required
          class="text_field"
        ></v-text-field>
        <v-btn @click="clear" class="clean-btn">očisti</v-btn>

      </v-form>

      <!-- page 3 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===3">
        <h1 style="text-align:center;">3. OSNOVNI PODACI U VEZI S RIBARSTVENIM PODRUČJEM</h1>
        <br>

        <div class="naselje_tabela">
          <v-toolbar flat color="white">
            <v-toolbar-title>Popis JLS čija su naselja uključena u ribarstveno područje</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Unesi</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editedItem.naselje" label="Naselje"></v-text-field>
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
              <td class="text-xs-left">{{ props.item.naselje }}</td>
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
        <br>
      </v-form>

      <!-- page 4 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===4">
       <h2 class="normal_text" style="text-align:center">BROJ STANOVNIKA</h2>
        <br>
        <v-text-field
          class="text_field"
          label="Ukupan broj stanovnika ribarstvenog područja*"
        ></v-text-field>
        <br>
        <hr>
        <br>

         <div class="stanovnik_tabela">
          <v-toolbar flat color="white">
            <v-toolbar-title>Broj stanovnika JLS u ribarstvenom području</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Unesi</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitleStanovniki }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemStanovniki.jls" label="JLS"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemStanovniki.brojStanovnika" label="Broj stanovnika"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closeStanovnik">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="saveStanovnik">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headersStanovniki"
            :items="stanovnik"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-">{{ props.item.jls }}</td>
              <td class="text-xs-left">{{ props.item.brojStanovnika }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemStanovniki(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemStanovniki(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
      </v-form>

      <!-- page 5 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===5">

         <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Popis naselja i broj stanovnika po naselju za svaku JLS u ribarstvenom području </v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Unesi</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitleNaselje }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemNaselje.jls" label="JLS"></v-text-field>
                      </v-flex>
                       <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemNaselje.unutarJls" label="Naselja unutar JLS"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editedItemNaselje.brojStanovnikaNaselje" label="Broj stanovnika (za svako naselje)"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 md4>
                        <v-select
                        v-model="editedItemNaselje.ribarskoPodruce"
                        :items="ribarskoPodruce"
                        label="Izaberi"
                        required
                      ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closeStanovnik">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="saveStanovnik">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headersNaselje"
            :items="naselje"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-">{{ props.item.jls }}</td>
              <td class="text-xs-left">{{ props.item.brojStanovnika }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemStanovniki(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemStanovniki(props.item)">delete</v-icon>
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

         <div>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Popis iskrcajnih mjesta</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Unesi</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitleNaselje }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemPopis.Rbr" label="R.br"></v-text-field>
                      </v-flex>
                       <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemPopis.jls" label="JLS"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md6>
                        <v-text-field v-model="editedItemPopis.ribarskoPloviloIznad" label="Za ribarska plovila duljine iznad 15 metara"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 md6>
                       <v-text-field v-model="editedItemPopis.ribarskoPloviloIspod" label="Za ribarska plovila duljine iznad 15 metara"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closeStanovnik">Odustani</v-btn>
                  <v-btn color="blue darken-1" flat @click="saveStanovnik">Spremi</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headersPopis"
            :items="popis"
            class="elevation-1"
            rows-per-page-text="redaka po stranici"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-">{{ props.item.jls }}</td>
              <td class="text-xs-left">{{ props.item.brojStanovnika }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItemStanovniki(props.item)">edit</v-icon>
                <v-icon small @click="deleteItemStanovniki(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <span class="text-center">Unesite podatke</span>
            </template>
          </v-data-table>
        </div>
        <br>
        <hr>
        <br>
        <p class="normal_text">Navesti izvor (navoditi podatke iz službene statistike 
        (Državni zavod za statistiku i druga ovlaštena tijela službene statistike))
        **temeljem Odluke i ispravka Odluke o popisu iskrcajnih mjesta za ribarska mjesta
         za ribarska plovila koja obavljaju gospodarski ribolov na moru „Narodne novine“ broj 66/2009 i 64/2009)</p>
        <br>
      </v-form>

      <!-- page 7-->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===7">
        <h1 class="subtitle upper">4. STRUKTURA LOKALNE INICIJATIVE U RIBARSTVU</h1>
        <v-text-field
          v-model="mjestoDatumRegistriranja"
          :counter="255"
          label="4.1. Mjesto i datum registriranja lokalne inicijative:"
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="brojLokalneInicijative"
          :counter="255"
          label="4.2. Broj osnivača lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="UkupanBrojClanova"
          :counter="255"
          label="4.3. Ukupan broj članova lokalne inicijative"
          required
          class="text_field"
          hint="(s uključenim članovima upravljačke strukture)"
        ></v-text-field>
        <v-text-field
          v-model="brojClanovaJavnogSektora"
          :counter="255"
          label="4.4. Broj članova lokalne inicijative iz javnog sektora"
          required
          class="text_field"
          hint="(s uključenim članovima upravljačke strukture)"
        ></v-text-field>
        <v-text-field
          v-model="brojClanovaCivilnogSektora"
          :counter="255"
          label="4.5. Broj članova lokalne inicijative iz civilnog sektora"
          required
          class="text_field"
          hint="(s uključenim članovima upravljačke strukture)"
        ></v-text-field>
        <v-text-field
          v-model="brojClanovaGospodarskogSektora"
          :counter="255"
          label="4.6. Broj članova lokalne inicijative iz gospodarskog sektora ribarstva"
          required
          class="text_field"
          hint="(s uključenim članovima upravljačke strukture)"
        ></v-text-field>
        <v-text-field
          v-model="brojClanovaGospodarskogSektoraOsimGospodarskog"
          :counter="255"
          label="4.7. Broj članova lokalne inicijative iz gospodarskog sektora"
          required
          class="text_field"
          hint="(osim gospodarskog sektora ribarstva)"
        ></v-text-field>
        <br>
        <hr>
        <br>
        <p class="normal_text">* pravne ili fizičke osobe koje su vlasnici ili ovlaštenici važeće 
          povlastice za obavljanje gospodarskog ribolova, ovlaštenici povlastice za uzgoj morske ribe
          i drugih morskih organizama i/ili povlastice za akvakulturu, subjekti u poslovanju s hranom 
          sukladno posebnom propisu koji su korisnici odobrenih ili registriranih objekata u poslovanju
          s hranom životinjskog podrijetla za žive školjkaše i /ili proizvode ribarstva te ribarske zadruge,
          udruge, klasteri i ostali oblici udruživanja iz područja ribarstva.</p>
        <br>
      </v-form>

       <!-- page 8-->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===8">
        <h1 class="subtitle upper">5. PREDSTAVNICI LOKALNE INICIJATIVE</h1>
        <v-text-field
          v-model="predsjednikLokalneInicijative"
          :counter="255"
          label="5.1. Ime i prezime predsjednika lokalne inicijative"
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="kontaktPodaci51"
          :counter="255"
          label="5.1. Kontakt podaci"
          required
          class="text_field"
        ></v-text-field>
        <br>
        <hr>     
        <v-text-field
          v-model="voditeljLokalne"
          :counter="255"
          label="5.2. Ime i prezime voditelja lokalne inicijative"
          required
          class="text_field"
        ></v-text-field>
        <v-text-field
          v-model="kontaktPodaci52"
          :counter="255"
          label="5.2. Kontakt podaci"
          required
          class="text_field"
        ></v-text-field>
        <br>
        <br>
      </v-form>

      <!-- page 9-->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===9">
        <h1 class="subtitle upper">6. PLANIRANI TROŠKOVI</h1>
        <br>
        <br>

        <span class="normal_text  no_margin">
         PLANIRANI TROŠKOVI PREMA LISTI PRIHVATLJIVIH TROŠKOVA U SKLOPU PRIPREMNE POTPORE<span style="display:block">(sukladno Akcijskom planu)</span>
        </span>
         <v-text-field
          v-model="planiraniTroskovi"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>
        <br>
        <hr>
        <br>
        <h3 class="normal_text">
          A. Akcije osposobljavanja za lokalne dionike
          (koji su zaposlenici, volonteri ili članovi lokalne inicijative)
        </h3>
        <br>
        <br>
       

        <span class="normal_text no_margin">UKUPNO  planirani troškovi za aktivnost A</span>
        <v-text-field
          v-model="ukupnoTroskoviA"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>

        <hr>
        <br>

        <h3 class="normal_text">
          B. Studije ribarstvenih područja
        </h3>
        <br>
        <br>

        <span class="normal_text no_margin">UKUPNO  planirani troškovi za aktivnost B</span>
        <v-text-field
          v-model="ukupnoTroskoviB"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>

        <hr>
        <br>

        <h3 class="normal_text">
          C. Troškovi povezani s izradom LRSR, uključujući konzultantske troškove i troškove povezane s konzultacijama dionika u svrhu pripreme LRSR
        </h3>
        <br>
        <br>

        <span class="normal_text no_margin">UKUPNO  planirani troškovi za aktivnost C</span>
        <v-text-field
          v-model="ukupnoTroskoviC"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>

        <hr>
        <br>

        <h3 class="normal_text">
          D. Troškovi povezani s izradom LRSR, uključujući konzultantske troškove
          i troškove povezane s konzultacijama dionika u svrhu pripreme LRSR
        </h3>
        <br>
        <br>

        <span class="normal_text no_margin">UKUPNO  planirani troškovi za aktivnost D</span>
        <v-text-field
          v-model="ukupnoTroskoviD"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>

        <hr>
        <br>

        <h3 class="normal_text">
          E. Potpora malim pilot-projektima
        </h3>
        <br>
        <br>

        <span class="normal_text no_margin">UKUPNO  planirani troškovi za aktivnost E</span>
        <v-text-field
          v-model="ukupnoTroskoviE"
          label=""
          required
          class="short_text_field no_margin"
        ></v-text-field>
        <hr>
        <br>

        <span class="normal_text no_margin">Ukupno za sve aktivnosti</span>
        <v-text-field
          v-model="ukupnoSveAktivnosti"
          label=""
          readonly=true
          class="short_text_field no_margin"
        ></v-text-field>

      </v-form>

      <!-- page 10 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===10">
        <h1 class="subtitle upper">7.  OBVEZAN SADRŽAJ PRIJEDLOGA PILOT PROJEKT UZ ZAHTJEV ZA POTPORU</h1>
        <br>
        <br>

      <div class="image_container">
        <img src="./assets/7.Obvezan-sadrzaj.png" alt="Obavezan sadržaj predloga" />
      </div>
 
      </v-form>

      <!-- page 11 -->
       <v-form ref="form" v-model="valid" lazy-validation v-if="page===11">
        <h1 class="upper subtext" style="text-align:center;">8. IZJAVA OSOBE OVLAŠTENE ZA ZASTUPANJE LOKALNE INICIJATIVE</h1>
        <br>
        <p
          style="text-align:center"
          class="bold"
        >Izjavljujem pod materijalnom i kaznenom odgovornošću te svojim potpisom i pečatom potvrđujem</p>
        <br>
        <hr>
        <br>
        <ul class="izjava">
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat/a i suglasan/a sa sadržajem Pravilnika i Natječaja te s ostalim zakonskim/podzakonskim aktima i pratećim regulativama.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da su svi podaci u Zahtjevu za potporu i pratećoj dokumentaciji istiniti i točni te da sam upoznat/a s posljedicama davanjem netočnih i krivih podataka.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da se slažem s načinom prikupljanja te dopu&scaron;tam obradu i kori&scaron;tenje podataka navedenih u Zahtjevu za potporu, a koji se upotrebljavaju za provedbu ovoga Natječaja.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da aktivnosti koje su predmet potpore nisu financirane nikakvim drugim javnim izdacima</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam upoznat/a sa činjenicom da se sredstva koja su nezakonito ostvarena odnosno upotrijebljena nenamjenski, moraju vratiti (zajedno sa zakonski propisanim zateznim kamatama);</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da nisam u sukobu interesa s dobavljačima roba i/ili usluga i/ili radova koji su predmet potpore odnosno da ću postupati sukladno članku 5. stavku 1. točki g) Pravilnika</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da sam suglasan/a da budem uvr&scaron;ten u popis korisnika koji se objavljuje u skladu s člankom 119. stavkom 2. Uredbe (EU) br. 508/2014 Europskog parlamenta i Vijeća o Europskom fondu za pomorstvo i ribarstvo;</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću čuvati svu dokumentaciju koja se odnosi na dodjelu sredstava iz EFPR-a najmanje dvije godine od 31. prosinca nakon predaje računa u kojima su uključeni zavr&scaron;ni tro&scaron;kovi operacije.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću omogućiti kontrolu na terenu i pristup dokumentaciji vezanoj za ulaganje za koje je ostvarena potpora Upravljačkog tijela, Tijela za ovjeravanje, Tijela za reviziju kao i ovla&scaron;tenim predstavnicima Europske komisije, Europskog revizorskog suda, Europskog ureda za borbu protiv prijevara (OLAF) i drugih nadležnih nadzornih/revizorskih tijela.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću voditi ili odvojeni računovodstveni sustav ili primjereni računovodstveni kod za sve transakcije vezane uz operaciju za koju mi je dodijeljena potpora.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću kod provedbe aktivnosti koje uključuju pružanje usluga kao &scaron;to su konferencije, edukacije, seminari ili drugi slični događaji, neovisno o tome da li je lokalna inicijativa ili njeni članovi u svojstvu organizatora ili sudionika, a kod kojih se obavlja kontrola na terenu za vrijeme trajanja aktivnosti, u propisanom roku obavijestiti Upravljačko tijelo o mjestu i vremenu održavanja.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću za aktivnosti koje uključuju pružanje usluga, a za koje se ne obavlja kontrola na terenu, dostaviti odgovarajuću dokumentaciju kojom se dokazuje da je predmetna aktivnost provedena (npr. fotografije, potpisne liste i slično).</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da materijalnu imovinu koja je predmet potpore neću prodati, koristiti protivno svrsi za koju je namijenjeno, dati u najam ili dati na bilo koje drugo raspolaganje i kori&scaron;tenje drugim pravnim ili fizičkim osobama najmanje pet godina od zadnje primljene uplate financijskih sredstava.</span></li>
          <li><span style="font-family: times new roman, times, serif; font-size: 12pt;">Da ću u provedbi aktivnost iza koje traži potporu po&scaron;tivati načela ravnopravnosti spolova, po&scaron;tovati zabranu diskriminacije u odnosu na mogućnost dobivanja i nabave roba kao i diskriminacije u pružanju i pristupu uslugama i zabranu diskriminacije na području zapo&scaron;ljavanja i rada te primjenjivati važeće propise iz područja javne nabave, ravnopravnosti spolova i za&scaron;tite okoli&scaron;a.</span></li>
        </ul>
        <br>
      </v-form>

      <!-- page 12 -->
      <v-form ref="form" v-model="valid" lazy-validation v-if="page===12">
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
        <v-pagination v-model="page" :length="12" :total-visible="5" class="pagi"></v-pagination>
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
    ribarskoPodruce: [
      "Obalna",
      "Otočna",
      "Kontinentalna"
    ],
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
      { text: "Naselje", value: "naselje", sortable: true }
    ],
    troskovi: [],
    editedIndex: -1,
    editedItem: {
      naselje: "",
    },
    defaultItem: {
      naselje: "",
    },

    /* Stanovniki */
     headersStanovniki: [
      { text: "JLS", value: "jls", sortable: true },
      { text: "Broj stanovnika", value: "brojStanovnika", sortable: true }
    ],
    stanovnik: [],
    editedIndexStanovniki: -1,
    editedItemStanovniki: {
      jls: "",
      brojStanovnika: "",
    },

    defaultItemStanovniki: {
      jls: "",
      brojStanovnika: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      }
    },
    /* Stanovniki end */

    /* Naselje */
    headersNaselje: [
      { text: "JLS", value: "jls", sortable: true },
      { text: "Obalna / otočna / kontinentalna", value: "ribarskoPodruce", sortable: true },
      { text: "Naselja unutar JLS", value: "unutarJls", sortable: true },
      { text: "Broj stanovnika", value: "brojStanovnikaNaselje", sortable: true },
    ],
    naselje: [],
    editedIndexNaselje: -1,
    editedItemNaselje: {
      jls: "",
      ribarskoPodruce: "",
      unutarJls: "",
      brojStanovnikaNaselje: "",
    },
    defaultItemPoNaselju: {
      jls: "",
      ribarskoPodruce: "",
      unutarJls: "",
      brojStanovnikaNaselje: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      }
    },
    /* Naselje end */

    /* popis */
    headersPopis: [
      { text: "R.br", value: "Rbr", sortable: true },
      { text: "JLS", value: "jls", sortable: true },
      { text: "Za ribarska plovila duljine iznad 15 metara", value: "ribarskoPloviloIznad", sortable: true },
      { text: "Za ribarska plovila duljine ispod 15 metara", value: "ribarskoPloviloIspod", sortable: true },
    ],
    popis:[],
    editedIndexPopis: -1,
    editedItemPopis: {
      Rbr: "",
      jls: "",
      ribarskoPloviloIznad: "",
      ribarskoPloviloIspod: "",
    },
    defaultItemPopis: {
      Rbr: "",
      jls: "",
      ribarskoPloviloIznad: "",
      ribarskoPloviloIspod: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      }
    },

    /* popis end*/

  /* title */
  }),
  computed: {
    formTitle() {
      return  "Naselje";
    },
     formTitleStanovniki() {
      return  "JLS i broj stanovnika";
    },

     formTitleNaselje() {
      return  "Unesi podace";
    },
   
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
      if (this.editedIndex > -1) {
        Object.assign(this.troskovi[this.editedIndex], this.editedItem);
      } else {
        this.troskovi.push(this.editedItem);
      }
      this.close();
    },

    editItemStanovniki(item) {
      this.editedItemStanovniki = this.stanovnik.indexOf(item);
      this.editedItemStanovniki = Object.assign({}, item);
      this.dialog = true;
    },

    editItemPlovilo(item) {
      this.editedIndexPlovilo = this.plovilo.indexOf(item);
      this.editedItemPlovilo = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItemStanovniki(item) {
      const index = this.stanovnik.indexOf(item);
      confirm("Jeste li sigurni da želite obrisati stavku?") &&
        this.stanovnik.splice(index, 1);
    },

    closeStanovnik() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItemStanovniki = Object.assign({}, this.defaultItemStanovniki);
        this.editedIndexStanovniki = -1;
      }, 300);
    },

    saveStanovnik() {
      if (this.editedIndexStanovniki > -1) {
        Object.assign(
          this.stanovnik[this.editedIndexStanovniki],
          this.editedItemStanovniki
        );
      } else {
        this.stanovnik.push(this.editedItemStanovniki);
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

/* Popup box */
.v-menu__content.theme--light.menuable__content__active {
    top: 0 !important;
    left: 0! important;
}

.image_container {
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;
}

img {
  width: 100%;
  max-width: 628px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
}



.no_margin {
  margin: 0 !important;
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
  max-width: 120px;
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

.naselje_tabela th.column.sortable.active.asc.text-xs-left {
  width: 100% !important;
}

.stanovnik_tabela th.column.sortable.active.asc.text-xs-left {
    width: 70% !important;
}

.stanovnik_tabela th.column.sortable.text-xs-left {
    width: 30% !important;
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
    top: 10px !important;
    left: -155px !important;  
}

  .pagi {
    position: absolute;
    left: -7px;
    bottom: 0;
  }

  .image_container {
    margin-bottom: 60px;
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
    left: -200px !important;
  }
    .sig-btn {
      padding: 0 8px;
    }
}

 @media only screen and (min-width: 361px) and (max-width: 415px) { 

    .v-menu__content.theme--light.menuable__content__active {
    top: 10px !important;
    left: -200px! important;
    border: 1px solid red !important;
    width: 100px !important;
    max-width: 110px !important;
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
