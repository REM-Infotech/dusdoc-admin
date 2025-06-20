import { defineStore } from "pinia";
import { ref } from "vue";

const funcionariosStore = defineStore("funcionariosStore", () => {
  const data = ref<string[][]>([]);

  return { data };
});

export default funcionariosStore;
