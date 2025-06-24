<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { pinia } from "@/main";
import manager from "@/resouces/socketio";
import funcionariosStore from "@/stores/funcionarios";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import { storeToRefs } from "pinia";
import FormAdmissionalView from "./FormAdmissionalView.vue";
import FormFuncionarioView from "./FormFuncionarioView.vue";
DataTable.use(DataTablesCore);

const { data } = storeToRefs(funcionariosStore(pinia));
const selectedItem = ref("");
const list = [{ msg: "Departamento" }, { msg: "Cargo" }, { msg: "Setor" }, { msg: "Empresa" }];

const query = ref("");
const clicked = ref(false);
const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value.toLowerCase()));
});

function classListItem(item: string) {
  return selectedItem.value === item ? "list-group-item active" : "list-group-item";
}
const io = manager.socket("/admin_funcionarios_informacoes");
io.connect();
async function funcionarios_data_req() {
  io.emit("listagem_funcionarios", (dataReturn: Record<string, string>[]) => {
    // Converte cada objeto em um array de strings (string[][])
    const formatted = Array.isArray(dataReturn)
      ? dataReturn.map((item) => Object.values(item).map(String))
      : [];
    data.value = formatted;
  });
}

watch(clicked, () => {
  funcionarios_data_req();
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
          <div class="d-flex ms-auto gap-2">
            <button class="btn btn-sm btn-outline-warning" @click="clicked = !clicked">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faRefresh"
                  class="me-1 rounded border border-1 p-1 border-warning"
                />
                <span class="align-self-center fw-bold">Recarregar Usuários</span>
              </span>
            </button>
            <!-- <button v-b-modal.FormAdmissional class="btn btn-sm btn-outline-blue-chill">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faPlus"
                  class="me-1 rounded border border-1 p-1 border-blue-chill"
                />
                <span class="align-self-center fw-bold">Nova Admissão</span>
              </span>
            </button> -->
            <button v-b-modal.FormFuncionario class="btn btn-sm btn-outline-primary">
              <span class="d-flex allign-items-center">
                <FontAwesomeIcon
                  :icon="faPlus"
                  class="me-1 rounded border border-1 p-1 border-primary"
                />
                <span class="align-self-center fw-bold">Cadastrar Funcionário</span>
              </span>
            </button>
          </div>
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
  <FormFuncionarioView />
  <FormAdmissionalView />
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
