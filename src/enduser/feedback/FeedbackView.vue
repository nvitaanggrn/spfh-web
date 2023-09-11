<template>
  <div class="container py-4">
    <div class="row align-items-center justify-content-center">
      <div class="col-6">
        <div class="fs-1 mb-4">
          Kontak Kami
        </div>
        <div class="mb-2">
          <span>
            <vue-feather type="phone" size="1.5rem" class="text-primary me-2"/>
            0-800-1522-822
          </span>
          <span class="ms-3">
            <vue-feather type="inbox" size="1.5rem" class="text-primary me-2"/>
            customer@unicharm.co.id
          </span>
        </div>
        <div>
          Ngoro Industrial Park Lot D2 No. 1, Jarang Sari, Lolawang, Kec. Ngoro, Kabupaten Mojokerto, Jawa Timur 61385
        </div>
        <div class="mt-5">
          <small class="text-muted">
            Copyright &copy; 2022 Novita Anggraini.
          </small>
        </div>
      </div>
      <div class="col-6">
        <div class="card p-5 shadow-sm">
          <div class="text-center mb-4">
            <div class="fs-3">
              Kritik &amp; Saran
            </div>
          </div>
          <div v-if="error" class="alert alert-warning d-flex w-100 align-items-center mb-4">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{error.message}}
            </div>
          </div>
          <div v-if="isCreated" class="alert alert-success d-flex w-100 align-items-center mb-4">
            Terima kasih atas kritik dan saran yang telah anda berikan kepada kami, semoga dengan kritik dan saran yang anda berikan kami dapat memperbaikinya.
          </div>
          <form @submit.prevent class="mb-4">
            <div class="mb-4">
              <div class="input-group">
                <span class="input-group-text bg-transparent">
                  NIP
                </span>
                <div class="form-control">
                  {{$store.user.nip}}
                </div>
                <span class="input-group-text bg-transparent">
                  Nama
                </span>
                <div class="form-control">
                  {{$store.user.name}}
                </div>
              </div>
            </div>
            <div class="mb-4">
              <input v-model="data.title" type="text" class="form-control" placeholder="Perihal..."/>
            </div>
            <div>
              <textarea v-model="data.description" class="form-control" rows="5" placeholder="Komentar..."/>
            </div>
          </form>
          <div class="text-end">
            <button
              @click="create"
              class="btn btn-primary ms-2">
              <div v-if="isLoading" class="spinner-border spinner-border-sm text-white"/>
              <vue-feather v-else type="check" size="1rem" class="text-white"/>
              <span class="ms-1">
                Kirim
              </span>
            </button>
          </div>
          <OverlayComponent :isVisible="isLoading"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/api/Api'
import OverlayComponent from '../../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createPostRequest('/enduser/feedback/create')

export default {
  data: () => ({
    data: {
      title: "",
      description: ""
    },
    isCreated: false,
    isLoading: false,
    error: null
  }),

  components: {
    OverlayComponent
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel()
    _apiFetcher = null
  },

  methods: {
    create(){
      this.error = null
      this.isLoading = true
      this.isCreated = false
      const data = this.data
      _apiFetcher = _apiRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isCreated = true
        this.isLoading = false
        this.data = {}
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    }
  }
}
</script>