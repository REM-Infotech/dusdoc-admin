<script setup lang="ts">
import { pinia } from "@/main";
import admissionalStore from "@/stores/admissional";
import { BButton, BFormFile, BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const file = ref(null);

const { cellFuncionario } = storeToRefs(admissionalStore(pinia));

async function handleSubmit(e: Event) {
  e.preventDefault();
}
const selected = ref(null);

const exFieldNamesOptions = [
  { item: "A", name: "Option A" },
  { item: "B", name: "Option B" },
];

watch(cellFuncionario, (newData) => {
  console.log(newData);
});
</script>

<template>
  <BModal
    size="lg"
    id="FormAdmissional"
    centered
    title="Admissão de Funcionário"
    footer-class="d-flex"
  >
    <form @submit="handleSubmit">
      <div class="row g-1">
        <div class="col-12 d-flex flex-column gap-4">
          <BFormSelect
            size="md"
            v-model="selected"
            :options="exFieldNamesOptions"
            value-field="item"
            text-field="name"
          >
            <template #first>
              <BFormSelectOption :value="null" disabled>
                -- Selecione um Funcionário --
              </BFormSelectOption>
            </template>
          </BFormSelect>
          <div>
            <BFormFile size="md" v-model="file" label="Contrato de Trabalho" label-class="fw-bold">
            </BFormFile>
          </div>
          <BFormGroup
            id="fieldset-prazo"
            label="Data Prazo"
            label-for="input-floating-prazo"
            label-class="mb-5"
            floating
          >
            <BFormInput
              type="date"
              id="input-floating-prazo"
              :state="null"
              trim
              placeholder="..."
            />
          </BFormGroup>
        </div>
      </div>
    </form>

    <template #footer>
      <BButton type="submit" variant="success" size="lg"> Salvar </BButton>
    </template>
  </BModal>
</template>
