import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from '@/components/Wrapper'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wrapper',
      component: Wrapper
    }
  ]
})
