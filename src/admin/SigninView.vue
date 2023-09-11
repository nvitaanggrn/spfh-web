<template>
  <div id="signin" class="d-flex min-vh-100 py-4">
    <div class="d-flex flex-fill align-items-center justify-content-center">
      <div class="card shadow">
        <form class="card-body" @submit.prevent>
          <div class="text-center">
            <img src="../assets/img/logo.svg" class="img-fluid w-75"/>
          </div>
          <div class="py-4"/>
          <div v-if="error" class="alert alert-warning d-flex w-100 align-items-center">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{error.message}}
            </div>
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text bg-transparent">
              <vue-feather type="user" size="1rem" class="text-primary"/>
            </span>
            <input v-model="data.nip" placeholder="NIP" type="text" class="form-control"/>
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text bg-transparent">
              <vue-feather type="lock" size="1rem" class="text-primary"/>
            </span>
            <input v-model="data.password" placeholder="Password" type="password" class="form-control"/>
          </div>
          <div class="input-group mb-4">
            <button
              @click="signin"
              class="btn btn-primary w-100 fw-bold">
              <div v-if='isLoading' class="spinner-border spinner-border-sm text-white"/>
              <span v-else class="small text-uppercase">
                Masuk
              </span>
            </button>
          </div>
          <div class="text-muted text-center px-5">
            <small>
              Tidak dapat masuk? Silahkan hubungi administrator anda.
            </small>
          </div>
        </form>
        <OverlayComponent :isVisible="isLoading"/>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../utils/api/Api'
import OverlayComponent from '../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/admin/user/signin')

export default {
  data: () => ({
    data: {},
    error: null,
    isLoading: false
  }),

  components: {
    OverlayComponent
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  methods: {
    signin(){
      this.error = null;
      this.isLoading = true;
      _apiFetcher = _apiRequest.fetch({data: this.data}).safeThen(({data}) => {
        _apiFetcher = null;
        this.isLoading = false;
        this.$store.status = data.status | 0
        if (data.status & 0x01) {
          this.$store.user = data.user
          this.$router.replace('/admin')
        }
      }).catch(error => {
        _apiFetcher = null;
        this.isLoading = false;
        this.error = error;
      })
    }
  }
}
</script>

<style scoped>
#signin{
  background-color: #fff;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAMklEQVRYhe3PoQ0AIBRDwQbNEszAOuw/B/kGg0WRu+SZugYAgA/1sWb14lm7FgAAOJJsjOUBe5fO1bAAAAAASUVORK5CYII=');
  background-size: 1.75rem;
}
#signin > div > .card{
  width: 32rem;
  padding: 7rem 3.5rem;
}
</style>