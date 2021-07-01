<template>
  <div class="d-flex flex-column flex-md-row roombox">
    <loading :active.sync="isLoading">
    </loading>
    <nav class="w-5 bg-primary position-relative">
      <router-link
        :to="{
          name: 'Home'
        }">
        <h1 class="text-light mx-auto pt-3 pt-md-4">Hotels.</h1>
      </router-link>
      <div class="menu-btn">
        <button
          class="btn"
          @click.prevent="openMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>
    <MenuSidebar></MenuSidebar>
    <div class="w-95">
      <div class="row g-0">
        <div class="col-12" :class="{'col-md-9': isRre === true}">
          <Swiper class="room-swiper" ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="item of hotelImgs" :key=item.id>
              <img :src=item alt="imgs">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </Swiper>
        </div>
        <div
          class="d-none col-md-3 form-bg"
          :class="{'d-md-block': isRre === true}">
          <Rreserveform
            v-if="isLoading === false"
            :hotel-data="hotelData"></Rreserveform>
        </div>
      </div>
      <div class="room-content-box pb-2 pb-md-5">
        <h2 class="text-primary mb-3">{{ hotelData.name }}</h2>
        <div class="Rreserve">
          <button v-if="isRre === false" class="btn btn-primary" @click="openRreserve">
            Rreserve
          </button>
        </div>
        <section class="row g-0 mt-1 mt-md-5">
          <div
            class="d-block d-md-none col-md-12 form-bg mb-3"
            :class="{'d-md-block': isRre === true}">
            <Rreserveform
              v-if="isLoading === false"
              :hotel-data="hotelData"></Rreserveform>
          </div>
          <div class="col-12 col-md-4">
            <p class="px-3 px-md-5 text-primary">{{ hotelData.description}}</p>
          </div>
          <div class="col-12 col-md-4 room-description mb-2 mb-md-0">
            <div class="row g-0 row-cols-2 px-md-0 px-3">
              <div class="col">
                <small>Accommodated：</small>
                <br>
                <p>{{ description.GuestMax }} person</p>
              </div>
              <div class="col">
                <small>Bathroom：</small>
                <br>
                <p>{{ description.GuestMin }} room<p/>
              </div>
              <div class="col">
                <small>Bed type：</small>
                <br>
                <p v-if="description.Bed !== undefined && description.Bed.length > 0">{{ description.Bed[0] }} bed<p/>
              </div>
              <div class="col">
                <small>Room size：</small>
                <br>
                <p>{{ description.Footage }} m²<p/>
              </div>
              <div class="col">
                <small>Weekday Rate</small>
                <br>
                <p class="pricetxt">{{ hotelData.normalDayPrice | currency }} TWD / night<p/>
              </div>
              <div class="col">
                <small>Weekend Rate</small>
                <br>
                <p class="pricetxt">{{ hotelData.holidayPrice | currency }} TWD / night<p/>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 Amenities-area px-md-0 px-3">
            <small>Amenities</small>
            <div class="row g-0 row-cols-2 row-cols-md-3 mt-2 mt-md-0">
              <div
                class="col"
                :class="{'no-amenities': amenities['Wi-Fi'] === false}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="15.319"
                  viewBox="0 0 20 15.319">
                  <g
                    :class="{'no-amenities-svg': amenities['Wi-Fi'] === false}">
                    <path d="M13,14a14.025,14.025,0,0,0-9.874,4.162.426.426,0,1,0,.6.605A13.181,13.181,0,0,1,13,14.851a13.182,13.182,0,0,1,9.275,3.916.426.426,0,1,0,.6-.605A14.026,14.026,0,0,0,13,14Zm0,3.83a10.223,10.223,0,0,0-7.108,2.886.428.428,0,0,0,.6.612,9.329,9.329,0,0,1,13.019,0,.428.428,0,0,0,.6-.612A10.223,10.223,0,0,0,13,17.83Zm0,3.83a6.056,6.056,0,0,0-4.342,1.822.426.426,0,1,0,.6.605,5.234,5.234,0,0,1,7.487,0,.426.426,0,1,0,.6-.605A6.058,6.058,0,0,0,13,21.66Zm0,3.83A1.915,1.915,0,1,0,14.915,27.4,1.921,1.921,0,0,0,13,25.489Zm0,.851A1.064,1.064,0,1,1,11.936,27.4,1.057,1.057,0,0,1,13,26.34Z" transform="translate(-3 -14)"/>
                  </g>
                </svg>
                <span>Wi-Fi</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Television'] === false}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.01"
                  height="14.407"
                  viewBox="0 0 19.01 14.407">
                  <g
                    :class="{'no-amenities-svg': amenities['Television'] === false}">
                    <path d="M22.955,23.6a2.632,2.632,0,0,0,1.376-2.515c0-2.863-4-4.941-9.507-4.941s-9.5,2.078-9.5,4.941A2.632,2.632,0,0,0,6.7,23.6a.319.319,0,0,0,.218.025l1.96-.472a3.456,3.456,0,0,1-.831,1.387l-.016.019a4.675,4.675,0,0,0-1.362,3.375v2.3a.319.319,0,0,0,.319.319H22.668a.319.319,0,0,0,.319-.319v-2.3a4.674,4.674,0,0,0-1.362-3.374l-.017-.02a3.455,3.455,0,0,1-.831-1.386l1.96.472A.316.316,0,0,0,22.955,23.6Zm-1.831,1.356.017.02a4.021,4.021,0,0,1,1.207,2.957v1.98H7.3v-1.98A4.021,4.021,0,0,1,8.511,24.97l.016-.019A3.625,3.625,0,0,0,9.55,22.986l1.276-.307a.319.319,0,0,0,.223-.194,3.223,3.223,0,0,0-.155-2.564,8.236,8.236,0,0,1,1.756-.561l.29,1.066a.319.319,0,0,0,.308.235h3.2a.319.319,0,0,0,.308-.235l.287-1.057a8.284,8.284,0,0,1,1.721.554,3.222,3.222,0,0,0-.155,2.563.32.32,0,0,0,.223.194l1.276.307A3.622,3.622,0,0,0,21.124,24.951Zm-7.843-5.7a11.013,11.013,0,0,1,3.126.006l-.208.766H13.491ZM19.145,22.1a2.58,2.58,0,0,1,.323-2.113.319.319,0,0,0-.09-.465A9.338,9.338,0,0,0,14.826,18.5a9.337,9.337,0,0,0-4.552,1.018.319.319,0,0,0-.09.465,2.578,2.578,0,0,1,.322,2.113l-3.621.872a2.058,2.058,0,0,1-.926-1.891c0-2.453,3.811-4.3,8.868-4.3s8.866,1.85,8.866,4.3a2.058,2.058,0,0,1-.926,1.891Zm-4.32-.375a3.395,3.395,0,1,0,3.4,3.395A3.4,3.4,0,0,0,14.826,21.724Zm0,6.152a2.757,2.757,0,1,1,2.757-2.757A2.76,2.76,0,0,1,14.826,27.875Zm0-3.4a.643.643,0,1,0,.643.642A.643.643,0,0,0,14.826,24.476Zm0-.8a.4.4,0,1,0-.4-.4A.4.4,0,0,0,14.826,23.671Zm0,2.895a.4.4,0,1,0,.4.4A.4.4,0,0,0,14.826,26.566Zm1.447-1.448a.4.4,0,1,0,.4-.4A.4.4,0,0,0,16.274,25.118Zm-2.9,0a.4.4,0,1,0-.4.4A.4.4,0,0,0,13.378,25.118Zm2.776-.906a.4.4,0,1,0-.4-.4A.4.4,0,0,0,16.154,24.213Zm-2.615,1.811a.4.4,0,1,0,.4.4A.4.4,0,0,0,13.539,26.024Zm2.616,0a.4.4,0,1,0,.4.4A.4.4,0,0,0,16.155,26.024Zm-2.616-2.615a.4.4,0,1,0,.4.4A.4.4,0,0,0,13.539,23.409Z" transform="translate(-5.321 -16.139)"/>
                  </g>
                </svg>
                <span>Telephone</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Great-View'] === false}">
                <i class="fas fa-mountain"></i>
                <span>View</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Breakfast'] === false}">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.028"
                  height="14.5"
                  viewBox="0 0 20.028 14.5">
                  <g
                    :class="{'no-amenities-svg': amenities['Breakfast'] === false}">
                    <path d="M17.4,23.874h1.106a1.542,1.542,0,0,0,1.1-.47,1.613,1.613,0,0,0,.451-1.122,1.576,1.576,0,0,0-1.555-1.592h-.3V19.65H7.593v1.459a5.143,5.143,0,0,0,.218,1.481c-.2,0-.4-.022-.6-.022a9.459,9.459,0,0,0-3.47.655.8.8,0,0,0-.5.868l.029.194A8.124,8.124,0,0,0,1.73,25.347a.8.8,0,0,0-.252.714l.058.366A9.91,9.91,0,0,0,.292,27.485a.862.862,0,0,0-.188.947.8.8,0,0,0,.719.5H13.529a.8.8,0,0,0,.732-.507.86.86,0,0,0-.186-.945,9.818,9.818,0,0,0-.761-.671h4.224a1.061,1.061,0,0,0,.751-.31l.486-.486H19.4v-.531H15.781A5.168,5.168,0,0,0,17.4,23.874Zm.8-2.653h.308a1.045,1.045,0,0,1,1.024,1.061,1.083,1.083,0,0,1-.3.751,1.014,1.014,0,0,1-.724.31H17.7c.021-.045.045-.088.066-.133a5.041,5.041,0,0,0,.438-1.99ZM.583,28.233a.337.337,0,0,1,.069-.369,9.411,9.411,0,0,1,.982-.838l.218,1.382H.822a.265.265,0,0,1-.239-.175Zm1.425-2.239a.265.265,0,0,1,.08-.236,7.588,7.588,0,0,1,1.274-.913l.562,3.566H2.388Zm7.917,2.417H4.46l-.692-4.4a.265.265,0,0,1,.172-.292,8.992,8.992,0,0,1,6.546,0,.265.265,0,0,1,.172.292l-.69,4.4Zm2.07,0H10.5l.56-3.563a7.5,7.5,0,0,1,1.274.91.265.265,0,0,1,.08.236l-.379,2.417Zm1.772-.178a.265.265,0,0,1-.241.175h-.955l.21-1.327a9.318,9.318,0,0,1,.918.8A.334.334,0,0,1,13.767,28.233Zm4.155-2.1a.531.531,0,0,1-.374.157H12.905l.034-.212v-.053h5.092Zm-3.351-.645H12.8a.772.772,0,0,0-.114-.13A8.026,8.026,0,0,0,11.149,24.3l.032-.2a.8.8,0,0,0-.5-.868,9.4,9.4,0,0,0-2.29-.578,4.609,4.609,0,0,1-.265-1.534v-.929h9.552v.929a4.564,4.564,0,0,1-.4,1.884,4.654,4.654,0,0,1-2.706,2.483Z" transform="translate(-0.036 -14.436)"/><path d="M44.324,3.639c.2.18.31.284.31.509s-.106.329-.308.509a1.138,1.138,0,0,0-.486.9h.531c0-.223.106-.329.308-.509a1.138,1.138,0,0,0,.483-.9,1.138,1.138,0,0,0-.5-.91c-.2-.18-.31-.284-.31-.509s.106-.329.308-.509a1.138,1.138,0,0,0,.486-.9h-.531c0,.223-.106.329-.308.509a1.138,1.138,0,0,0-.488.9,1.138,1.138,0,0,0,.5.9Z" transform="translate(-32.203 -0.97)"/><path d="M52.648,3.338a1.138,1.138,0,0,0-.488.907h.531c0-.226.106-.329.31-.509a1.138,1.138,0,0,0,.488-.9A1.138,1.138,0,0,0,53,1.924c-.2-.18-.308-.287-.308-.509s.106-.329.31-.509a1.138,1.138,0,0,0,.483-.9h-.531c0,.223-.106.329-.31.509a1.138,1.138,0,0,0-.488.9,1.141,1.141,0,0,0,.488.907c.2.18.308.287.308.509S52.85,3.157,52.648,3.338Z" transform="translate(-38.33 0)"/>
                  </g>
                </svg>
                <span>Breakfast</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Conditioner'] === false}">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.383"
                  height="12"
                  viewBox="0 0 18.383 12">
                  <g
                    transform="translate(-1003 -611)"
                    :class="{'no-amenities-svg': amenities['Conditioner'] === false}">
                    <path d="M31.106,28H15.277A1.278,1.278,0,0,0,14,29.277v4.851A1.278,1.278,0,0,0,15.277,35.4h15.83a1.278,1.278,0,0,0,1.277-1.277V29.277A1.278,1.278,0,0,0,31.106,28Zm-15.83.511h15.83a.767.767,0,0,1,.766.766v3.574H14.511V29.277A.767.767,0,0,1,15.277,28.511Zm6.894,6.383H16.809v-.511H29.574v.511h-7.4Zm8.936,0H30.085V33.872H16.3v1.021H15.277a.767.767,0,0,1-.766-.766v-.766H31.872v.766A.767.767,0,0,1,31.106,34.894Z" transform="translate(989 583)"/><rect width="2.043" height="0.511" transform="translate(1004.277 614.319)"/><rect width="0.511" height="0.511" transform="translate(1006.83 614.319)"/><path d="M25.021,61h-.511a.578.578,0,0,1-.194.429,1.074,1.074,0,0,0,0,1.523.573.573,0,0,1,0,.859,1.065,1.065,0,0,0-.317.762h.511a.577.577,0,0,1,.194-.43,1.075,1.075,0,0,0,0-1.524.573.573,0,0,1,0-.859A1.063,1.063,0,0,0,25.021,61Z" transform="translate(981.553 558.426)"/><path d="M37.021,61h-.511a.578.578,0,0,1-.194.429,1.074,1.074,0,0,0,0,1.523.573.573,0,0,1,0,.859,1.065,1.065,0,0,0-.317.762h.511a.577.577,0,0,1,.194-.43,1.075,1.075,0,0,0,0-1.524.573.573,0,0,1,0-.859A1.063,1.063,0,0,0,37.021,61Z" transform="translate(972.617 558.426)"/><path d="M49.021,61h-.511a.578.578,0,0,1-.194.429,1.074,1.074,0,0,0,0,1.523.573.573,0,0,1,0,.859,1.065,1.065,0,0,0-.317.762h.511a.577.577,0,0,1,.194-.43,1.075,1.075,0,0,0,0-1.524.573.573,0,0,1,0-.859A1.063,1.063,0,0,0,49.021,61Z" transform="translate(963.681 558.426)"/><path d="M61.021,61h-.511a.578.578,0,0,1-.194.429,1.074,1.074,0,0,0,0,1.523.573.573,0,0,1,0,.859,1.065,1.065,0,0,0-.317.762h.511a.577.577,0,0,1,.194-.43,1.075,1.075,0,0,0,0-1.524.573.573,0,0,1,0-.859A1.063,1.063,0,0,0,61.021,61Z" transform="translate(954.745 558.426)"/><path d="M73.021,61h-.511a.578.578,0,0,1-.194.429,1.074,1.074,0,0,0,0,1.523.573.573,0,0,1,0,.859,1.065,1.065,0,0,0-.317.762h.511a.577.577,0,0,1,.194-.43,1.075,1.075,0,0,0,0-1.524.573.573,0,0,1,0-.859A1.063,1.063,0,0,0,73.021,61Z" transform="translate(945.809 558.426)"/>
                  </g>
                </svg>
                <span>Conditioner</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Smoke-Free'] === false}"
              >
                <i class="fas fa-smoking-ban"></i>
                <span>No Smoking</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Mini-Bar'] === false}"
              >
                <i class="fas fa-glass-martini-alt"></i>
                <span>Mini bar</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Refrigerator'] === false}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.202"
                  height="19.725"
                  viewBox="0 0 11.202 19.725">
                  <g
                    :class="{'no-amenities-svg': amenities['Refrigerator'] === false}">
                    <path d="M30.792,14a1.116,1.116,0,0,0-1.108,1.118V31.613a1.116,1.116,0,0,0,1.108,1.118h.31V33a.713.713,0,1,0,1.425,0v-.272H38.05V33a.713.713,0,1,0,1.425,0v-.272h.31a1.114,1.114,0,0,0,1.1-1.118V15.118A1.114,1.114,0,0,0,39.786,14Zm0,.435h8.994a.67.67,0,0,1,.666.683V31.613a.671.671,0,0,1-.666.683H30.792a.672.672,0,0,1-.674-.683v-9.2H40.445v-.442H30.118V15.118a.672.672,0,0,1,.674-.683Zm1.023,2.143a.712.712,0,0,0-.713.714v1.8a.717.717,0,1,0,1.433,0v-1.8a.718.718,0,0,0-.72-.714Zm0,.435a.273.273,0,0,1,.279.28v1.8a.269.269,0,0,1-.279.28.273.273,0,0,1-.279-.28v-1.8a.278.278,0,0,1,.279-.28Zm0,8.216a.711.711,0,0,0-.713.714v2.819a.717.717,0,0,0,1.433,0V25.944a.718.718,0,0,0-.72-.714Zm0,.435a.273.273,0,0,1,.279.28v2.819a.273.273,0,0,1-.279.28.278.278,0,0,1-.279-.28v-2.82a.278.278,0,0,1,.279-.279Zm-.279,7.067h.55V33a.269.269,0,0,1-.271.287A.28.28,0,0,1,31.536,33v-.272Zm6.949,0h.55V33a.274.274,0,0,1-.271.287A.28.28,0,0,1,38.485,33v-.272Z" transform="translate(-29.684 -14)"/>
                  </g>
                </svg>
                <span>Refrigerator</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Child-Friendly'] === false}"
              >
                <i class="fas fa-child"></i>
                <span>Kid - friendly</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Room-Service'] === false}"
              >
                <i class="fas fa-concierge-bell"></i>
                <span>Room service</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Sofa'] === false}"
              >
                <i class="fas fa-couch"></i>
                <span>Sofa</span>
              </div>
              <div
                class="col"
                :class="{'no-amenities': amenities['Pet-Friendly'] === false}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.187"
                  height="17.666"
                  viewBox="0 0 16.187 17.666">
                  <g
                    :class="{'no-amenities-svg': amenities['Pet-Friendly'] === false}">
                    <path d="M99.214,70.864c-.009-.122-.013-.244-.017-.374v-.028A2.163,2.163,0,0,0,97.378,68.3a3.148,3.148,0,0,0-2.572-.733L84.89,69.151l-.135.022L83.31,69.4v.24a3.489,3.489,0,0,0,1.809,3.324,8.715,8.715,0,0,0,4.148.759h1.575a.558.558,0,0,1,.507.792l-1.25,2.71a4.1,4.1,0,0,0-1.7.884A4.964,4.964,0,0,0,86.918,80.4H85.562v2.211a2.489,2.489,0,0,0,2.123,2.57l.008.012h6.655l.084-.12a5.261,5.261,0,0,0,.94-3.045,5.574,5.574,0,0,0-.046-.718h3.092V76.129a1.458,1.458,0,0,0,.608-.389,1.739,1.739,0,0,0,.469-1.13v-.017Zm-15.336-.981.877-.141v.914h-.772A4.08,4.08,0,0,1,83.878,69.883Zm2.247,11.076h.749a1.065,1.065,0,0,1-.749.781Zm7.93,3.669H87.985l0,0-.141,0a1.9,1.9,0,0,1-1.718-2.016v-.332a1.586,1.586,0,0,0,1.3-1.558v-.046a4.413,4.413,0,0,1,1.337-2.13,3.639,3.639,0,0,1,1.02-.621,3.345,3.345,0,0,1,2.554.03l.391.166V76.431A2.062,2.062,0,0,1,94.5,78.47v1.84l.017.047q.07.191.122.388a4.817,4.817,0,0,1,.115.562,4.992,4.992,0,0,1,.052.718A4.718,4.718,0,0,1,94.054,84.627Zm3.8-3.882H95.222a5.331,5.331,0,0,0-.156-.533V78.47a2.624,2.624,0,0,0-2.621-2.621h-.281v1.44a3.888,3.888,0,0,0-1.141-.171c-.086,0-.172,0-.257.009l1.1-2.374a1.12,1.12,0,0,0-1.017-1.59H89.268c-2.848,0-4.466-.6-5.091-1.946h1.141V69.652l9.577-1.533a2.6,2.6,0,0,1,1.662.285,2.266,2.266,0,0,0-1.39,1.886l0,.036c-.015.127-.028.247-.047.366l-.6,3.72,0,.033a1.569,1.569,0,0,0,1.4,1.707l1.938.039Zm.764-5.392a.954.954,0,0,1-.2.161.791.791,0,0,1-.443.116l-.12,0-1.917-.039a1.008,1.008,0,0,1-.864-1.105l.594-3.7c.021-.132.036-.264.051-.391l0-.036a1.608,1.608,0,0,1,1.421-1.5c.033,0,.067,0,.1,0a1.317,1.317,0,0,1,.843.366,1.8,1.8,0,0,1,.546,1.262v.028c0,.13.008.265.018.4l.28,3.7A1.175,1.175,0,0,1,98.62,75.353Z" transform="translate(-83.31 -67.523)"/><rect width="2.713" height="0.562" transform="translate(5.673 14.644)"/><rect width="2.669" height="0.562" transform="translate(8.287 16.441) rotate(-169.135)"/><rect width="0.75" height="0.842" transform="translate(5.304 12.751)"/><rect width="0.937" height="1.029" transform="translate(8.616 2.21)"/>
                  </g>
                </svg>
                <span>Pet - friendly</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Rreserveform from '@/components/Rreserveform'
