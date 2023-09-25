<template>
    <GMapMap :zoom="this.$store.getters.getZoom" :center="this.$store.getters.getCenter" style="width:100%;  height: 600px;">
        <GMapMarker v-if="this.$store.getters.getMyPlace" :position="this.$store.getters.getMyPlace" icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            @click="center = this.$store.getters.getMyPlace">
        </GMapMarker>
        <GMapMarker :key="index" v-for="(loc, index) in this.$store.getters.getLocations"
            :position="{ lat: loc.position.geometry.location.lat(), lng: loc.position.geometry.location.lng() }"
            @click="center = { lat: loc.position.geometry.location.lat(), lng: loc.position.geometry.location.lng() }">
        </GMapMarker>
    </GMapMap>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'googleMap',
    methods: {
        ...mapActions(['getLocations', 'getCenter', 'getMyPlace', 'getZoom']),
    }
}
</script>