<template>
  <div class="container py-4">
    <div v-if="!isLoading" class="card card-primary mb-4 shadow-sm">
      <div class="card-header">
        Update Status
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div v-if="updateError" class="alert alert-warning d-flex w-100 align-items-center mb-4">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{updateError.message}}
            </div>
          </div>
          <div v-if="isUpdated" class="alert alert-success d-flex w-100 align-items-center mb-4">
            Status laporan telah berhasil diperbarui.
          </div>
          <div class="row">
            <div class="col-6 mb-4">
              <label class="form-label">
                Status
              </label>
              <select
                v-model="params.status"
                class="form-select">
                <option value="">...</option>
                <option value="1">Pending</option>
                <option value="3">Ditolak</option>
                <option value="4">Telah Diterima</option>
                <option value="5">Telah Diproses</option>
                <option value="6">Selesai</option>
              </select>
            </div>
            <div class="col-6 mb-4">
              <label class="form-label">
                Tanggal
              </label>
              <VueDatePicker
                v-model="params.datetime"
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
                  to="/admin/form"
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
    </div>
    <div class="card p-5 shadow-sm">
      <div class="position-absolute top-0 end-0 p-4">
        <a
          :href="viewpdf"
          target="_blank"
          class="btn btn-sm btn-danger">
          <vue-feather type="file-text" size="1rem" class="text-white me-2"/>
          Tampilkan PDF
        </a>
      </div>
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border text-primary"/>
      </div>
      <div v-else-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-0">
        <vue-feather type="info" size="1rem"/>
        <div className='flex-fill ms-3'>
          {{error.message}}
        </div>
        <router-link
          to="/form"
          class="btn btn-danger">
          <vue-feather type="arrow-left" size="1rem"/>
          <span class="ms-1">
            Kembali
          </span>
        </router-link>
      </div>
      <div v-else>
        <div class="text-center mb-5">
          <div class="fs-2 fw-bold">
            Laporan Hiyarihatto
          </div>
          <div class="fs-6 text-muted">
            <span class="border-2 border-bottom border-warning pb-4 d-inline-block">
              Near-Miss / Nyaris Celaka
            </span>
          </div>
        </div>
        <table class="table table-bordered table-borderless align-middle mb-4">
          <tbody>
            <tr>
              <td width="15%" class="bg-light fw-bold">
                NIP
              </td>
              <td width="35%">
                {{data.user_nip}}
              </td>
              <td width="15%" class="bg-light fw-bold">
                Group
              </td>
              <td width="35%">
                {{data.group_name}}
              </td>
            </tr>
            <tr>
              <td class="bg-light fw-bold">
                Nama
              </td>
              <td>
                {{data.user_name}}
              </td>
              <td class="bg-light fw-bold">
                Tanggal / Status
              </td>
              <td>
                <DateTimeViewComponent :value="data.reported_at"/> / <span class="text-muted">{{data.form_status_name}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card mb-4">
          <div class="card-header text-center fw-bold">
            Lokasi Kejadian
          </div>
          <div class="card-header">
            <div class="row">
              <div class="col text-center fw-bold">
                Mesin / Ruangan
              </div>
              <div class="col text-center fw-bold border-start">
                Bagian
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                {{data.location_name}}
              </div>
              <div class="col border-start">
                {{data.place}}
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Item Temuan
              </div>
              <div class="card-body">
                {{data.situation}}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Potensi Bahaya
              </div>
              <div class="card-body">
                {{data.possibility}}
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Usulan Perbaikan
              </div>
              <div class="card-body">
                {{data.repairsuggest}}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Tindakan Perbaikan
              </div>
              <div class="card-body">
                {{data.repairaction}}
              </div>
            </div>
          </div>
        </div>
      </div>
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
import DateTimeViewComponent from '../../components/DateTimeViewComponent'

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/admin/form/item')
let _apiUpdateRequest = Api.createGetRequest('/admin/form/update')

export default {
  data: () => ({
    data: {},
    params: {
      status: "",
      datetime: moment.utc(),
      description: ""
    },
    viewpdf: "",
    isLoading: true,
    error: null,
    isUpdated: false,
    isUpdateLoading: false,
    updateError: null,
  }),

  components: {
    DateTimeViewComponent
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
        this.viewpdf = Api.url('/admin/form/viewpdf', {id: data.id})
        this.params.status = data.form_status_id
        this.params.datetime = data.form_process_datetime ? moment.utc(data.form_process_datetime) : moment.utc()
        this.params.description = data.form_process_description
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    },

    update(){
      this.isUpdated = false
      this.updateError = null
      this.isUpdateLoading = true
      const data = {
        ...this.params,
        datetime: moment.utc(this.params.datetime).format('Y-MM-DD HH:mm:ss'),
        id: this.data.id
      }
      _apiFetcher = _apiUpdateRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null
        this.isUpdated = true
        this.isUpdateLoading = false
        this.data = data
        this.params.status = data.form_status_id
        this.params.datetime = data.form_process_datetime ? moment.utc(data.form_process_datetime) : moment.utc()
        this.params.description = data.form_process_description
      }).catch(error => {
        _apiFetcher = null
        this.isUpdateLoading = false
        this.updateError = error
      })
    }
  }
}
</script>