import MenuSidebar from '@/components/MenuSidebar'

export default {
  components: {
    Swiper,
    SwiperSlide,
    Rreserveform,
    MenuSidebar,
  },
  data() {
    return{
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/room',
      roomId: `${this.$route.params.id}`,
      token: `${process.env.VUE_APP_TOKEN}`,
      hotelData: [],
      hotelImgs: [],
      description: [],
      amenities: [],
      isLoading: false,
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        spaceBetween: 30,
        effect: 'fade',
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      isRre: false,
    } 
  },
  created() {
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    this.getRoomData();
    this.$bus.$on('close-form', () => {
      this.cancelRreserve();
    });
  },
  beforeDestroy() {
    this.$bus.$off('close-form', () => {
      this.cancelRreserve();
    });
  },
  methods: {
    getRoomData(){
      this.isLoading = true;
      this.$http.get(`${this.url}/${this.roomId}`)
        .then((res) => {
          this.hotelData = res.data.room[0]
          this.hotelImgs = this.hotelData.imageUrl
          this.description = this.hotelData.descriptionShort
          this.amenities = this.hotelData.amenities
          // console.log(this.hotelData, this.amenities);
          this.isLoading = false;
        }).catch(() => {
          this.hotelData = []
        })
    },
    openMenu() {
      this.$bus.$emit('open-menu');
    },
    openRreserve(){
      this.isRre = true
    },
    cancelRreserve() {
      this.isRre = false
    },
  }
}
</script>
