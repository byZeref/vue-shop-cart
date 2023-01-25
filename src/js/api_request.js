import api_config from "../api/api_config"

const api_request = async (products_arr) => {
    try {
        const res = await api_config.get()
        const { products } = res.data.results
        products.forEach(item => {
            products_arr.push(item)
        });
        // sort by name (default)
        products_arr.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        })
    } catch (e) {
        console.log('Error');
    }

}

export default api_request