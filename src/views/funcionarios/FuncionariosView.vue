<script setup lang="ts">
import { pinia } from "@/main";
import manager from "@/resouces/socketio";
import funcionariosStore from "@/stores/funcionarios";
import { storeToRefs } from "pinia";
import { onBeforeMount, onUnmounted } from "vue";
import CardsView from "./components/CardsView.vue";

const { data } = storeToRefs(funcionariosStore(pinia));

const io = manager.socket("/admin_funcionarios_informacoes");
io.connect();

onBeforeMount(() => {
  io.emit("listagem_funcionarios", (dataReturn: Record<string, string[][]>) => {
    data.value = dataReturn.data;
  });
});

onUnmounted(() => {
  data.value = [];
});

io.on("update_data", () => {
  funcionarios_data_req();
});

function funcionarios_data_req() {
  io.emit("listagem_funcionarios", (dataReturn: Record<string, string[][]>) => {
    data.value = dataReturn.data;
  });
}
</script>

<template>
  <h1 class="mt-4 fw-bold text-body-secondary">Funcionários</h1>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Visão geral dos Funcionários</li>
  </ol>
  <CardsView />
</template>
