<template>
  <div id="app">
    <router-view/>
    <ScrollTop :style="{ opacity: isOpacity }"/>
  </div>
</template>
<script>
import ScrollTop from '@/components/ScrollTop.vue';

export default {
  components: {
    ScrollTop
  },
  data() {
    return{
      isOpacity: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 150) {
        this.isOpacity = 1;
      } else {
        this.isOpacity = 0;
      }
    });
  },
}
</script>
