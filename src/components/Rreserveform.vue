<template>
  <div>
    <form  v-if="isSuccess === false" @submit.prevent="sentData">
      <div class="p-3 p-md-5">
        <div class="mb-4">
          <label
            for="name"
            class="form-label">Name</label>
          <input
            type="text"
            class="form-control fw-bolder"
            id="name"
            v-model="userName"
            :class="{'is-invalid': isInvalidName === true}"
            placeholder="Your name"
          >
          <div
            v-if="isInvalidName"
            :class="{'invalid-feedback': isInvalidName === true}">
            Please enter your name
          </div>
        </div>
        <div class="mb-4">
          <label
            for="phone"
            class="form-label">Phone number</label>
          <input
            type="tel"
            class="form-control fw-bolder"
            :class="{'is-invalid': isInvalidPhone === true}"
            id="phone"
            v-model="userPhone"
            placeholder="Phone number"
          >
          <div
            v-if="isInvalidPhone"
            :class="{'invalid-feedback': isInvalidPhone === true}">
            Please enter your contact number
          </div>
        </div>
        <div class="mb-4">
          <label
            for="checkTime"
            class="form-label">Check-in / Chenk-out time</label>
          <div @mouseup="roomTotal()">
            <HotelDatePicker
              :startDate="getStartDate()"
              :maxNights="10"
            />
          </div>
          <div
            v-if="isInvalidDate"
            :class="{
              'invalid-feedback': isInvalidDate === true,
              'd-block': isInvalidDate === true
            }">
            Please selection time
          </div>
        </div>
        <div class="mb-3 mb-md-5">
          <small class="total-txt">Total</small>
          <p class="float-end">{{ total }}</p>
          <div class="clearfix"></div>
        </div>
        <div class="d-flex justify-content-between">
          <p>
            <small>Check-in time：</small>
            <br>
            3pm - 9pm
          </p>
          <p>
            <small>Check-out time：</small>
            <br>
            10am
          </p>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary sub-btn
        w-50"
        :class="{'disabled': isSent === false}"
      >
        Rreserve
      </button>
      <button
        type="button"
        @click.prevent="cancelRreserve()"
        class="d-none d-md-block w-50
          btn btn-secondary cancel-btn">
        Cancel
      </button>
    </form>
    <div v-else>
      <div class="success-room">
        <svg
          class="mb-4"
          xmlns="http://www.w3.org/2000/svg"
          width="88.6"
          height="88.6"
          viewBox="0 0 88.6 88.6">
          <g transform="translate(251.3 -376.6)">
            <path class="a" d="M-207,376.6a44.385,44.385,0,0,0-44.3,44.3A44.385,44.385,0,0,0-207,465.2a44.385,44.385,0,0,0,44.3-44.3A44.385,44.385,0,0,0-207,376.6Zm0,85.6a41.312,41.312,0,0,1-41.3-41.3A41.312,41.312,0,0,1-207,379.6a41.312,41.312,0,0,1,41.3,41.3A41.312,41.312,0,0,1-207,462.2Z"/><path class="a" d="M-182.5,402.5-216,436l-15.4-15.5a1.45,1.45,0,0,0-2.1,0,1.45,1.45,0,0,0,0,2.1l16.5,16.6a1.5,1.5,0,0,0,1.1.4h0a2.1,2.1,0,0,0,1.1-.4l34.6-34.5a1.45,1.45,0,0,0,0-2.1A1.605,1.605,0,0,0-182.5,402.5Z"/>
          </g>
        </svg>
        <h4 class="mb-4 text-primary">Great !</h4>
        <p class="px-4 text-primary">The reserved has been finished. We hope to see you soon. Good trip !</p>
      </div>
      <button
        type="button"
        @click.prevent="cancelRreserve()"
        class="btn btn-primary cancel-btn w-100">
        You’ve reserved !
      </button>
    </div>
  </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker2'
import 'vue-hotel-datepicker2/dist/vueHotelDatepicker2.css';
import checkTime from '@/js/checkTime';

export default {
  components: {
    HotelDatePicker,
  },
  props:{
    hotelData: {
      type: Object,
      required: null,
    },
  },
  data(){
    return{
      total: 0,
      userName: '',
      userPhone: '',
      checkIn: '',
      checkOut: '',
      timeDiff: '',
      isInvalidName: false,
      isInvalidPhone: false,
      isInvalidDate: false,
      isSent: false,
      isSuccess: false,
      screenWidth: window.screen.width,
    }
  },
  created(){
  },
  watch:{
    userName() {
      if(this.userName === ''){
        this.isInvalidName = true
      } else {
        this.isInvalidName = false
      }
      this.checkForm();
    },
    userPhone() {
      const numberRule = /[0-9]+/;
      if(this.userPhone === '' || !numberRule.test(this.userPhone)){
        this.isInvalidPhone = true
      } else {
        this.isInvalidPhone = false
      }
      this.checkForm();
    },
  },
  methods:{
    getStartDate() {
      let now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
    },
    checkForm(){
      if(this.userName !== '' && this.userPhone !== ''){
        this.isSent = true
      } else {
        this.isSent = false
      }
    },
    roomTotal() {
      let timeDiff = ''
      window.setTimeout(( () => {
        let datepicker = document.getElementsByClassName('datepicker__input');
        if (this.screenWidth > 678) {
          this.checkIn = datepicker[0].innerHTML
          this.checkOut = datepicker[1].innerHTML
        } else if (this.screenWidth <= 678) {
          this.checkIn = datepicker[2].innerHTML
          this.checkOut = datepicker[3].innerHTML
        }
        console.log(datepicker);
        this.checkIn = this.checkIn.split(" ").join("")
        this.checkOut = this.checkOut.split(" ").join("")
        if(this.checkIn === 'Check-in' || this.checkOut === 'Check-out'){
          this.total = 0
        } else {
          timeDiff = checkTime(this.checkIn, this.checkOut);
          let day_list = ['7', '1', '2', '3', '4', '5', '6'];
          let checkInDay = day_list[new Date(this.checkIn).getDay()]
          if(checkInDay < '6'){
            this.total = this.hotelData.normalDayPrice * timeDiff
          } else {
            this.total = this.hotelData.holidayPrice * timeDiff
          }
          this.isInvalidDate = false;
        }
      }), 1500);
    },
    sentData(){
      if(this.checkIn === '' || this.checkOut === ''){
        this.isInvalidDate = true
      } else {
        const json = {
          user_name: this.userName,
          user_phone: this.userPhone,
          check_in: this.checkIn,
          check_out: this.checkOut,
          total: this.total
        }
        window.setTimeout(( () => {
          this.isInvalidDate = false
          this.isSuccess = true
          this.total = 0
          this.userName = ''
          this.userPhone = ''
        }), 500);
        console.log(json);
      }
    },
    cancelRreserve(){
      this.$bus.$emit('close-form');
      this.isSuccess = false;
    }
  }
}
</script>
