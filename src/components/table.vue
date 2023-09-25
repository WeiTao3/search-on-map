<template>
  <div style="margin-left: 20px;">
    <div class="deleteButton">
        <button @click="deleteSelected" class="btn btn-danger">Delete Selected</button>
      </div>
    <table class="table tableItem">
      <thead>
        <tr>
          <th scope="col">Select</th>
          <th scope="col">History Place</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in paginatedRecords" :key="index">
          <td>
            <input type="checkbox" v-model="selectedRecords" :value="record.key">
          </td>
          <td>{{ record.position.formatted_address }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-3 pageButtons">
        <button @click="prevPage" :disabled="currentPage === 0" class="btn btn-primary pageButton1">Previous</button>
        <button @click="nextPage" :disabled="currentPage >= maxPage" class="btn btn-primary pageButton2">Next</button>
    </div>
  </div>
</template>
  
<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'locationTable',
  setup() {
    const store = useStore();

    const recordsPerPage = 10;  //  maximum of 10 records on each page
    let records = ref(computed(() => store.getters['getLocations']));  // get all the searched records from store
    // console.log("records: ", records.value);
    let selectedRecords = ref([]);
    const currentPage = ref(0);
    const maxPage = computed(() => Math.ceil(records.value.length / recordsPerPage) - 1);

    // display the searched places in the table
    const paginatedRecords = computed(() => {
      const start = currentPage.value * recordsPerPage;
      const end = start + recordsPerPage;
      return records.value.slice(start, end);
    });

    // delete the selected places from store, and update store
    const deleteSelected = () => {
      let new_records = records.value.filter(record => !selectedRecords.value.includes(record.key));
      store.dispatch('updateLocation', new_records);
      records.value = computed(() => store.getters['getLocations']);
      selectedRecords.value = [];
    };

    const nextPage = () => {
      if (currentPage.value < maxPage.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 0) {
        currentPage.value -= 1;
      }
    };

    return {
      records,
      paginatedRecords,
      selectedRecords,
      currentPage,
      maxPage,
      deleteSelected,
      nextPage,
      prevPage,
    };
  },
};
</script>
  
<style>
.deleteButton {
  position: relative;
  float: left;
}
.tableItem {
  position: relative;
}
.pageButtons {
  position: absolute;
  bottom: 0;
  right: 0;
}
.pageButton1 {
  background-color: rgba(0, 160, 175, 1) !important;
    border-color: rgba(0, 160, 175, 1) !important;
}
.pageButton1:hover, 
.pageButton1:focus, 
.pageButton1:active {
    background-color: rgba(0, 130, 145, 1) !important;
    border-color: rgba(0, 130, 145, 1) !important;
}
.pageButton2 {
  background-color: rgba(246, 140, 52, 1) !important;
    border-color: rgba(246, 140, 52, 1) !important;
}
.pageButton2:hover, 
.pageButton2:focus, 
.pageButton2:active {
    background-color: rgba(216, 110, 22, 1) !important;
    border-color: rgba(216, 110, 22, 1) !important;
}
</style>