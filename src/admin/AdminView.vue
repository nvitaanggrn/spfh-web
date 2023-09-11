<template>
  <div class="header bg-white">
    <div class="container py-4">
      <div class="logo text-center">
        <img src="../assets/img/logo.svg" class="img-fluid"/>
      </div>
    </div>
  </div>
  <div class="subheader shadow-sm border-top border-bottom bg-white sticky-top">
    <div class="container d-flex">
      <ul class="nav mx-auto">
        <li class="nav-item">
          <router-link
            to="/admin"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path === '/admin'}">
            Beranda
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/form"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/form') === 0}">
            Hiyarihatto
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/event"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/event') === 0}">
            Traning Online
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/news"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/news') === 0}">
            Artikel &amp; Berita
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/feedback"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/feedback') === 0}">
            Kritik &amp; Saran
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/users"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/users') === 0}">
            Admin / Karyawan
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/profile"
            :class="{'nav-link px-4 small text-uppercase text-primary fw-bold': true, 'active': $route.path.indexOf('/admin/profile') === 0}">
            My Profil
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view/>
</template>

<style scoped>
.logo > img{
  height: 4rem;
}

.nav-link{
  padding-top: .875rem;
  padding-bottom: .875rem;
  border-bottom: solid 2px transparent;
  color: var(--bs-secondary) !important;
}

.nav-link:hover{
  color: var(--bs-primary) !important;
}

.nav-link.active{
  color: var(--bs-primary) !important;
  border-bottom-color: var(--bs-primary) !important;
}
</style>