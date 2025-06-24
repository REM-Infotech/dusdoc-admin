<script setup lang="ts">
import { api } from "@/main";
import { BButton, BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { reactive, watch } from "vue";

const Form = reactive({
  nome: "",
  email: "",
  cpf: "",
  setor: "",
  cargo: "",
  empresa: "",
});

watch(
  () => Form.cpf,
  (newValue) => {
    Form.cpf = newValue
      .replace(/[^\d]/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },
);

watch(
  () => Form.nome,
  (newValue) => {
    Form.nome = newValue.toUpperCase();
  },
);

watch(
  () => Form.email,
  (newValue) => {
    Form.email = newValue.toLowerCase();
  },
);

watch(
  () => Form.email,
  (newValue) => {
    Form.email = newValue.toLowerCase();
  },
);

watch(
  () => Form.setor,
  (newValue) => {
    Form.setor = newValue.toUpperCase();
  },
);

watch(
  () => Form.cargo,
  (newValue) => {
    Form.cargo = newValue.toUpperCase();
  },
);

watch(
  () => Form.empresa,
  (newValue) => {
    Form.empresa = newValue.toUpperCase();
  },
);

async function handleSubmit(e: Event) {
  e.preventDefault();

  try {
    await api.post("/cadastro/funcionario", Form);
  } catch {
    //
  }
}
</script>

<template>
  <BModal
    size="lg"
    id="FormFuncionario"
    centered
    title="Cadastro de Funcionário"
    footer-class="d-flex"
  >
    <form @submit="handleSubmit">
      <div class="d-flex flex-column gap-4">
        <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
          <BFormInput
            v-model="Form.nome"
            id="input-floating-nome"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
        <BFormGroup id="fieldset-email" label="E-mail" label-for="input-floating-email" floating>
          <BFormInput
            v-model="Form.email"
            id="input-floating-email"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
        <BFormGroup id="fieldset-cpf" label="CPF" label-for="input-floating-cpf" floating>
          <BFormInput
            v-model="Form.cpf"
            id="input-floating-cpf"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
        <BFormGroup id="fieldset-setor" label="Setor" label-for="input-floating-setor" floating>
          <BFormInput
            v-model="Form.setor"
            id="input-floating-setor"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
        <BFormGroup
          id="fieldset-cargo"
          label="Cargo/Função"
          label-for="input-floating-cargo"
          floating
        >
          <BFormInput
            v-model="Form.cargo"
            id="input-floating-cargo"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
        <BFormGroup
          id="fieldset-empresa"
          label="Empresa"
          label-for="input-floating-empresa"
          floating
        >
          <BFormInput
            v-model="Form.empresa"
            id="input-floating-empresa"
            :state="null"
            trim
            placeholder="..."
          />
        </BFormGroup>
      </div>
    </form>

    <template #footer>
      <BButton type="submit" variant="success" size="lg"> Salvar </BButton>
    </template>
  </BModal>
</template>
