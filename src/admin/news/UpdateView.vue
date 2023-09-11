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
        to="/admin/news"
        class="btn btn-danger">
        <vue-feather type="arrow-left" size="1rem"/>
        <span class="ms-1">
          Kembali
        </span>
      </router-link>
    </div>
    <div v-else class="card card-primary mb-4 shadow-sm">
      <div class="card-header">
        Edit Traning Online
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div v-if="updateError" class="alert alert-warning d-flex w-100 align-items-center mb-4">
            <vue-feather type="info" size="1rem"/>
            <div className='flex-fill ms-3'>
              {{updateError.message}}
            </div>
          </div>
          <div class="row">
            <div class="col-4 mb-4">
              <label class="form-label">
                Title
              </label>
              <input v-model="params.title" type="text" class="form-control"/>
            </div>
            <div class="col-4 mb-4">
              <label class="form-label">
                Kategori
              </label>
              <select
                v-model="params.category"
                class="form-select">
                <option value="">...</option>
                <option value="1">Dasar Safety</option>
                <option value="2">Obat-Obatan</option>
                <option value="3">Alat Safety</option>
              </select>
            </div>
            <div class="col-4 mb-4">
              <label class="form-label">
                Gambar
              </label>
              <input @change="image($event)" type="file" accept="image/*" class="form-control" title="Pilih gambar..."/>
            </div>
            <div class="col-12 mb-4">
              <label class="form-label">
                Keterangan
              </label>
              <textarea v-model="params.description" class="form-control"/>
            </div>
            <div class="col-12 mb-4">
              <label class="form-label">
                Kontent
              </label>
              <div>
                <QuillEditor v-model:content="params.content" contentType="html" theme="snow" toolbar="essential" style="min-height:15rem;"/>
              </div>
            </div>
            <div class="col-12">
              <div class="text-end">
                <router-link
                  to="/admin/news"
                  class="btn btn-outline-primary">
                  <vue-feather type="arrow-left" size="1rem"/>
                  <span class="ms-1">
                    Kembali
                  </span>
                </router-link>
                <button
                  @click="update"
                  class="btn btn-primary ms-2">
                  <div v-if="isUpdateLoading" class="spinner-border spinner-border-sm text-white"/>
                  <vue-feather v-else type="check" size="1rem" class="text-white"/>
                  <span class="ms-1">
                    Simpan
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <OverlayComponent :isVisible="isUpdateLoading"/>
    </div>
    <div class="text-center mt-4">
      <small class="text-muted">
        Copyright &copy; 2022 Novita Anggraini.
      </small>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import Api from '../../utils/api/Api'
import OverlayComponent from '../../components/OverlayComponent.vue'

let _apiFetcher = null
let _apiRequest = Api.createGetRequest('/admin/news/item')
let _apiUpdateRequest = Api.createUploadRequest('/admin/news/update')

export default {
  data: () => ({
    data: {},
    params: {
      title: "",
      category: "",
      image: null,
      description: "",
      content: ""
    },
    isLoading: false,
    error: null,
    isUpdateLoading: false,
    updateError: null
  }),

  components: {
    QuillEditor,
    OverlayComponent
  },

  mounted(){
    this.load();
  },

  unmounted(){
    _apiFetcher && _apiFetcher.cancel()
    _apiFetcher = null
  },

  methods: {
    image(e){
      this.params.image = e.target.files[0]
    },

    load(){
      this.error = null
      this.isLoading = true
      const data = this.$route.query;
      _apiFetcher = _apiRequest.fetch({data}).safeThen(({data}) => {
        _apiFetcher = null
        this.isLoading = false
        this.data = data
        this.params = {
          title: data.title,
          category: data.category_id,
          description: data.description,
          content: data.content
        }
      }).catch(error => {
        _apiFetcher = null
        this.isLoading = false
        this.error = error
      })
    },

    update(){
      this.updateError = null
      this.isUpdateLoading = true
      const data = {
        ...this.params,
        id: this.data.id
      }
      _apiFetcher = _apiUpdateRequest.fetch({data}).safeThen(() => {
        _apiFetcher = null
        this.isUpdateLoading = false
        this.$router.replace('/admin/news')
      }).catch(error => {
        _apiFetcher = null
        this.isUpdateLoading = false
        this.updateError = error
      })
    }
  }
}
</script>