import { FileUploadResponse } from "../types";
import API from "../utils/axios";

export function uploadFile(file: Blob) {
    let form = new FormData();
    form.append("file", file);
    return API.post<FileUploadResponse>("/upload", form)
}