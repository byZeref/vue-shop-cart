import { supabase } from '@/lib/supabaseClient'
import { handleError } from '@/helpers/validations'

export const loginService = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('error on login', error);
    handleError(error)
  }

  return { data, error }
}

export const logoutService = async () => {
  const { error } = await supabase.auth.signOut()

  return { error }
}