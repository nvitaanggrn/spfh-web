<template>
  <div class="container py-4">
    <h3 class="mb-4">
      Traning Online
    </h3>
    <div class="card shadow-sm mb-4">
      <div class="card-header">
        Filter
      </div>
      <form @submit.prevent class="card-body">
        <div class="row">
          <div class="col-6">
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
          <div class="col-6">
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
    <div class="d-flex align-items-center mb-4">
      <nav class="flex-fill">
        <ul class="pagination">
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
      <router-link
        to="/admin/event/create"
        class="btn btn-success">
        <vue-feather type="plus" size="1rem"/>
        <span class="ms-1">
          Tambah
        </span>
      </router-link>
    </div>
    <table class="table table-bordered table-hover align-middle bg-white shadow-sm">
      <thead class="table-primary">
        <tr>
          <th width="4%" class="small text-uppercase text-center">
            No
          </th>
          <th class="small text-uppercase">
            Title
          </th>
          <th class="small text-uppercase">
            Deskripsi
          </th>
          <th class="small text-uppercase">
            Tanggal / Expired
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
            {{item.title}}
          </td>
          <td width="50%">
            {{item.description}}
          </td>
          <td>
            <div>
              <DateTimeViewComponent :value="item.schedule_at"/>
            </div>
            <div class="text-muted">
              <DateTimeViewComponent :value="item.expired_at"/>
            </div>
          </td>
          <td class="text-center">
            <a
              target="_blank"
              :href="item.link"
              class="text-decoration-none btn btn-sm btn-primary d-block mb-2">
              Tampilkan
            </a>
            <div
              @click="remove(item)"
              class="btn btn-sm btn-outline-danger d-block">
              <div v-if="item.isLoading" class="spinner-border spinner-border-sm"/>
              <span v-else>Hapus</span>
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
let _apiRequest = Api.createGetRequest('/admin/event/all')
let _apiDeleteRequest = Api.createPostRequest('/admin/event/delete')

export default {
  data: () => ({
    page: 0,
    take: 20,
    index: 0,
    params: {
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
    remove(item){
      item.isLoading = true
      const data = {
        id: item.id
      }
      _apiFetcher = _apiDeleteRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null;
        item.isLoading = false
        this.loadData()
      }).catch(() => {
        _apiFetcher = null;
        item.isLoading = false
      })
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