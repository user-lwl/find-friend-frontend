import { FileUploadResponse } from "../types";
import API from "../utils/axios";

function uploadFile(file: Blob) {
    let form = new FormData();
    form.append("file", file);
    return API.post<FileUploadResponse>("/upload", form)
}

export { uploadFile }