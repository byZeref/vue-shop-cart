import { supabase } from '@/lib/supabaseClient.js'

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
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, img)

  return { data, error }
}