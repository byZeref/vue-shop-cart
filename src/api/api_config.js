import axios from "axios";

const url = 'src/api/api.json'

const api_config = axios.create({
    baseURL: url,
})

export default api_config