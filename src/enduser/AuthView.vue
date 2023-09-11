<template>
  <SplashComponent v-if="view == 1"/>
  <Error500Component v-if="view == 2"/>
  <router-view v-if="view == 3"/>
</template>

<script>
import Api from '../utils/api/Api'
import SplashComponent from '../components/SplashComponent.vue'
import Error500Component from '../components/Error500Component.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/enduser/user/auth')

export default {
  props: [
    'flags',
    'redirect'
  ],

  components: {
    SplashComponent,
    Error500Component
  },

  mounted(){
    this.auth();
  },

  updated(){
    this.auth();
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  data: () => ({
    view: 1 
  }),

  methods: {
    auth(){
      const {status} = this.$store
      if (status & this.flags) {
        this.view = 3
      } else {
        this.load()
      }
    },

    load(){
      _apiFetcher = _apiRequest.fetch().safeThen(({data}) => {
        _apiFetcher = null;
        this.$store.user = data.user
        this.$store.status = data.status | 0
        if (data.status & this.flags) {
          this.view = 3
        } else {
          this.$router.replace(this.redirect)
        }
      }).catch(() => {
        _apiFetcher = null;
        this.view = 2
      })
    }
  }
}
</script>