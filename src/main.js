import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';
import './plugins/vuetify'
import App from './App.vue'
import vueSignature from "vue-signature"


Vue.config.productionTip = false
Vue.use(vueSignature)

new Vue({
  render: h => h(App),
}).$mount('#app')
