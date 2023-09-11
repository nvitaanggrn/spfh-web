<template>
  <div id="signup" class="d-flex min-vh-100 py-4">
    <div class="d-flex flex-column flex-fill align-items-center justify-content-center">
      <div class="card shadow">
        <form class="card-body" @submit.prevent>
          <div class="logo text-center">
            <img src="../assets/img/logo.svg" class="img-fluid"/>
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
              <vue-feather type="type" size="1rem" class="text-primary"/>
            </span>
            <input v-model="data.name" placeholder="Nama Lengkap" type="text" class="form-control"/>
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text bg-transparent">
              <vue-feather type="list" size="1rem" class="text-primary"/>
            </span>
            <select
              v-model="data.group"
              class="form-select">
              <option value="">Pilih Group...</option>
              <option value="1">N/A</option>
              <option value="2">A</option>
              <option value="3">B</option>
              <option value="4">C</option>
              <option value="5">D</option>
              <option value="6">NS</option>
            </select>
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text bg-transparent">
              <vue-feather type="lock" size="1rem" class="text-primary"/>
            </span>
            <input v-model="data.password" placeholder="Password" type="password" class="form-control"/>
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text bg-transparent">
              <vue-feather type="lock" size="1rem" class="text-primary"/>
            </span>
            <input v-model="data.password_confirmation" placeholder="Password (Konfirmasi)" type="password" class="form-control"/>
          </div>
          <div class="input-group mb-4">
            <button
              @click="signup"
              class="btn btn-primary w-100 fw-bold">
              <div v-if='isLoading' class="spinner-border spinner-border-sm text-white"/>
              <span v-else class="small text-uppercase">
                Daftar
              </span>
            </button>
          </div>
          <div class="text-muted text-center px-5">
            <small>
              Sudah mempunyai akun? <router-link to="/signin">Masuk</router-link>
            </small>
          </div>
          <OverlayComponent :isVisible="isLoading"/>
        </form>
      </div>
      <div class="text-center mt-4">
        <small class="text-muted">
          Copyright &copy; 2022 Novita Anggraini.
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../utils/api/Api'
import OverlayComponent from '../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/enduser/user/signup')

export default {
  data: () => ({
    data: {
      group: ''
    },
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
    signup(){
      this.error = null;
      this.isLoading = true;
      _apiFetcher = _apiRequest.fetch({data: this.data}).safeThen(() => {
        _apiFetcher = null;
        this.isLoading = false;
        this.$router.replace('/signin')
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
#signup{
  background-color: #fff;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAMklEQVRYhe3PoQ0AIBRDwQbNEszAOuw/B/kGg0WRu+SZugYAgA/1sWb14lm7FgAAOJJsjOUBe5fO1bAAAAAASUVORK5CYII=');
  background-size: 1.75rem;
}

#signup > div > .card{
  width: 32rem;
  padding: 6rem 4rem;
}

#signup > div > .card > .card-body > .logo > img{
  height: 5rem;
}
</style>