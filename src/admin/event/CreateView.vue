<template>
  <div class="container py-4">
    <div class="card card-primary mb-4 shadow-sm">
      <div class="card-header">
        Tambah Traning Online
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
            <div class="col-6 mb-4">
              <label class="form-label">
                Title
              </label>
              <input v-model="params.title" type="text" class="form-control"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Link (URL)
              </label>
              <input v-model="params.link" type="text" class="form-control"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Tanggal
              </label>
              <VueDatePicker
                v-model="params.schedule_datetime"
                locale="id"
                format="dd/MM/yyyy HH:mm"
                :autoApply="true"
                :clearable="false"
                :utc="true"/>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Tanggal (Expired)
              </label>
              <VueDatePicker
                v-model="params.expired_datetime"
                locale="id"
                format="dd/MM/yyyy HH:mm"
                :autoApply="true"
                :clearable="false"
                :utc="true"/>
            </div>
            <div class="col-12 mb-4">
              <label class="form-label">
                Keterangan
              </label>
              <textarea v-model="params.description" class="form-control"/>
            </div>
            <div class="col-12">
              <div class="text-end">
                <router-link
                  to="/admin/event"
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
import moment from 'moment-timezone';
import Api from '../../utils/api/Api'
import OverlayComponent from '../../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/admin/event/create')

export default {
  data: () => ({
    data: {},
    params: {
      link: "",
      title: "",
      description: "",
      schedule_datetime: moment.utc(),
      expired_datetime: moment.utc(),
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
      const data = {
        ...this.params,
        schedule_datetime: moment.utc(this.params.schedule_datetime).format('Y-MM-DD HH:mm:ss'),
        expired_datetime: moment.utc(this.params.expired_datetime).format('Y-MM-DD HH:mm:ss')
      }
      _apiFetcher = _apiRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isLoading = false
        this.$router.replace('/admin/event')
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>