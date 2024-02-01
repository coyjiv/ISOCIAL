import axios from "axios";

export const API_URL = 'https://65a48bd752f07a8b4a3d730a.mockapi.io'


export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("access")
    return config;
})

instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if (401 === error.response.status) {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            originalRequest._retry = true;
        }

        try {
            if (localStorage.getItem("refresh")) {
                const response = await axios.post(`${API_URL}/api/auth/refresh/`,
                    JSON.stringify(
                        {refresh: localStorage.getItem("refresh")}
                    ),
                    {headers: {'Content-Type': 'application/json'}}
                );

                if (response.status === 200) {
                    localStorage.setItem("access", response.data.access);
                    originalRequest.headers.Authorization = "Bearer " + response.data.access;
                    return axios(originalRequest);
                }
            }
            return Promise.reject();
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    } else {
        return Promise.reject(error);
    }
});