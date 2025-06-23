<template>
  <BModal size="xl" id="FormFuncionario" centered title="BootstrapVue">
    <form>
      <BFormGroup id="fieldset-4" label="Name" label-for="input-floating-4" floating>
        <BFormInput id="input-floating-4" :state="null" trim placeholder="Enter your name please" />
      </BFormGroup>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BFormGroup, BFormInput, BModal } from "bootstrap-vue-next";
</script>
