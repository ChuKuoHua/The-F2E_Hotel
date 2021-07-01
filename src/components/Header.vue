<template>
  <div>
    <Header class="d-flex d-md-block justify-content-between header">
      <router-link
        to="/">
        <h1 class="text-primary mb-3 mb-md-5 ms-4 pt-3 pt-md-4">Hotels.</h1>
      </router-link>
      
      <div class="d-none d-md-block">
        <ul class="menu">
          <li>
            <!-- <a class="text-secondary d-block" href="">Home</a> -->
            <router-link
              class="text-secondary d-block"
              :class="{'active': roterPath === '/'}"
              to="/">
              Home
            </router-link>
          </li>
          <li>
            <!-- <a class="text-secondary d-block" href="">Room for you</a> -->
            <router-link
              class="text-secondary d-block"
              :class="{'active': roterPath === '/allRooms'}"
              to="/allRooms">
              Room for you
            </router-link>
          </li>
        </ul>
        <div class="footer ms-4">
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
      </div>
      <div class="d-md-none pt-3 me-2">
        <button
          class="btn"
          @click.prevent="openMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </Header>
    <MenuSidebar></MenuSidebar>
  </div>
</template>

<script>
/* global $ */
import MenuSidebar from '@/components/MenuSidebar'

export default {
  components: {
    MenuSidebar,
  },
  data() {
    return{
      roterPath: this.$route.path
    }
  },
  mounted() {
    $('.menu li').click((e) => {
      setTimeout(() => {
        $(e.target).addClass('active');
        $(e.target).prevAll().removeClass("active").nextAll().removeClass("active");
        this.roterPath = '';
      },100)
    });
  },
  methods: {
    openMenu() {
      this.$bus.$emit('open-menu');
    },
  }
}
</script>
