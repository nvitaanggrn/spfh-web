<template>
  <div class="container py-4">
    <div class="card card-primary mb-4 shadow-sm">
      <div class="card-header">
        Tambah Admin / User
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div v-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-4">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{error.message}}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label class="form-label">
                Jenis
              </label>
              <select
                v-model="params.type"
                class="form-select">
                <option value="">...</option>
                <option value="1">Admin</option>
                <option value="2">Karyawan</option>
              </select>
            </div>
            <div class="col-3 mb-4">
              <label class="form-label">
                Nip
              </label>
              <input v-model="params.nip" type="text" class="form-control"/>
            </div>
            <div class="col-3">
              <label class="form-label">
                Group
              </label>
              <select
                v-model="params.group"
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
            <div class="col-3 mb-4">
              <label class="form-label">
                Nama Lengkap
              </label>
              <input v-model="params.name" type="text" class="form-control"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Password
              </label>
              <input v-model="params.password" type="password" class="form-control"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Password (Konfirmasi)
              </label>
              <input v-model="params.password_confirmation" type="password" class="form-control"/>
            </div>
            <div class="col-12 mb-4">
              <label class="form-label">
                Alamat Lengkap
              </label>
              <textarea v-model="params.address" class="form-control"/>
            </div>
            <div class="col-12">
              <div class="text-end">
                <router-link
                  to="/admin/users"
                  class="btn btn-outline-primary">
                  <vue-feather type="arrow-left" size="1rem"/>
                  <span class="ms-1">
                    Kembali
                  </span>
                </router-link>
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
          </div>
        </form>
      </div>
      <OverlayComponent :isVisible="isLoading"/>
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
let _apiRequest = Api.createUploadRequest('/admin/users/create')

export default {
  data: () => ({
    data: {},
    params: {
      type: "",
      nip: "",
      name: "",
      password: "",
      password_confirmation: "",
      address: ""
    },
    isLoading: false,
    error: null
  }),

  components: {
    OverlayComponent
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel()
    _apiFetcher = null
  },

  methods: {
    create(){
      this.error = null
      this.isLoading = true
      const data = this.params
      _apiFetcher = _apiRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isLoading = false
        this.$router.replace('/admin/users')
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>