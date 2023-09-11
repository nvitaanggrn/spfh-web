<template>
  <div class="container py-4">
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary"/>
    </div>
    <div v-else-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-0">
      <vue-feather type="info" size="1rem"/>
      <div className='flex-fill ms-3'>
        {{error.message}}
      </div>
      <router-link
        to="/admin/users"
        class="btn btn-danger">
        <vue-feather type="arrow-left" size="1rem"/>
        <span class="ms-1">
          Kembali
        </span>
      </router-link>
    </div>
    <div v-else class="card card-primary mb-4 shadow-sm">
      <div class="card-header">
        Edit Admin / User
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div v-if="updateError" class="alert alert-warning d-flex w-100 align-items-center mb-4">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{updateError.message}}
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label class="form-label">
                Jenis
              </label>
              <select
                disabled="true"
                v-model="data.user_type_id"
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
              <input v-model="data.nip" type="text" class="form-control" disabled="true"/>
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
                Password <sup>(Opsional)</sup>
              </label>
              <input v-model="params.password" type="password" class="form-control"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Password (Konfirmasi) <sup>(Opsional)</sup>
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
                  @click="update"
                  class="btn btn-primary ms-2">
                  <div v-if="isUpdateLoading" class="spinner-border spinner-border-sm text-white"/>
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
      <OverlayComponent :isVisible="isUpdateLoading"/>
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
let _apiRequest = Api.createGetRequest('/admin/users/item')
let _apiUpdateRequest = Api.createUploadRequest('/admin/users/update')

export default {
  data: () => ({
    data: {},
    params: {
      name: "",
      group: "",
      password: "",
      password_confirmation: "",
      address: ""
    },
    isLoading: true,
    error: null,
    isUpdateLoading: false,
    updateError: null
  }),

  components: {
    OverlayComponent
  },

  mounted(){
    this.load();
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel()
    _apiFetcher = null
  },

  methods: {
    load(){
      this.error = null
      this.isLoading = true
      const data = this.$route.query;
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null
        this.isLoading = false
        this.data = data
        this.params = {
          name: data.name,
          address: data.address,
          group: data.group.id
        }
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    },

    update(){
      this.updateError = null
      this.isUpdateLoading = true
      const data = {
        ...this.params,
        id: this.data.id
      }
      _apiFetcher = _apiUpdateRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isUpdateLoading = false
        this.$router.replace('/admin/users')
      }).catch(error => {
        _apiFetcher = null
        this.isUpdateLoading = false
        this.updateError = error
      })
    }
  }
}
</script>