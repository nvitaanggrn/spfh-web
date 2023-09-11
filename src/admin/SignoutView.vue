<template>
  <SplashComponent/>
</template>

<script>
import Api from '../utils/api/Api'
import SplashComponent from '../components/SplashComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/admin/user/signout')

export default {
  components: {
    SplashComponent
  },

  mounted(){
    _apiFetcher = _apiRequest.fetch().safeThen(() => {
      _apiFetcher = null;
      this.$store.user = null
      this.$store.status = null
      this.$router.replace('/admin')
    }).catch(() => {
      _apiFetcher = null;
    })
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  }
}
</script>