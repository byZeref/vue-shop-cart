import { Validator } from '@vueform/vueform'
import { getProductsService } from '@/services/products'

export const uniqueProduct = class extends Validator {
  get msg() {
    return 'Ya existe este producto'
  }

  get isAsync() {
    return true
  }

  async check(value) {
    const { data } = await getProductsService()
    const exists = data.some(product => product.name.toLowerCase() === value.toLowerCase())
    return !exists
  }
}