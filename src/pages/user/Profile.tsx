import * as userAPI from '../../service/user';
import * as uploadAPI from '../../service/upload';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Avatar, Box, Button, CircularProgress, Stack, TextField, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import { setNotification, unauthorizedErrorHandler } from '../../utils/notification';
import router from '../../router';
import * as _ from 'lodash';
import UserProfile from '../../components/UserProfile';

function Profile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        userAPI.getCurrentUser().then((data) => {
            setUser(data);
        }).catch((err) => {
            console.error(err)
            if (err.code === 40100) {
                setNotification("error", "未登录，请先登录！")
                router.navigate("/login")
            } else {
                setNotification("error", "用户信息拉取失败，请刷新页面重试！")
            }
        })
    }, [])

    return (
        user ?
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                paddingTop="10px"
                height="60%"
            >
                <UserProfile user={user} editable={true} showSensitiveInformation={false} />
            </Box> : <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                paddingTop="20px"
                height="60%"
            >
                <CircularProgress />
            </Box>
    )
}

export default Profile;