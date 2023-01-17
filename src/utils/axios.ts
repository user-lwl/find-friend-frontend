import axios from 'axios';

class ApplicationError extends Error {
    constructor(public code: number, message: string, public description: string) {
        if (description != "") {
            message = `${message}: ${description}`
        }
        super(message)
        this.code = code;
        this.message = message;
        this.description = description;
        this.stack = new Error().stack;
    }
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    withCredentials: true
})

instance.interceptors.request.use(payload => {
    return payload;
}, err => {
    return err;
})

instance.interceptors.response.use(res => {
    return new Promise((resolve, reject) => {
        if (res.data.code != 0) {
            let error = new ApplicationError(res.data.code, res.data.message, res.data.description);
            reject(error);
        } else {
            resolve(res.data.data);
        }

    })
}, err => {
    return err;
})

export default instance;