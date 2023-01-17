import { AlertColor } from "@mui/material";

let callback = (type: AlertColor, message: string) => {
    console.warn(`Failed to popup notification ${message} since callback is not set!`)
};

export function setCallback(cb: (type: AlertColor, message: string) => void) {
    callback = cb;
}

export function setNotification(type: AlertColor, message: string) {
    callback(type, message)
}