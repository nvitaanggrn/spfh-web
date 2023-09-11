<template>
  <div class="container py-4">
    <div class="card p-5 shadow-sm">
      <form @submit.prevent>
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
                {{$store.user.nip}}
              </td>
              <td width="15%" class="bg-light fw-bold">
                Group
              </td>
              <td width="35%">
                {{$store.user.group.name}}
              </td>
            </tr>
            <tr>
              <td class="bg-light fw-bold">
                Nama
              </td>
              <td>
                {{$store.user.name}}
              </td>
              <td class="bg-light fw-bold">
                Tanggal
              </td>
              <td>
                <VueDatePicker
                  v-model="data.datetime"
                  locale="id"
                  format="dd/MM/yyyy HH:mm"
                  :autoApply="true"
                  :clearable="false"
                  :utc="true"/>
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
                <select
                  v-model="data.location"
                  class="form-select">
                  <option value="">...</option>
                  <option value="1">
                    N/A
                  </option>
                  <option value="2">
                    Mesin 11
                  </option>
                  <option value="3">
                    Mesin 221
                  </option>
                  <option value="4">
                    Mesin 222
                  </option>
                  <option value="5">
                    Mesin 223
                  </option>
                  <option value="6">
                    Mesin 224
                  </option>
                  <option value="7">
                    Mesin 225
                  </option>
                  <option value="8">
                    Mesin 226
                  </option>
                  <option value="9">
                    Mesin 227
                  </option>
                  <option value="10">
                    Mesin 228
                  </option>
                  <option value="11">
                    Mesin 229
                  </option>
                  <option value="12">
                    Mesin 230
                  </option>
                  <option value="13">
                    Mesin 231
                  </option>
                </select>
              </div>
              <div class="col">
                <input type="text" class="form-control" v-model="data.place"/>
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
                <textarea class="form-control" v-model="data.situation"/>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Potensi Bahaya
              </div>
              <div class="card-body">
                <textarea class="form-control" v-model="data.possibility"/>
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
                <textarea class="form-control" v-model="data.repairsuggest"/>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header fw-bold text-center">
                Tindakan Perbaikan
              </div>
              <div class="card-body">
                <textarea class="form-control" v-model="data.repairaction"/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-4">
          <vue-feather type="info" size="1rem"/>
          <div className='flex-fill ms-3'>
            {{error.message}}
          </div>
        </div>
        <div class="text-end">
          <router-link
            to="/form"
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
      </form>
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
let _apiRequest = Api.createPostRequest('/enduser/form/create')

export default {
  data: () => ({
    data: {
      datetime: moment.utc(),
      location: "",
      place: null,
      situation: null,
      possibility: null,
      repairaction: null,
      repairsuggest: null
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
        ...this.data,
        datetime: moment.utc(this.data.datetime).format('Y-MM-DD HH:mm:ss')
      }
      _apiFetcher = _apiRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isLoading = false
        this.$router.replace('/form')
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>