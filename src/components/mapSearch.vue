<template>
  <div>
    <div>
      <h1 class="title">MAP <span id="S">S</span>EARCH</h1>
      <div class="container1">
        <div class="myLocationButton">
          <button @click="locateGeoLocation" class="custom-btn"><i class="bi bi-geo-alt-fill"></i> My
            Location</button>
        </div>
        <div class="container2">
          <div class="input-group" id="searchBar">
            <GMapAutocomplete @place_changed="initMarker" class="form-control rounded"
              style="box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">
            </GMapAutocomplete>
            <button @click="addLocationMarker" class="btn btn-outline-secondary rounded" id="searchButton">
              <i class="bi-search"></i>
            </button>
          </div>
          <div class="time">
            <div id="timeZone">Time Zone: {{ timeZone }}<br></div>
            <div id="localTime">Local Time: {{ localTime }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex'

export default {
  name: "mapSearch",
  data() {
    return {
      key: 0,
      curPlace: null,
      myPlace: null,
      timeZone: null,
      localTime: null,
    };
  },

  methods: {
    ...mapActions(['addLocation', 'getLocations', 'setCenter', 'setMyPlace', 'setZoom']),

    initMarker(loc) {
      this.curPlace = loc;
      // console.log("curPlace: ", this.curPlace);
    },

    async setTime(lat, lng) {
      // get time zone from google api
      let response = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=AIzaSyAa851YmYEhOxFnhW4SnREfI9OOLKAUVAg`);
      let data = response.data;
      this.timeZone = data.timeZoneId;

      // get local time from Date and google api
      let date = new Date();
      let utcDate = date.getTime() + (date.getTimezoneOffset() * 60000);
      this.localTime = new Date(utcDate + (1000 * data.rawOffset) + (1000 * data.dstOffset));
    },

    addLocationMarker() {
      if (this.curPlace) {
        try {
          // if the input place is a valid place, then label it on the map and add it to the store
          this.key += 1;
          let lat = this.curPlace.geometry.location.lat();
          let lng = this.curPlace.geometry.location.lng();
          this.setCenter({
            lat: lat,
            lng: lng
          });
          this.addLocation(this.curPlace);
          this.setMyPlace(null);
          // console.log("this.$store.state.locations: ", this.$store.state.locations);
          this.setTime(lat, lng);
          this.setZoom(10);
        } catch (error) {
          // console.log("There is an error: ", error);
          alert("Please select a location from related searches!");
        }
      }
    },

    // get the current location when render the web page
    locateGeoLocation: function () {
      try {
        if (this.myPlace === null) {
          navigator.geolocation.getCurrentPosition(res => {
            let lat = res.coords.latitude;
            let lng = res.coords.longitude;
            this.myPlace = {
              lat: lat,
              lng: lng
            };
          });
        }
        if (this.myPlace !== null) {
          this.setMyPlace({
            lat: this.myPlace.lat,
            lng: this.myPlace.lng
          });
          this.setCenter({
            lat: this.myPlace.lat,
            lng: this.myPlace.lng
          });
          this.setTime(this.myPlace.lat, this.myPlace.lng);
          this.setZoom(15);
        }
      } catch (error) {
        console.log("There is an error when get your location: ", error);
        // alert("Unable to get your location!");
      }
    }
  },

  // search the place when press down the "enter" on keyboard
  mounted() {
    this.locateGeoLocation();

    let vm = this;
    this.keydownHandler = function (event) {
      if (event.key === 'Enter') {
        vm.addLocationMarker();
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }
};
</script>

<style>
.title {
  font-size: 50px;
  font-style: italic;
  color: rgba(0, 160, 175, 1);
}

#S {
  color: rgba(246, 140, 52, 1);
}

#searchBar {
  margin: auto;
  width: 50%;
}

#searchButton {
  color: rgba(0, 160, 175, 1);
  border-style: none;
  font-size: 120%;
}

.custom-btn {
  color: rgba(0, 160, 175, 1);
  background-color: transparent;
  border: 1px solid rgba(0, 160, 175, 1);
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.custom-btn:hover {
  color: #fff;
  background-color: rgba(0, 160, 175, 1);
  border-color: rgba(0, 160, 175, 1);
}

.container1 {
  display: flex;
  justify-content: center;
  position: relative;
}

.myLocationButton {
  position: absolute;
  right: 80%;
  margin-right: 0px;
}

.container2 {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.time {
  justify-content: center;
  position: relative;
  text-align: left;
  margin-left: 26%;
  margin-top: 0.5pc;
  margin-bottom: 0.5pc;
}

#timeZone {
  color: rgba(0, 160, 175, 1);
  font-weight: 900;
}

#localTime {
  color: rgba(246, 140, 52, 1);
  font-weight: 900;
}
</style>