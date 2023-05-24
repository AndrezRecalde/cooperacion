import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

const gricApi = axios.create({
    baseURL: VITE_APP_URL,
});

gricApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization' : 'Bearer ' + localStorage.getItem("atf_token"),
        'Accept' : 'application/json',
    };
    return config;
});

export default gricApi;
