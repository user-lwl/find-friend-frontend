import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { register } from "../../service/user";
import store from "../../redux";
import router from "../../router";
import { setNotification } from "../../utils/notification";

function Register() {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);


    const [usernameError, setUsernameError] = useState<string>(" ");
    const [passwordError, setPasswordError] = useState<string>(" ");
    const [planetCodeError, setPlanetCodeError] = useState<string>(" ");
    const [checkPasswordError, setCheckPasswordError] = useState<string>(" ");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [planetCode, setPlanetCode] = useState<string>("");


    const handleRegister = () => {
        setUsernameError(" ");
        setPasswordError(" ");
        setCheckPasswordError(" ");
        setPlanetCodeError(" ");

        if (username.length == 0) {
            return setUsernameError("用户名不能为空")
        }

        if (password.length == 0) {
            return setPasswordError("密码不能为空")
        }

        if (checkPassword.length == 0) {
            return setCheckPasswordError("确认密码不能为空")
        }

        if (planetCode.length == 0) {
            return setPlanetCodeError("星球编号不能为空")
        }

        if (password !== checkPassword) {
            setPasswordError("两次输入的密码不一致")
            return setCheckPasswordError("两次输入的密码不一致")
        }

        setIsProcessing(true);

        register({
            userAccount: username,
            userPassword: password,
            checkPassword: checkPassword,
            planetCode: planetCode
        }).then(() => {
            setIsProcessing(false);
            setNotification('success', "注册成功")
            router.navigate("/login")
        }).catch(e => {
            console.error(e);
            setNotification('error', e.description)
            setIsProcessing(false);
        })
    }

    const handleClearErrorUsername = () => {
        setUsernameError(" ");
    }

    const handleClearErrorPassword = () => {
        setPasswordError(" ");
    }

    const handleClearErrorCheckPassword = () => {
        setCheckPasswordError(" ");
    }

    const handleClearErrorPlanetCode = () => {
        setPlanetCodeError(" ");
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
            <Typography sx={{ m: 1 }} fontSize="large">注册 {import.meta.env.VITE_APP_TITLE} 账号</Typography>
            <TextField
                label="用户名"
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
                        handleRegister()
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
                        handleRegister()
                    }
                }}
            />
            <TextField
                label="确认密码"
                type="password"
                variant="standard"
                required
                error={checkPasswordError != " "}
                sx={{ m: 0.5, width: "240px" }}
                helperText={checkPasswordError}
                value={checkPassword}
                onChange={(e) => {
                    setCheckPassword(e.target.value)
                }}
                onClick={handleClearErrorCheckPassword}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        handleRegister()
                    }
                }}
            />
            <TextField
                label="星球编号"
                type="text"
                variant="standard"
                required
                error={planetCodeError != " "}
                sx={{ m: 0.5, width: "240px" }}
                helperText={planetCodeError}
                value={planetCode}
                onChange={(e) => {
                    setPlanetCode(e.target.value)
                }}
                onClick={handleClearErrorPlanetCode}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        handleRegister()
                    }
                }}
            />
            <LoadingButton loading={isProcessing} onClick={handleRegister} sx={{ m: 2, width: "240px" }} variant="contained" endIcon={<SendIcon />}>
                注册
            </LoadingButton>
        </Box>
    )
}

export default Register;