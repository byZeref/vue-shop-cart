import { toast } from 'vue3-toastify'

export const notifySuccess = () => {
  toast('Producto agregado correctamente!', {
    theme: 'light',
    type: 'success',
    pauseOnFocusLoss: false,
  })
}