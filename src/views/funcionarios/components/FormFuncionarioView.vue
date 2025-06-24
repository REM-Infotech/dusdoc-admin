<script setup lang="ts">
import { api } from "@/main";
import { isAxiosError } from "axios";
import { BButton, BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
import { reactive, watch } from "vue";

const Form = reactive({
  nome: "",
  email: "",
  cpf: "",
  departamento: "",
  cargo: "",
  empresa: "",
});

watch(
  () => ({ ...Form }),
  (newForm) => {
    if (newForm.cpf) {
      Form.cpf = newForm.cpf
        .replace(/[^\d]/g, "")
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (newForm.nome) {
      Form.nome = newForm.nome.toUpperCase();
    }
    if (newForm.email) {
      Form.email = newForm.email.toLowerCase();
    }
    if (newForm.departamento) {
      Form.departamento = newForm.departamento.toUpperCase();
    }
    if (newForm.cargo) {
      Form.cargo = newForm.cargo.toUpperCase();
    }
    if (newForm.empresa) {
      Form.empresa = newForm.empresa.toUpperCase();
    }
  },
  { deep: true },
);

async function handleSubmit(e: Event) {
  e.preventDefault();

  try {
    await api.post("/forms/funcionario/cadastro", Form);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.data && err.response.data.message) {
        const message = err.response.data.message;
        alert(message);
      }
    }
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
    as="form"
    no-footer
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
        <BFormGroup
          id="fieldset-departamento"
          label="Setor/Departamento"
          label-for="input-floating-departamento"
          floating
        >
          <BFormInput
            v-model="Form.departamento"
            id="input-floating-departamento"
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
      <hr />
      <div class="d-flex flex-column">
        <BButton type="submit" variant="success" size="lg">
          <strong> Salvar </strong>
        </BButton>
      </div>
    </form>
  </BModal>
</template>
