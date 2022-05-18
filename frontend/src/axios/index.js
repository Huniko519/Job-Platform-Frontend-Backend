import axios from 'axios';
import {config} from '../config.js';

const API_URL = config.serverAddress;

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        config.url = API_URL + '/' + config.url;
        if (token) {
            config.headers = {
                'Authorization': `${token}`,
                'Accept': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios