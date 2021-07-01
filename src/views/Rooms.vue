<template>
  <div class="row g-0">
    <loading :active.sync="isLoading">
    </loading>
    <Swiper
      class="rooms-swiper swiper"
      ref="mySwiper"
      :options="swiperOption">
      <swiper-slide
        class="position-relative"
        v-for="item of hotelData"
        :key=item.id>
        <img :src="item.imageUrl" alt="">
        <div class="screen"></div>
        <div class="hotel-content">
          <h2 class="text-center mb-5">{{item.name}}</h2>
          <div class="d-flex flex-column align-items-center">
            <p>
              <span>Weekday Rate</span>
              <br>
              {{item.holidayPrice | currency}} TWD / night
            </p>
            <p>
              <span class="text-left">Weekend Rate</span>
              <br>
              {{item.normalDayPrice | currency}} TWD / night
            </p>
            <button @click="goRoomPage(item.id)" class="btn btn-outline-light px-5 mt-5">More</button>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </Swiper>
    <!-- <div
      class="col-12 col-md-4 imgs-area"
      v-for="item of hotelData"
      :key="item.id">
      <img :src="item.imageUrl" alt="">
      <a href="#" @click="goRoomPage(item.id)">
        <div class="hotel-content">
          <h2 class="text-center mb-5">{{item.name}}</h2>
          <div class="d-flex flex-column align-items-center">
            <p>
              <span>Weekday Rate</span>
              <br>
              {{item.holidayPrice | currency}} TWD / night
            </p>
            <p>
              <span class="text-left">Weekend Rate</span>
              <br>
              {{item.normalDayPrice | currency}} TWD / night
            </p>
            <button @click="goRoomPage(item.id)" class="btn btn-outline-light px-5 mt-5">More</button>
          </div>
        </div>
      </a>
    </div> -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return{
      url: `${process.env.VUE_APP_APIPATH}`,
      hotelData: [],
      isLoading: false,
      swiperOption: {
        breakpoints: {
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
    } 
  },
  created(){
    this.getApi();
  },
  methods: {
    getApi(){
      this.isLoading = true

      this.$http.get(this.url)
        .then((res) => {
          const data = res.data.items
          this.hotelData = data
          this.isLoading = false
        })
    },
    goRoomPage(id) {
      this.$router.push(`/Roompage/${id}`);
    }
  }
}
</script>
