<template>
  <div class="container py-4">
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
    <div class="row">
      <div class="col-3 mb-4">
        <router-link
          to="/form/create"
          class="text-decoration-none">
          <div class="card h-100 py-4 bg-light shadow-sm">
            <div class="card-body">
              <div class="text-center">
                <vue-feather type="plus" size="3rem" class="text-warning"/>
              </div>
            </div>
            <div class="card-body pt-0 px-4">
              <div class="text-center text-body">
                Tambah
              </div>
              <div class="text-center text-muted">
                laporan hiyarihatto near-miss / nyaris celaka
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-for="item in data" :key="item.id" class="col-3 mb-4">
        <div class="card pt-4 shadow-sm">
          <router-link
            :to="{path: '/form/item', query: {id: item.id}}"
            class="text-decoration-none">
            <div class="card-body">
              <div class="text-center">
                <vue-feather type="file-text" size="3rem" class="text-primary"/>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="text-center text-primary">
                {{item.group_name}} / {{item.location_name}}
              </div>
              <div class="text-center text-muted">
                <DateTimeViewComponent :value="item.reported_at"/>
              </div>
              <div class="text-center mt-2">
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
              </div>
            </div>
          </router-link>
          <div class="card-footer d-flex">
            <span class="small text-muted">
              <vue-feather type="arrow-right" size=".875rem"/>
              <span class="ms-3">
                {{item.user_name}}
              </span>
            </span>
            <div
              @click="remove(item)"
              v-if="item.form_status_id == 1 && item.user_id == $store.user.id"
              class="ms-auto small text-danger c-pointer">
              Hapus
            </div>
          </div>
          <div v-if="item.isLoading" class="position-absolute top-0 bottom-0 start-0 end-0 d-flex flex-column bg-white justify-content-center align-items-center">
            <div class="spinner-border spinner-border-sm text-primary"/>
            <div class="small text-muted mt-2">
              Menghapus...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <small class="text-muted">
        Copyright &copy; 2022 Novita Anggraini.
      </small>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/api/Api'
import DateTimeViewComponent from '../../components/DateTimeViewComponent'

let _apiFetcher = null
let _apiAllRequest = Api.createGetRequest('/enduser/form/all')
let _apiDeleteRequest = Api.createGetRequest('/enduser/form/delete')

export default {
  data: () => ({
    page: 0,
    take: 20,
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
      const data = {id: item.id}
      item.isLoading = true
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
        _page: this.page,
        _take: this.take
      }
      this.isLoading = true
      _apiFetcher = _apiAllRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null;
        this.isLoading = false
        this.data = data
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