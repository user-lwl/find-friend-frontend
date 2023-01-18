import { AlertColor } from "@mui/material";
import router from "../router";

let callback = (type: AlertColor, message: string) => {
    console.warn(`Failed to popup notification ${message} since callback is not set!`)
};

export function setCallback(cb: (type: AlertColor, message: string) => void) {
    callback = cb;
}

export function setNotification(type: AlertColor, message: string) {
    callback(type, message)
}

export function unauthorizedErrorHandler(err: any) {
    if (err && err.code === 40101) {
        setNotification('error', "您没有权限访问该内容！");
        router.navigate("/");
    }
    if (err && err.code == 40100) {
        setNotification('error', "您尚未登录，请先登录。");
        router.navigate("/login");
    }
    throw err;
}