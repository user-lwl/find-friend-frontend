import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from 'react';
import { setCallback } from "../utils/notification";

export function Notification() {
    const [open, setOpen] = useState<boolean>(false);
    const [messageType, setMessageType] = useState<AlertColor>('info');
    const [message, setMessage] = useState<string>('');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const notificationCallback = (type: AlertColor, message: string) => {
        setMessageType(type);
        setMessage(message);
        setOpen(true);
    }

    setCallback(notificationCallback);


    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}