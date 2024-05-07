<script setup>
import { ref } from 'vue'

const form = ref()

const submit = () => {

}
</script>

<template>
  <main class="login-container">
    <h4 class="text-md text-slate-600">Introduzca sus credenciales para iniciar sesión</h4>
    <Vueform 
    class="form"
    ref="form"
    :endpoint="false"
    @submit="submit"
    :display-errors="false"
    >
      <TextElement
        class="field email"
        name="email"
        ref="email"
        placeholder="Email"
        size="lg"
      />
      <TextElement
        class="field password"
        name="password"
        ref="password"
        placeholder="Contraseña"
        size="lg"
      />
      
      <ButtonElement 
        full
        button-class="py-3"
        button-label="INICIAR SESIÓN"
        submits 
      />
    </Vueform>
  </main>
</template>

<style lang="css" scoped>
:deep(.vf-input-field) {
  padding-left: 40px !important;
}

.login-container {
  min-height: 70vh;
  align-content: center;
  h4 {
    max-width: 500px;
    margin: 0 auto 10px;
  }
  .form {
    max-width: 500px;
    margin: 0 auto;
    .field {
      position: relative;
      &::before {
        content: '';
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
      }
      &.email::before {
        background-image: url('/src/assets/icons/mail.svg');
        transform: translate(42%, 48%);
      }
      &.password::before {
        background-image: url('/src/assets/icons/lock.svg');
        transform: translate(45%, 45%);
      }
    }
  }
}
</style>
