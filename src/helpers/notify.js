import { toast } from 'vue3-toastify'

export const notify = (type, msg, timeout = 5000) => {
  toast(msg, {
    theme: 'light',
    pauseOnFocusLoss: false,
    autoClose: timeout,
    type,
  })
}