<template>
  <div id="app">
    <mapSearch />
    <div class="container">
      <div class="item1">
        <googleMap />
      </div>
      <div>  </div>
      <div class="item2">
        <locationTable />
      </div>
    </div>
  </div>
</template>

<script>
import mapSearch from "./components/mapSearch";
import locationTable from "./components/table";
import googleMap from "./components/googleMap";

export default {
  name: 'App',
  components: {
    mapSearch,
    locationTable,
    googleMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 25px;
}

.container {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.item1 {
  display: relative;
  left: 0;
  width: 100%;
}

.item2 {
  /* display: flex; */
  justify-content: center;
  width: 30%;
}
</style>
