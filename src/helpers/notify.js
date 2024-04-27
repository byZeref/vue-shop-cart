import { toast } from 'vue3-toastify'

export const notify = (type) => {
  toast('Producto agregado correctamente!', {
    theme: 'light',
    pauseOnFocusLoss: false,
    type,
  })
}