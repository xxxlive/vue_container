import axios from "axios";

import { BASE_URL } from "../../public/config";

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 50000
})



export default request