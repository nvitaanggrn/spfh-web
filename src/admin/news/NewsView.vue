<template>
  <div class="container py-4">
    <h3 class="mb-4">
      Artikel &amp; Berita
    </h3>
    <div class="card shadow-sm mb-4">
      <div class="card-header">
        Filter
      </div>
      <form @submit.prevent class="card-body">
        <div class="row">
          <div class="col-3 mb-4">
            <label class="form-label">
              Search
            </label>
            <input v-model="params.search" type="text" class="form-control"/>
          </div>
          <div class="col-3">
            <label class="form-label">
              Kategori
            </label>
            <select
              v-model="params.category"
              class="form-select">
              <option value="">Semua</option>
              <option value="1">Dasar Safety</option>
              <option value="2">Obat-Obatan</option>
              <option value="3">Alat Safety</option>
            </select>
          </div>
          <div class="col-3">
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
          <div class="col-3">
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
        to="/admin/news/create"
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
            Gambar
          </th>
          <th class="small text-uppercase">
            Title / Kategori
          </th>
          <th class="small text-uppercase">
            Deskripsi
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
          <td width="10%">
            <a
              target="_blank"
              :href="item.image_url">
              <img :src="item.image_url" class="img-thumbnail"/>
            </a>
          </td>
          <td>
            <div>
              {{item.title}}
            </div>
            <div class="text-muted">
              {{item.category_name}}
            </div>
          </td>
          <td width="50%">
            {{item.description}}
          </td>
          <td>
            <DateTimeViewComponent :value="item.created_at"/>
          </td>
          <td class="text-center">
            <router-link
              :to="{path: '/admin/news/item', query: {id: item.id}}"
              class="text-decoration-none btn btn-sm btn-primary d-block mb-2">
              Tampilkan
            </router-link>
            <div class="btn-group w-100">
              <router-link
                :to="{path: '/admin/news/update', query: {id: item.id}}"
                class="btn btn-sm btn-outline-success">
                Edit
              </router-link>
              <div
                @click="remove(item)"
                class="btn btn-sm btn-outline-danger">
                <div v-if="item.isLoading" class="spinner-border spinner-border-sm"/>
                <span v-else>
                  <vue-feather type="trash" size="1rem"/>
                </span>
              </div>
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
let _apiRequest = Api.createGetRequest('/admin/news/all')
let _apiDeleteRequest = Api.createPostRequest('/admin/news/delete')

export default {
  data: () => ({
    page: 0,
    take: 20,
    index: 0,
    params: {
      category: "",
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
    this.params.search = this.$route.query.search
    this.params.category = this.$route.query.category
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