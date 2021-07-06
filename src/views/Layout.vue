<template>
  <div class="row g-0">
    <Header class="col-12 col-md-2 position-relative"/>
    <router-view class="col-12 col-md-10"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'


export default {
  components: {
    Header,
  },
  data() {
    return{
      token: `${process.env.VUE_APP_TOKEN}`,
      isOpacity: 0,
    }
  },
  created() {
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
  },
  
}
</script>
