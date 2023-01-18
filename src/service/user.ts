import { User, UserLogin, UserRegister } from "../types";
import API from "../utils/axios";

function getCurrentUser() {
    return API.get<User>("/user/current");
}

function login(form: UserLogin) {
    return API.post<User>("/user/login", form)
}

function logout() {
    return API.post<void>("/user/logout")
}

function register(form: UserRegister) {
    return API.post<void>("/user/register", form)
}

function updateUser(form: User) {
    return API.post<void>("/user/update", form)
}

export { getCurrentUser, login, logout, register, updateUser };