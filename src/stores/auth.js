import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const ls_item = `sb-${import.meta.env.VITE_PROJECT_DOMAIN}-auth-token`
  
  const user = ref(JSON.parse(localStorage.getItem(ls_item))?.user)
  const access_token = ref(JSON.parse(localStorage.getItem(ls_item))?.access_token)
  const refresh_token = ref(JSON.parse(localStorage.getItem(ls_item))?.refresh_token)
  const expires_at = ref(JSON.parse(localStorage.getItem(ls_item))?.expires_at)
  const expires_in = ref(JSON.parse(localStorage.getItem(ls_item))?.expires_in)
  const token_type = ref(JSON.parse(localStorage.getItem(ls_item))?.token_type)
  const isLogged = computed(() => user.value !== undefined)

  const isAdmin = computed(() => isLogged.value) // TODO arreglar mas adelante

  const login = (data) => {
    const { session } = data
    user.value = data.user
    access_token.value = session.access_token
    refresh_token.value = session.refresh_token
    expires_at.value = session.expires_at
    expires_in.value = session.expires_in
    token_type.value = session.token_type
  }

  const reset = () => {
    user.value = undefined
    access_token.value = undefined
    refresh_token.value = undefined
    expires_at.value = undefined
    expires_in.value = undefined
    token_type.value = undefined
    
    if (localStorage.getItem(ls_item)) localStorage.removeItem(ls_item)
  }

  return { user, isLogged, access_token, refresh_token, login, reset, isAdmin }
})