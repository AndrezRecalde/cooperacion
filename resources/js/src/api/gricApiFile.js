import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

const gricApiFile = axios.create({
    baseURL: VITE_APP_URL,
});

gricApiFile.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization' : 'Bearer ' + localStorage.getItem("atf_token"),
        'Accept' : 'application/json',
        'Content-Type': 'multipart/form-data'
    };
    return config;
});

export default gricApiFile;
