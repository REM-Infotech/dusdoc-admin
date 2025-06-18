<script setup lang="ts">
import { computed, ref } from "vue";

import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
DataTable.use(DataTablesCore);

const data = [
  [1, 5]
]

const list = [
  { msg: "Bruce Lee" },
  { msg: "Jackie Chan" },
  { msg: "Chuck Norris" },
  { msg: "Jet Li" },
  { msg: "Kung Fury" },
];

const query = ref("");

const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value));
});
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-3">
      <div class="card" style="height: 75dvh">
        <div class="card-header d-flex">
          <span class="title align-items-center d-flex">
            <IBiPieChartFill />
            <span class="ms-1"> Categorias </span>
          </span>
          <div class="ms-auto">
            <input class="form-control" placeholder="Filtre aqui.." type="text" v-model="query" />
          </div>
        </div>
        <div class="card-body">
          <TransitionGroup name="slide-fade" class="list-group" tag="ul">
            <li
              class="list-group-item list-group-item-action"
              v-for="(item, index) in computedList"
              :key="index"
            >
              {{ item.msg }}
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="col-md-9 row card p-3">
      <div class="card-body rounded border border-circle">
        <DataTable :data="data" class="display table table-striped">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
