import { supabase } from '@/lib/supabaseClient.js'
import { file } from '@vueform/vueform'

/**
 * Retrieves all products from storage
 * @returns {object}
 */
export const getProductsService = async () => {
  const { data, error } = await supabase.from('products').select()

  return { data, error }
}

/**
 * Creates a new product
 * @param {object} product Product to create 
 * @returns {object}
 */
export const createProductService = async (product) => {
  const { status, error } = await supabase
    .from('products')
    .insert(product)

  return { status, error }
}

/**
 * Uploads an image of a product
 * @param {object} img Image object to upload
 * @param {string} fileName Image file name
 * @returns {object}
 */
export const uploadImageService = async (img, fileName) => {
  // get all existing files
  const { data: images, error: listImagesError } = await supabase.storage.from('images').list('products')
  if (listImagesError) return { error }

  console.log('images', images)
  const exists = images.some(file => file.name === fileName.substring(9)) // products/...
  
  if (exists) {
    // delete existing file
    const { data, error } = await supabase.storage.from('images').remove([fileName])
    if (error) return { error }
    console.log('file deleted', data)
  }

  // upload new image file
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, img)

  return { data, error }
}

/**
 * Edits data of a single product
 * @param {string} id 
 * @param {object} product 
 * @returns {object}
 */
export const updateProductService = async (id, product) => {
  const data = {
    name: product.name,
    price: product.price,
    stock: product.stock,
  }
  if (product.image) data['image'] = product.image

  const { status, error } = await supabase
    .from('products')
    .update(data)
    .eq('id', id)

  return { status, error }
}