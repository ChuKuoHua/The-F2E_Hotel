<template>
  <div
    class="aside position-relative"
  >
    <div class="m-menu-sidebar" @click.prevent="closeMenu">
    </div>
    <aside>
      <div
        class="d-flex justify-content-between align-items-center
          border-bottom border-2">
        <h2 class="text-light ms-3 pt-3">Hotels.</h2>
        <a href="#" class="m-close" id="m-close" @click.prevent="closeMenu">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <ul class="m-page--menu">
        <li>
          <!-- <a class="text-secondary d-block" href="">Home</a> -->
          <router-link
            class="d-block"
            to="/">
            Home
          </router-link>
        </li>
        <li>
          <!-- <a class="text-secondary d-block" href="">Room for you</a> -->
          <router-link
            class="d-block"
            to="/allRooms">
            Room for you
          </router-link>
        </li>
      </ul>
      <div class="footer ms-2 text-light">
        <p>
          <i class="fas fa-phone-alt me-1"></i>
          0212 504 5612</p>
        <p>
          <i class="fas fa-envelope me-1"></i>
          Hotels@Hotels.com
        </p>
        <p class="ps-4">Reservation Opening Hours</p>
        <p class="ps-4">Weekday 8am – 8pm</p>
        <p class="ps-4 mb-4">Weekend 9am – 6pm</p>
      </div>
    </aside>
  </div>
</template>
<script>
/* global $ */

export default {
  created(){
    this.$bus.$on('open-menu', () => {
      this.openMenu();
    });
  },
  beforeDestroy() {
    this.$bus.$off('open-menu', () => {
      this.openMenu();
    });
  },
  methods: {
    openMenu() {
      $('body').addClass('open');
      $('.aside').addClass('open');
      $('.m-menu-sidebar').addClass('active');
    },
    closeMenu() {
      $('body').removeClass('open');
      $('.aside').removeClass('open');
      $('.m-menu-sidebar').removeClass('active');
    },
  }
}
</script>