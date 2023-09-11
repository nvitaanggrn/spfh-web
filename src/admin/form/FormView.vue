<template>
  <div class="container py-4">
    <h3 class="mb-4">
      Hiyarihatto
    </h3>
    <div class="card shadow-sm mb-4">
      <div class="card-header">
        Filter
      </div>
      <form @submit.prevent class="card-body">
        <div class="row">
          <div class="col-4 mb-4">
            <label class="form-label">
              NIP
            </label>
            <input v-model="params.nip" type="text" class="form-control"/>
          </div>
          <div class="col-4 mb-4">
            <label class="form-label">
              Status
            </label>
            <select
              v-model="params.status"
              class="form-select">
              <option value="">Semua</option>
              <option value="1">Pending</option>
              <option value="3">Ditolak</option>
              <option value="4">Telah Diterima</option>
              <option value="5">Telah Diproses</option>
              <option value="6">Selesai</option>
            </select>
          </div>
          <div class="col-4 mb-4">
            <label class="form-label">
              Group
            </label>
            <select
              v-model="params.group"
              class="form-select">
              <option value="">Semua</option>
              <option value="1">N/A</option>
              <option value="2">A</option>
              <option value="3">B</option>
              <option value="4">C</option>
              <option value="5">D</option>
              <option value="6">NS</option>
            </select>
          </div>
          <div class="col-4">
            <label class="form-label">
              Lokasi / Mesin
            </label>
            <select
              v-model="params.location"
              class="form-select">
              <option value="">
                Semua
              </option>
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
          <div class="col-4">
            <label class="form-label">
              Tanggal (Dari)
            </label>
            <VueDatePicker
              v-model="params.start_datetime"
              locale="id"
              format="dd/MM/yyyy"
              :autoApply="true"
              :clearable="true"
              :utc="true"/>
          </div>
          <div class="col-4">
            <label class="form-label">
              Tanggal (Sampai)
            </label>
            <VueDatePicker
              v-model="params.end_datetime"
              locale="id"
              format="dd/MM/yyyy"
              :autoApply="true"
              :clearable="true"
              :utc="true"/>
          </div>
          <div class="col-12 mt-4 text-end">
            <button
              @click="datapdf"
              class="btn btn-outline-danger me-2">
              <div v-if="isLoading" class="spinner-border spinner-border-sm text-white"/>
              <vue-feather v-else type="filter" size="1rem"/>
              <span class="ms-1">
                Tampilkan PDF
              </span>
            </button>
            <button
              @click="loadData"
              class="btn btn-outline-primary">
              <div v-if="isLoading" class="spinner-border spinner-border-sm text-white"/>
              <vue-feather v-else type="filter" size="1rem"/>
              <span class="ms-1">
                Filter
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div>
      <nav>
        <ul class="pagination mb-4">
          <li class="page-item">
            <span
              @click="loadPrev"
              class="page-link text-dark c-pointer">
              <vue-feather type="arrow-left" size="1rem"/>
            </span>
          </li>
          <li class="page-item">
            <span class="page-link text-dark px-4">
              <div v-if="isLoading" class="spinner-border spinner-border-sm text-primary"/>
              <span v-else>{{page + 1}}</span>
            </span>
          </li>
          <li class="page-item">
            <span
              @click="loadNext"
              class="page-link text-dark c-pointer">
              <vue-feather type="arrow-right" size="1rem"/>
            </span>
          </li>
        </ul>
      </nav>
    </div>
    <table class="table table-bordered table-hover align-middle bg-white shadow-sm">
      <thead class="table-primary">
        <tr>
          <th width="4%" class="small text-uppercase text-center">
            No
          </th>
          <th class="small text-uppercase">
            Nip
          </th>
          <th class="small text-uppercase">
            Nama
          </th>
          <th width="15%" class="small text-uppercase">
            Status
          </th>
          <th class="small text-uppercase">
            Group / Lokasi / Mesin
          </th>
          <th class="small text-uppercase">
            Tanggal
          </th>
          <th width="10%" class="small text-uppercase text-center">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="border-top-0">
        <tr v-for="(item, i) in data" :key="item.id">
          <td class="text-center">
            {{index + i + 1}}
          </td>
          <td>
            {{item.user_nip}}
          </td>
          <td>
            {{item.user_name}}
          </td>
          <td>
            <span v-if="item.form_status_id == 4" class="btn btn-sm btn-outline-primary py-1">
              <vue-feather type="info" size="1rem"/>
              <span class="ms-2">
                {{item.form_status_name}}
              </span>
            </span>
            <span v-else-if="item.form_status_id == 5" class="btn btn-sm btn-outline-success py-1">
              <vue-feather type="info" size="1rem"/>
              <span class="ms-2">
                {{item.form_status_name}}
              </span>
            </span>
            <span v-else-if="item.form_status_id == 6" class="btn btn-sm btn-success py-1">
              <vue-feather type="check" size="1rem"/>
              <span class="ms-2">
                {{item.form_status_name}}
              </span>
            </span>
            <span v-else class="btn btn-sm btn-outline-secondary py-1">
              {{item.form_status_name}}
            </span>
          </td>
          <td>
            {{item.group_name}} / {{item.location_name}}
          </td>
          <td>
            <DateTimeViewComponent :value="item.reported_at"/>
          </td>
          <td class="text-center">
            <div class="btn btn-group w-100">
              <router-link
                :to="{path: '/admin/form/item', query: {id: item.id}}"
                class="text-decoration-none btn btn-sm btn-primary">
                Tampilkan
              </router-link>
              <a
                :href="viewpdf(item)"
                target="_blank"
                class="btn btn-sm btn-danger">
                PDF
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
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
let _apiRequest = Api.createGetRequest('/admin/form/all')

