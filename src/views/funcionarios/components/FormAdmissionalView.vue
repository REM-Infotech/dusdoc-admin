<script setup lang="ts">
import { BButton, BFormFile, BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { ref } from "vue";

const file = ref(null);

// const src_file = computed(() => {
//   if (!file.value) return withouImage;
//   if (typeof file.value === "string") return file.value;
//   return URL.createObjectURL(file.value);
// });

async function handleSubmit(e: Event) {
  e.preventDefault();
}
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
          <div>
            <BFormFile size="lg" v-model="file" label="Contrato de Trabalho" label-class="fw-bold">
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
