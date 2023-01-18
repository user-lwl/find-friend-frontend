export type User = {
    id: number,
    username: string | null,
    userAccount: string,
    avatarUrl: string | null,
    gender: number | null,
    userPassword?: string | null,
    phone: string | null
    email: string | null,
    userStatus: number,
    createTime: string,
    updateTime: string,
    isDelete?: number | null
    userRole: number,
    planetCode: string,
    tags: string | null
}

export type UserLogin = {
    userAccount: string,
    userPassword: string
}

export type UserRegister = {
    userAccount: string,
    userPassword: string,
    checkPassword: string,
    planetCode: string
}

export type FileUploadRequest = {
    file: Blob
}

export type FileUploadResponse = {
    filePath: string
}