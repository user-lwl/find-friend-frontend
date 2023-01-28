import { Page, User, UserLogin, UserRegister } from "../types";
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

export function matchUsers(num: number) {
    return API.get<User[]>("/user/match", {
        params: { num: num }
    })
}

export function recommendUsers(num: number) {
    return API.get<User[]>("/user/recommend", {
        params: { num: num }
    })
}

export function searchUsers(username: string) {
    return API.get<User[]>("/user/search", {
        params: { username: username }
    })
}

export function searchUsersByTags(tags: string[]) {
    return API.get<User[]>("/user/search/tags", {
        params: { tagNameList: tags.join(",") }
    })
}