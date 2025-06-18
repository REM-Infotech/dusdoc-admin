<script setup lang="ts">
import { computed, ref } from "vue";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import { watch } from "vue";
DataTable.use(DataTablesCore);

const data = ref<Array<string[]>>([]);
const selectedItem = ref("");
const list = [{ msg: "Departamento" }, { msg: "Cargo" }, { msg: "Setor" }, { msg: "Empresa" }];

const query = ref("");

const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value.toLowerCase()));
});

function classListItem(item: string) {
  console.log(selectedItem.value);

  return selectedItem.value === item ? "list-group-item active" : "list-group-item";
}

watch(selectedItem, () => {
  data.value = [["nicholas azevedo", "mail.google.com", "009"]];
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
              :class="classListItem(item.msg)"
              v-for="(item, index) in computedList"
              :key="index"
              @click="selectedItem = item.msg"
            >
              {{ item.msg }}
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="card" style="height: 75dvh">
        <div class="card-header d-flex justify-content-between">
          <span class="fw-semibold"> Lista De Funcionários </span>
          <button class="btn btn-sm btn-outline-primary ms-auto">
            <span class="d-flex allign-items-center">
              <FontAwesomeIcon
                :icon="faPlus"
                class="me-1 rounded border border-1 p-1 border-primary"
              />
              <span class="align-self-center">Cadastrar Funcionário</span>
            </span>
          </button>
        </div>
        <div class="card-body">
          <DataTable
            :data="data"
            class="display table table-striped table-hover"
            :options="{
              pageLength: 10,
              lengthChange: false, // Remove a opção de alterar quantidade por página
            }"
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código Identificação</th>
                <th>Email</th>
              </tr>
            </thead>
          </DataTable>
        </div>
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
