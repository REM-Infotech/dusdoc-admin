<template>
  <BModal size="lg" id="FormFuncionario" centered title="Cadastro de Funcionário">
    <form>
      <div class="row g-1">
        <div class="col-md-7 d-flex flex-column justify-content-center align-items-center">
          <div class="rounded rounded-4 border border-3 border-primary">
            <img
              id="fotoFuncionario"
              :src="src_file"
              alt="bottle"
              style="object-fit: contain; width: 300px; height: 300px"
            />
          </div>
          <div class="p-3">
            <BFormFile v-model="file">
              <template #label>
                <label for="fotoFuncionario" class="fw-bold">Foto Funcionário</label>
              </template>
            </BFormFile>
          </div>
        </div>
        <div class="col-md-5 d-flex flex-column gap-4">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput
              id="input-floating-nome"
              :state="null"
              trim
              placeholder="Enter your name please"
            />
          </BFormGroup>
          <BFormGroup
            id="fieldset-cod-funcionario"
            label="Cód. Funcionário"
            label-for="input-floating-cod-funcionario"
            floating
          >
            <BFormInput
              id="input-floating-cod-funcionario"
              :state="null"
              trim
              placeholder="Enter your name please"
            />
          </BFormGroup>
        </div>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import withouImage from "@/assets/img/withouImage.png";
const file = ref(null);

const src_file = computed(() => {
  if (!file.value) return withouImage;
  if (typeof file.value === "string") return file.value;
  return URL.createObjectURL(file.value);
});

import { BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { computed, ref } from "vue";
</script>
