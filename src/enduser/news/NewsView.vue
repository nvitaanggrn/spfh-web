<template>
  <div class="container py-4">
    <div class="row align-items-center">
      <div class="col-8">
        <router-link
          to="/news"
          class="btn btn-outline-primary rounded-pill shadow me-2">
          <vue-feather type="tag" size="1rem" class="me-1"/>
          Semua
        </router-link>
        <router-link
          :to="{path: '/news', query: {category: 1, search: null}}"
          class="btn btn-outline-danger rounded-pill shadow me-2">
          <vue-feather type="tag" size="1rem" class="me-1"/>
          Dasar Safety
        </router-link>
        <router-link
          :to="{path: '/news', query: {category: 2, search: null}}"
          class="btn btn-outline-success rounded-pill shadow me-2">
          <vue-feather type="tag" size="1rem" class="me-1"/>
          Obat-Obatan
        </router-link>
        <router-link
          :to="{path: '/news', query: {category: 3, search: null}}"
          class="btn btn-outline-warning rounded-pill shadow">
          <vue-feather type="tag" size="1rem" class="me-1"/>
          Alat Safety
        </router-link>
      </div>
      <div class="col-4">
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
      </div>
    </div>
    <div v-if="category && data.length > 0" class="mb-4">
      <div class="text-center border-bottom">
        <span class="fs-3 fw-bold border-2 border-bottom border-primary pb-1">{{data[0].category_name}}</span>
      </div>
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
    <div class="row">
      <div v-for="item in data" :key="item.id" class="col-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="img">
            <img :src="item.image_url"/>
          </div>
          <div class="card-body">
            <div class="small">
              <router-link
                :to="{path: '/news', query: {category: item.category_id}}"
                class="text-muted">
                {{item.category_name}}
              </router-link> &middot; <DateTimeViewComponent :value="item.created_at" class="text-muted"/>
            </div>
            <div class="fs-4 fw-bold">
              {{item.title}}
            </div>
            <div>
              {{item.description}}
            </div>
            <div class="mt-3">
              <router-link
                :to="{path: '/news/item', query: {id: item.id}}"
                class="btn btn-outline-dark">
                Tampilkan
                <vue-feather type="arrow-right" size="1rem"/>
              </router-link>
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
let _apiRequest = Api.createGetRequest('/enduser/news/all')
let _bgColorClasses = ['bg-primary', 'bg-info', 'bg-warning', 'bg-danger', 'bg-dark', 'bg-secondary']

export default {
  data: () => ({
    page: 0,
    take: 20,
    data: [],
    query: null,
    search: null,
    category: null,
    isLoading: false
  }),

  components: {
    DateTimeViewComponent
  },

  mounted(){
    this.query = this.search = this.$route.query.search || null
    this.category = this.$route.query.category || null
    this.loadData()
  },

  updated(){
    let isReload = false
    const newSearch = this.$route.query.search || null
    const newCategory = this.$route.query.category || null
    if (newSearch != this.search) {
      this.query = newSearch
      this.search = newSearch
      isReload = true
    }
    if (newCategory != this.category) {
      this.category = newCategory
      isReload = true
    }
    if (isReload) {
      this.loadData()
    }
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  methods: {
    bgColor(){
      return _bgColorClasses[Math.floor(Math.random() * _bgColorClasses.length)]
    },

    goSearch(){
      this.$router.replace({
        path: '/news',
        query: {
          search: this.query,
          category: this.category
        }
      })
    },

    loadData(){
      const data = {
        _page: this.page,
        _take: this.take,
        search: this.search,
        category: this.category
      }
      this.isLoading = true
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
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

<style scoped>
.card > .img{
  height: 15rem;
  overflow: hidden;
}

.card > .img > img{
  width: 100%;
  object-fit: contain;
}
</style>