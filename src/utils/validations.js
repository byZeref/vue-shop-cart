import { Validator } from '@vueform/vueform'
import { getProductsService } from '@/services/products'

export const uniqueProduct = class extends Validator {
  get msg() {
    return 'Ya existe este producto'
  }

  get isAsync() {
    return true
  }

  get product() {
    return this.attributes[0]
  }

  async check(value) {
    console.log('prod on validation', this.attributes)

    const { data } = await getProductsService()
    const exists = data.some(product => product.name.toLowerCase() === value.toLowerCase())
    return !exists
  }
}