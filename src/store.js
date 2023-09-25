import { createStore } from 'vuex'

export default createStore({
  state: {
    locations: [],
    center: { // default Toronto's lat and lng
        lat: 43.6532,
        lng: -79.3832
      },
    myPlace: null,
    mapZoom: 10,
    key: 0,
  },
  mutations: {
    addLocation(state, newLocation) {
        for(let i = 0; i < state.locations.length; i ++) {
            // check if the new location is already searched before
            if(state.locations[i].position.formatted_address === newLocation.formatted_address) {
                // move the searched location to the first position of the array, and return the function
                let temp = state.locations.splice(i, 1)[0];
                state.locations.unshift(temp);
                return;
            }
        }
        // add the new location to the first position of the array
        let location = { key: state.key, position: newLocation };
        state.locations.unshift(location);
        state.key += 1;
    },
    updateLocation(state, newLocations) {
        state.locations = newLocations
    },
    setCenter(state, newLocation) {
        state.center = newLocation
    },
    setMyPlace(state, newLocation) {
        state.myPlace = newLocation
    },
    setZoom(state, zoomNumber) {
        state.mapZoom = zoomNumber
    }
  },
  actions: {
    addLocation({ commit }, newLocation) {
        commit('addLocation', newLocation)
    },
    updateLocation({ commit }, newLocations) {
        commit('updateLocation', newLocations)
    },
    setCenter({ commit }, newLocation) {
        commit('setCenter', newLocation)
    },
    setMyPlace({ commit }, newLocation) {
        commit('setMyPlace', newLocation)
    },
    setZoom({ commit }, zoomNumber) {
        commit('setZoom', zoomNumber)
    },
  },
  getters: {
    getLocations(state) {
        return state.locations
    },
    getCenter(state) {
        return state.center
    },
    getMyPlace(state) {
        return state.myPlace
    },
    getZoom(state) {
        return state.mapZoom
    },
  }
});
