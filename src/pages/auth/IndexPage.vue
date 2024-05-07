<script setup>
import { ref, watchEffect } from 'vue'
import { loginService } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { notify } from '@/helpers/notify'
import { NOTIFICATION, MESSAGES } from '@/utils/constants'
const { NOTIFY_SUCCESS } = NOTIFICATION
const { MSG_USER_LOGGED } = MESSAGES

const router = useRouter()
const authStore = useAuthStore()
const form = ref()
const email = ref()
const password = ref()

const submit = async () => {
  const { email, password } = form.value.data
  form.value.submitting = true
  const { data, error } = await loginService(email, password)
  form.value.submitting = false

  if (!error) {
    authStore.login(data)
    router.push({ name: 'products' })
    setTimeout(() => {
      notify(NOTIFY_SUCCESS, MSG_USER_LOGGED)
    }, 10)
  }
}

watchEffect(() => {
  if (email.value?.value) document.querySelector('.field.email').classList.add('has-content')
  else document.querySelector('.field.email')?.classList.remove('has-content')
  
  if (password.value?.value) document.querySelector('.field.password').classList.add('has-content')
  else document.querySelector('.field.password')?.classList.remove('has-content')
})
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
        name="email"
        ref="email"
        input-type="email"
        class="field email"
        placeholder="Email"
        size="lg"
      />
      <TextElement
        name="password"
        ref="password"
        input-type="password"
        class="field password"
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
  padding-left: 42px !important;
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
        transition: transform .3s ease;
      }
      &.email::before {
        background-image: url('/src/assets/icons/mail.svg');
        transform: translate(50%, 48%);
      }
      &.password::before {
        background-image: url('/src/assets/icons/lock.svg');
        transform: translate(52%, 45%);
      }

      &.has-content.email::before {
        transform: translate(50%, 70%);
      }
      &.has-content.password::before {
        transform: translate(52%, 68%);
      }
    }
  }
}
</style>
