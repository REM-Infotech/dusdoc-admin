import { defineStore } from "pinia";
import { ref } from "vue";

const admissionalStore = defineStore("admissionalStore", () => {
  const cellFuncionario = ref<Record<string, string>>({});

  return { cellFuncionario };
});

export default admissionalStore;
