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

export type Page<T> = {
    countId: string,
    current: number,
    hitCount: boolean,
    maxLimit: number,
    optimizeCountSql: boolean,
    orders: { asc: boolean, column: string }[],
    pages: number,
    records: T[],
    searchCount: boolean,
    size: number,
    total: number
}

export type TeamAddRequest = {
    description: string,
    expireTime: Date,
    maxNum: number,
    name: string,
    password: string,
    status: number,
    userId: number
}

export type TeamUpdateRequest = {
    description: string,
    expireTime: string,
    id: number,
    name: string,
    password: string,
    status: number
}

export type Team = {
    createTime: string,
    description: string,
    expireTime: string,
    id: number,
    isDelete: number,
    maxNum: number,
    name: string,
    password: string,
    status: number,
    updateTime: string,
    userId: number
}

export type UserVo = {
    avatarUrl: string,
    createTime: string,
    email: string,
    gender: number,
    id: number,
    phone: string,
    planetCode: string,
    tags: string,
    updateTime: string,
    userAccount: string,
    userRole: number,
    userStatus: number,
    username: string
}

export type TeamUserVo = {
    createTime: string,
    createUser: UserVo,
    description: string,
    expireTime: string,
    hasJoin: boolean,
    hasJoinNum: number,
    id: number,
    maxNum: number,
    name: string,
    status: number,
    updateTime: string,
    userId: number
}

export type ListTeamRequest = {
    id?: number,
    idList?: number[],
    searchText?: string,
    name?: string,
    description?: string,
    maxNum?: number,
    userId?: number,
    status?: number,
    pageSize?: number,
    pageNum?: number
}