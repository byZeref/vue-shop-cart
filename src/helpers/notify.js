import { toast } from 'vue3-toastify'

export const notify = (type, msg) => {
  toast(msg, {
    theme: 'light',
    pauseOnFocusLoss: false,
    type,
  })
}