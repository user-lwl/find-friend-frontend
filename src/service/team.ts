import { ListTeamRequest, Page, Team, TeamAddRequest, TeamUpdateRequest, TeamUserVo } from "../types";
import API from "../utils/axios";

export function addTeam(form: TeamAddRequest) {
    return API.post<number>("/team/add", form);
}

export function deleteTeam(id: number) {
    return API.post<void>("/team/delete", id, {
        data: id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}

export function getTeamById(id: number) {
    return API.get<Team>("/team/get", {
        params: {
            id: id
        }
    })
}

export function joinTeam(teamId: number, password: string) {
    return API.post<void>("/team/join", {
        teamId: teamId,
        password: password
    })
}

export function listTeam(form: ListTeamRequest) {
    return API.get<TeamUserVo>("/team/list", {
        params: form
    })
}

export function listCreatedTeam(form: ListTeamRequest) {
    return API.get<TeamUserVo>("/team/list/my/create", {
        params: form
    })
}

export function listJoinedTeam(form: ListTeamRequest) {
    return API.get<TeamUserVo>("/team/list/my/join", {
        params: form
    })
}

export function listTeamPaged(form: ListTeamRequest) {
    return API.get<Page<Team>>("/team/list/my/join", {
        params: form
    })
}

export function quitTeam(id: number) {
    return API.post<void>("/team/quit", {
        teamId: id
    })
}

export function updateTeam(form: TeamUpdateRequest) {
    return API.post<void>("/team/update", form)
}