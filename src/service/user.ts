import { User, UserLogin, UserRegister } from "../types";
import API from "../utils/axios";

function getCurrentUser() {
    return API.get<User>("/user/current");
}

function login(form: UserLogin) {
    return API.post<User>("/user/login", form)
}

function logout() {
    return API.post<null>("/user/logout")
}

function register(form: UserRegister) {
    return API.post<null>("/user/register", form)
}

export { getCurrentUser, login, logout, register };