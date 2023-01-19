import { User, UserLogin, UserRegister } from "../types";
import API from "../utils/axios";

export function getCurrentUser() {
    return API.get<User>("/user/current");
}

export function login(form: UserLogin) {
    return API.post<User>("/user/login", form)
}

export function logout() {
    return API.post<void>("/user/logout")
}

export function register(form: UserRegister) {
    return API.post<void>("/user/register", form)
}

export function updateUser(form: User) {
    return API.post<void>("/user/update", form)
}

export function deleteUser(id: number) {
    return API.post<void>("/user/delete", id, {
        data: id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}