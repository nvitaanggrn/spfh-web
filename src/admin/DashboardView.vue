<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-3">
        <div class="card bg-primary shadow">
          <div class="card-body d-flex align-items-center">
            <div class="flex-fill">
              <div class="text-white">
                Total Hiyarihatto
              </div>
              <div class="fs-1 text-white">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"/>
                <span v-else>{{data.form}}</span>
              </div>
            </div>
            <div>
              <vue-feather type="file-text" size="3rem" class="text-white-50"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-success shadow">
          <div class="card-body d-flex align-items-center">
            <div class="flex-fill">
              <div class="text-white">
                Total Traning Online
              </div>
              <div class="fs-1 text-white">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"/>
                <span v-else>{{data.event}}</span>
              </div>
            </div>
            <div>
              <vue-feather type="monitor" size="3rem" class="text-white-50"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-warning shadow">
          <div class="card-body d-flex align-items-center">
            <div class="flex-fill">
              <div class="text-white">
                Total Artikel &amp; Berita
              </div>
              <div class="fs-1 text-white">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"/>
                <span v-else>{{data.news}}</span>
              </div>
            </div>
            <div>
              <vue-feather type="rss" size="3rem" class="text-white-50"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-danger shadow">
          <div class="card-body d-flex align-items-center">
            <div class="flex-fill">
              <div class="text-white">
                Total Kritik &amp; Saran
              </div>
              <div class="fs-1 text-white">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"/>
                <span v-else>{{data.feedback}}</span>
              </div>
            </div>
            <div>
              <vue-feather type="list" size="3rem" class="text-white-50"/>
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
import Api from '../utils/api/Api'

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/admin/stats/all')

export default {
  data: () => ({
    data: [],
    isLoading: true
  }),

  mounted(){
    this.load();
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  methods: {
    load(){
      this.isLoading = true
      _apiFetcher = _apiRequest.fetch().safeThen(({data}) => {
        _apiFetcher = null;
        this.isLoading = false
        this.data = data
      }).catch(() => {
        _apiFetcher = null;
        this.isLoading = true
      })
    }
  }
}
</script>