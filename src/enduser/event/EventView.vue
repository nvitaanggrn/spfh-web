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
      <div v-for="item in data" :key="item.id" class="col-6 mb-4">
        <div class="card shadow-sm h-100">
          <table class="table table-borderless align-middle mb-0 h-100">
            <tbody>
              <tr>
                <td width="17.5%" :class="['text-center text-white', bgColor()]">
                  <div class="small text-uppercase">
                    {{item.schedule_date.month}}
                  </div>
                  <div class="fs-1 fw-bold">
                    {{item.schedule_date.day}}
                  </div>
                  <div class="fs-5">
                    {{item.schedule_date.year}}
                  </div>
                  <div class="small text-white-50">
                    {{item.schedule_date.time}}
                  </div>
                </td>
                <td class="px-3 py-4">
                  <div class="fs-5 fw-bold">
                    {{item.title}}
                  </div>
                  <div>
                    {{item.description}}
                  </div>
                  <div>
                    <a
                      target="_blank"
                      :href="item.link"
                      class="btn btn-outline-dark mt-3">
                      Gabung
                      <vue-feather type="arrow-right" size="1rem"/>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/enduser/event/all')
let _bgColorClasses = ['bg-primary', 'bg-info', 'bg-warning', 'bg-danger', 'bg-dark', 'bg-secondary']

export default {
  data: () => ({
    page: 0,
    take: 20,
    data: [],
    isLoading: false
  }),

  mounted(){
    this.loadData()
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel();
    _apiFetcher = null;
  },

  methods: {
    bgColor(){
      return _bgColorClasses[Math.floor(Math.random() * _bgColorClasses.length)]
    },

    loadData(){
      const data = {
        _page: this.page,
        _take: this.take
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