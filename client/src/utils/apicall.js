import axios from "axios"

const api = axios.create({
    baseURL: "https://crm-project-9pob.onrender.com",
    withCredentials: true
})

// request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/login") &&
            !originalRequest.url.includes("/otp") &&
            !originalRequest.url.includes("/refresh")
        ) {

            originalRequest._retry = true;
            try {

                const res = await api.post("/refresh");

                const newToken = res.data.data.accessToken;

                localStorage.setItem("accessToken", newToken);

                api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
                
            } catch (err) {

                localStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);
export default api
