<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-3"/>
      <div class="col-6">
        <div class="card p-5 shadow-sm">
          <div class="card-body">
            <div class="text-center mb-4">
              <div class="fs-3">
                My Profil
              </div>
            </div>
            <div v-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-4">
              <vue-feather type="info" size="1rem"/>
              <div className='flex-fill ms-3'>
                {{error.message}}
              </div>
            </div>
            <div v-if="isCreated" class="alert alert-success d-flex w-100 align-items-center mb-4">
              Berhasil memperbarui profil anda.
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                NIP
              </label>
              <input readonly :value="$store.user.nip" type="text" class="form-control"/>
              <small class="text-muted d-block pt-2">
                NIP (Nomor Induk Pegawai) tidak diperbarui untuk alasan kevalidan data yang anda gunakan pada aplikasi.
              </small>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Name Lengkap
              </label>
              <input v-model="data.name" type="text" class="form-control"/>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Group
              </label>
              <select
                v-model="data.group"
                class="form-select">
                <option value="">...</option>
                <option value="1">N/A</option>
                <option value="2">A</option>
                <option value="3">B</option>
                <option value="4">C</option>
                <option value="5">D</option>
                <option value="6">NS</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Alamat Lengkap
              </label>
              <textarea v-model="data.address" class="form-control"/>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Otentikasi <sup>(Opsional)</sup>
              </label>
              <div class="input-group mb-3">
                <span class="input-group-text bg-transparent">
                  <vue-feather type="lock" size="1rem" class="text-primary"/>
                </span>
                <input v-model="data.password" placeholder="Password" type="password" class="form-control"/>
              </div>
              <div class="input-group">
                <span class="input-group-text bg-transparent">
                  <vue-feather type="lock" size="1rem" class="text-primary"/>
                </span>
                <input v-model="data.password_confirmation" placeholder="Password (Konfirmasi)" type="password" class="form-control"/>
              </div>
            </div>
            <div class="text-end">
              <button
                @click="create"
                class="btn btn-primary ms-2">
                <div v-if="isLoading" class="spinner-border spinner-border-sm text-white"/>
                <vue-feather v-else type="check" size="1rem" class="text-white"/>
                <span class="ms-1">
                  Simpan
                </span>
              </button>
            </div>
          </div>
          <OverlayComponent :isVisible="isLoading"/>
        </div>
        <div class="card shadow-sm mt-3">
          <div class="card-body text-center">
            <router-link
              to="/admin/signout"
              class="text-danger text-uppercase text-decoration-none fw-bold">
              Keluar
              <vue-feather type="log-out" size=".75rem" class="ms-2"/>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-3"/>
    </div>
    <div class="text-center mt-4">
      <small class="text-muted">
        Copyright &copy; 2022 Novita Anggraini.
      </small>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/api/Api'
import OverlayComponent from '../../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/admin/user/update')

export default {
  data: () => ({
    data: {
      name: "",
      address: "",
      group: "",
      password: "",
      password_confirmation: ""
    },
    isCreated: false,
    isLoading: false,
    error: null
  }),

  components: {
    OverlayComponent
  },

  mounted(){
    this.data.name = this.$store.user.name
    this.data.group = this.$store.user.group.id
    this.data.address = this.$store.user.address
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel()
    _apiFetcher = null
  },

  methods: {
    create(){
      this.error = null
      this.isLoading = true
      this.isCreated = false
      const data = this.data
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null
        this.isCreated = true
        this.isLoading = false
        this.$store.user = data.user
        this.$store.status = data.status | 0
        this.data.password = ''
        this.data.password_confirmation = ''
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>