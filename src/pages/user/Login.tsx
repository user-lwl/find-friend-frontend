import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { login } from "../../service/user";
import store from "../../redux";
import router from "../../router";
import { setNotification } from "../../utils/notification";

function Login() {
    const [isLoginProcessing, setIsLoginProcessing] = useState<boolean>(false);


    const [usernameError, setUsernameError] = useState<string>(" ");
    const [passwordError, setPasswordError] = useState<string>(" ");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        setUsernameError(" ");
        setPasswordError(" ");

        if (username.length == 0) {
            return setUsernameError("账号不能为空")
        }

        if (password.length == 0) {
            return setPasswordError("密码不能为空")
        }

        setIsLoginProcessing(true);

        login({
            userAccount: username,
            userPassword: password
        }).then((user) => {
            store.dispatch({
                type: "user/setUser",
                user: user
            })
            setIsLoginProcessing(false);
            setNotification('success', "登录成功")
            router.navigate("/")
        }).catch(e => {
            console.error(e);
            setNotification('error', e.description)
            setIsLoginProcessing(false);
        })
    }

    const handleClearErrorUsername = () => {
        setUsernameError(" ");
    }

    const handleClearErrorPassword = () => {
        setPasswordError(" ");
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            paddingTop="20px"
            height="80%"
        >
            <AccountCircleIcon fontSize="large" />
            <Typography sx={{ m: 1 }} fontSize="large">登录到 {import.meta.env.VITE_APP_TITLE}</Typography>
            <TextField
                label="账号"
                type="text"
                variant="standard"
                required
                error={usernameError != " "}
                sx={{ m: 0.5, width: "240px" }}
                helperText={usernameError}
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                onClick={handleClearErrorUsername}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        handleLogin()
                    }
                }}
            />
            <TextField
                label="密码"
                type="password"
                variant="standard"
                required
                error={passwordError != " "}
                sx={{ m: 0.5, width: "240px" }}
                helperText={passwordError}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                onClick={handleClearErrorPassword}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        handleLogin()
                    }
                }}
            />
            <LoadingButton loading={isLoginProcessing} onClick={handleLogin} sx={{ m: 2, width: "240px" }} variant="contained" endIcon={<SendIcon />}>
                登录
            </LoadingButton>
        </Box>
    )
}

export default Login;