export default {
  data: () => ({
    page: 0,
    take: 20,
    index: 0,
    params: {
      nip: "",
      status: "",
      group: "",
      location: "",
      start_datetime: null,
      end_datetime: null
    },
    data: [],
    isLoading: false
  }),

  components: {
    DateTimeViewComponent
  },

  mounted(){
    this.loadData();
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  methods: {
    datapdf(){
      const data = {...this.params};
      if (data.start_datetime) {
        data.start_datetime = moment.utc(data.start_datetime).tz('Asia/Jakarta').startOf('day').utc().format('Y-MM-DD HH:mm:ss')
      }
      if (data.end_datetime) {
        data.end_datetime = moment.utc(data.end_datetime).tz('Asia/Jakarta').endOf('day').utc().format('Y-MM-DD HH:mm:ss')
      }
      const url = Api.url('/admin/form/datapdf', data);
      window.open(url, '_blank')
    },
  
    viewpdf(item){
      return Api.url('/admin/form/viewpdf', {id: item.id});
    },

    loadData(){
      const data = {
        ...this.params,
        _page: this.page,
        _take: this.take
      }
      if (data.start_datetime) {
        data.start_datetime = moment.utc(data.start_datetime).tz('Asia/Jakarta').startOf('day').utc().format('Y-MM-DD HH:mm:ss')
      }
      if (data.end_datetime) {
        data.end_datetime = moment.utc(data.end_datetime).tz('Asia/Jakarta').endOf('day').utc().format('Y-MM-DD HH:mm:ss')
      }
      this.isLoading = true
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null;
        this.isLoading = false
        this.data = data
        this.index = this.page * this.take
      }).catch(() => {
        _apiFetcher = null;
        this.isLoading = true
      })
    },

    loadPrev(){
      this.page = Math.max(--this.page, 0)
      this.loadData()
    },

    loadNext(){
      this.page = Math.min(++this.page, Number.MAX_SAFE_INTEGER)
      this.loadData()
    }
  }
}
</script>