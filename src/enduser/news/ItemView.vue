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
        to="/news"
        class="btn btn-danger">
        <vue-feather type="arrow-left" size="1rem"/>
        <span class="ms-1">
          Kembali
        </span>
      </router-link>
    </div>
    <div v-else class="row">
      <div class="col-9">
        <div class="card shadow-sm">
          <div class="card-body p-5">
            <div class="fs-2 fw-bold">
              {{data.title}}
            </div>
            <div class="mb-4">
              <router-link
                :to="{path: '/news', query: {category: data.category_id}}"
                class="text-muted">
                {{data.category_name}}
              </router-link> &middot; <DateTimeViewComponent :value="data.created_at" class="text-muted"/>
            </div>
            <div class="mb-4">
              <img :src="data.image_url" class="img-fluid w-100"/>
            </div>
            <div class="content" v-html="data.content"/>
          </div>
        </div>
        <div class="text-center mt-4">
          <small class="text-muted">
            Copyright &copy; 2022 Novita Anggraini.
          </small>
        </div>
      </div>
      <div class="col-3">
        <div class="sticky-top" style="top: 5rem;">
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <div class="input-group">
                <input
                  v-model="query"
                  v-on:keyup.enter="goSearch"
                  placeholder="Search..." type="text" class="form-control"/>
                <span
                  @click="goSearch"
                  class="input-group-text bg-transparent">
                  <vue-feather type="search" size="1rem" class="text-primary"/>
                </span>
              </div>
            </div>
          </div>
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <div>
                <router-link
                  to="/news"
                  class="d-block border-start border-primary border-3 py-2 px-4 text-decoration-none mb-3 bg-light text-dark">
                  Semua
                </router-link>
                <router-link
                  :to="{path: '/news', query: {category: 1}}"
                  class="d-block border-start border-danger border-3 py-2 px-4 text-decoration-none mb-3 bg-light text-dark">
                  Dasar Safety
                </router-link>
                <router-link
                  :to="{path: '/news', query: {category: 2}}"
                  class="d-block border-start border-success border-3 py-2 px-4 text-decoration-none mb-3 bg-light text-dark">
                  Obat-Obatan
                </router-link>
                <router-link
                  :to="{path: '/news', query: {category: 3}}"
                  class="d-block border-start border-warning border-3 py-2 px-4 text-decoration-none bg-light text-dark">
                  Alat Safety
                </router-link>
              </div>
            </div>
          </div>
          <div class="text-center">
            <router-link
              to="/news"
              class="text-decoration-none text-muted">
              <vue-feather type="arrow-left" size="1rem"/>
              <span class="ms-2">Kembali</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/api/Api'
import DateTimeViewComponent from '../../components/DateTimeViewComponent'

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/enduser/news/item')

export default {
  data: () => ({
    data: {},
    query: null,
    isLoading: true,
    error: null
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
    goSearch(){
      this.$router.replace({
        path: '/news',
        query: {
          search: this.query
        }
      })
    },

    load(){
      this.error = null
      this.isLoading = true
      const data = this.$route.query;
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null
        this.isLoading = false
        this.data = data
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>