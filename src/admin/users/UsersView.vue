<template>
  <div class="container py-4">
    <h3 class="mb-4">
      Admin / Karyawan
    </h3>
    <div class="card shadow-sm mb-4">
      <div class="card-header">
        Filter
      </div>
      <form @submit.prevent class="card-body">
        <div class="row">
          <div class="col-3">
            <label class="form-label">
              Jenis
            </label>
            <select
              v-model="params.type"
              class="form-select">
              <option value="">Semua</option>
              <option value="1">Admin</option>
              <option value="2">Karyawan</option>
            </select>
          </div>
          <div class="col-3 mb-4">
            <label class="form-label">
              NIP
            </label>
            <input v-model="params.nip" type="text" class="form-control"/>
          </div>
          <div class="col-3 mb-4">
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
          <div class="col-3 mb-4">
            <label class="form-label">
              Nama
            </label>
            <input v-model="params.name" type="text" class="form-control"/>
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
        <ul class="pagination mb-0">
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
        to="/admin/users/create"
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
            Jenis
          </th>
          <th class="small text-uppercase">
            NIP
          </th>
          <th class="small text-uppercase">
            Group 
          </th>
          <th class="small text-uppercase">
            Nama Lengkap
          </th>
          <th class="small text-uppercase">
            Alamat Lengkap
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
            {{item.user_type_name}}
          </td>
          <td>
            {{item.nip}}
          </td>
          <td>
            {{item.group.name}}
          </td>
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.address}}
          </td>
          <td class="text-center">
            <div class="btn-group w-100">
              <router-link
                :to="{path: '/admin/users/update', query: {id: item.id}}"
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
import Api from '../../utils/api/Api'

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/admin/users/all')
let _apiDeleteRequest = Api.createPostRequest('/admin/users/delete')

export default {
  data: () => ({
    page: 0,
    take: 20,
    index: 0,
    params: {
      type: '',
      nip: '',
      name: ''
    },
    data: [],
    isLoading: false
  }),

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