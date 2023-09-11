<template>
  <div class="container py-4">
    <div v-if="form.data.length > 0" class="row">
      <div class="d-flex align-items-center">
        <h3 class="my-4 flex-fill">
          Hiyarihatto
        </h3>
        <router-link
          to="/form"
          class="btn btn-sm btn-outline-dark">
          Tampilkan Semua
          <vue-feather type="list" size="1rem" class="ms-2"/>
        </router-link>
      </div>
      <div v-for="item in form.data" :key="item.id" class="col-3 mb-4">
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
                  <vue-feather type="info" size="1rem"/>
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
          </div>
        </div>
      </div>
    </div>

    <div v-if="event.data.length > 0" class="row">
      <div class="d-flex align-items-center">
        <h3 class="my-4 flex-fill">
          Traning Online
        </h3>
        <router-link
          to="/event"
          class="btn btn-sm btn-outline-dark">
          Tampilkan Semua
          <vue-feather type="list" size="1rem" class="ms-2"/>
        </router-link>
      </div>
      <div v-for="item in event.data" :key="item.id" class="col-6 mb-4">
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

    <div v-if="news.data.length > 0" class="row">
      <div class="d-flex align-items-center">
        <h3 class="my-4 flex-fill">
          Artikel &amp; Berita
        </h3>
        <router-link
          to="/news"
          class="btn btn-sm btn-outline-dark">
          Tampilkan Semua
          <vue-feather type="list" size="1rem" class="ms-2"/>
        </router-link>
      </div>
      <div v-for="item in news.data" :key="item.id" class="col-4 mb-4">
        <div class="news card h-100 shadow-sm">
          <div class="img">
            <img :src="item.image_url"/>
          </div>
          <div class="card-body">
            <div class="small">
              <router-link
                :to="{path: '/news', query: {category: item.category_id}}"
                class="text-muted">
                {{item.category_name}}
              </router-link> &middot;
              <DateTimeViewComponent :value="item.created_at" class="text-muted"/>
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

    <div class="text-center mt-4">
      <small class="text-muted">
        Copyright &copy; 2022 Novita Anggraini.
      </small>
    </div>
  </div>
</template>

<script>
import Api from '../utils/api/Api'
import DateTimeViewComponent from '../components/DateTimeViewComponent'

const _bgColorClasses = ['bg-primary', 'bg-info', 'bg-warning', 'bg-danger', 'bg-dark', 'bg-secondary']
const _api = {
  form: {
    fetcher: null,
    request: Api.createGetRequest('/enduser/form/all')
  },
  event: {
    fetcher: null,
    request: Api.createGetRequest('/enduser/event/all')
  },
  news: {
    fetcher: null,
    request: Api.createGetRequest('/enduser/news/all')
  }
};

export default {
  data: () => ({
    form: {
      data: [],
      isLoading: true
    },
    event: {
      data: [],
      isLoading: true
    },
    news: {
      data: [],
      isLoading: true
    }
  }),

  components: {
    DateTimeViewComponent
  },

  mounted(){
    this.load('form', 4);
    this.load('event', 4);
    this.load('news', 6);
  },

  unmounted(){
    Object.keys(_api).forEach(key => {
      _api[key].fetcher && _api[key].fetcher.cancel();
      _api[key].fetcher = null;
    });
  },

  methods: {
    load(key, take){
      const data = {_take: take};
      this[key].isLoading = true
      _api[key].fetcher = _api[key].request.fetch({data}).safeThen(({data}) => {
        _api[key].fetcher = null;
        this[key].isLoading = false
        this[key].data = data.splice(0, take)
      }).catch(() => {
        _api[key].fetcher = null;
        this[key].isLoading = true
      })
    },

    bgColor(){
      return _bgColorClasses[Math.floor(Math.random() * _bgColorClasses.length)]
    },
  }
}
</script>

<style scoped>
.news.card > .img{
  height: 15rem;
  overflow: hidden;
}

.news.card > .img > img{
  width: 100%;
  object-fit: contain;
}
</style>