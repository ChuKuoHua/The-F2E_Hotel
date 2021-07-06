<template>
  <div class="row g-0">
    <loading :active.sync="isLoading">
    </loading>
    <div
      class="col-12 col-md-4 imgs-area"
      v-for="item of hotelData"
      :key="item.id">
      <img :src="item.imageUrl" alt="room-img">
      <!-- <a class="d-none d-md-block" href="#" @click="goRoomPage(item.id)"></a> -->
      <div class="hotel-backdrop"></div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      url: `${process.env.VUE_APP_APIPATH}`,
      hotelData: [],
      isLoading: false,
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
          const data = res.data.items;
            data.forEach((item, i) => {
              if(i < 3){
                this.hotelData.push(item);
                // console.log(this.hotelData);
                this.isLoading = false
              }
            })
        })
    },
    goRoomPage(id) {
      this.$router.push(`/Roompage/${id}`);
    }
  },
}
</script>
