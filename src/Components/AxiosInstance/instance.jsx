import axios from 'axios';

const instance = axios.create({
    baseURL: "https://ecommerce-api.bridgeon.in"
});

export default instance;