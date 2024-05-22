import axios from 'axios'

//criando uma regra para o axios
export default axios.create({
    baseURL: "http://localhost:5000"

})