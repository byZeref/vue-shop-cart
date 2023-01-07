import api_config from "../api/api_config"

const api_request = async (products_arr) => {
    try {
        const res = await api_config.get()
        const { products } = res.data.results
        products.forEach(item => {
            products_arr.push(item)
        });
    } catch (error) {
        console.log('Error');
    }

}

export default api_request