import * as userAPI from '../../service/user';
import * as uploadAPI from '../../service/upload';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Avatar, Box, Button, CircularProgress, Stack, TextField, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import { setNotification, unauthorizedErrorHandler } from '../../utils/notification';
import router from '../../router';
import * as _ from 'lodash';

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        userAPI.getCurrentUser().then((data) => {
            setUser(data);
            if (data.tags) {
                let parsedTags = JSON.parse(data.tags);
                setTags(parsedTags);
            }
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length != 1) {
            return;
        }
        let fileType = e.target.files[0].type;
        let reader = new FileReader();
        reader.onload = () => {
            if (reader.result == null) {
                return;
            }
            const blob = new Blob([reader.result], {
                type: fileType
            });
            if (blob.size > 1024 * 1024 * 5) {
                setNotification('error', "文件不得大于5MB")
                return;
            }
            if (user != null) {
                uploadAPI.uploadFile(blob).then((res) => {
                    setUser({
                        ...user,
                        avatarUrl: res.filePath
                    })
                }).catch(unauthorizedErrorHandler)
            }
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    const handleTagAdd = () => {
        setTags([...tags, tag])
        setTag("")
    }

    const handleTagDelete = (tag: string) => {
        setTags(tags.filter((val) => tag !== val))
    }

    const handleProfileUpdate = () => {
        if (user) {
            setUser({ ...user, tags: JSON.stringify(tags) })
            let form = _.cloneDeepWith(user);
            form.tags = JSON.stringify(tags);
            userAPI.updateUser(form).then(() => {
                setNotification("success", "用户信息更新成功")
            }).catch((err) => {
                setNotification("error", `用户信息更新失败: ${err.message}`)
            })
        }
    }


    return (
        user ? <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            paddingTop="10px"
            height="60%"
        >
            <Stack
                maxWidth="440px"
                padding="10px"
                direction="column"
                alignItems="center"
                spacing={2}
            >
                <Avatar sx={{ width: 140, height: 140 }} src={user.avatarUrl ? user.avatarUrl : ""} />
                <Button variant='contained' component="label">
                    上传头像
                    <input onChange={handleFileSelect} hidden accept="image/*" type="file" />
                </Button>
                <TextField
                    label="账号"
                    type="text"
                    variant="standard"
                    required
                    sx={{ width: "240px" }}
                    disabled
                    value={user.userAccount}
                />
                <TextField
                    label="星球编号"
                    disabled
                    type="text"
                    variant="standard"
                    sx={{ width: "240px" }}
                    value={user.planetCode}
                />
                <FormControl sx={{ marginTop: "32px!important", width: "240px" }}
                >
                    <InputLabel id="gender-select">性别</InputLabel>
                    <Select
                        labelId="gender-select"
                        label="性别"
                        value={user.gender ? user.gender : 0}
                        size="small"
                        autoWidth
                        onChange={(e) => {
                            if (user && typeof e.target.value == 'number') {
                                setUser({ ...user, gender: e.target.value })
                            }
                        }}
                    >
                        <MenuItem value={0}>
                            请选择性别
                        </MenuItem>
                        <MenuItem value={1}>男</MenuItem>
                        <MenuItem value={2}>女</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="用户名"
                    type="text"
                    variant="standard"
                    sx={{ width: "240px" }}
                    value={user.username}
                    onChange={(e) => {
                        if (user) {
                            setUser({ ...user, username: e.target.value })
                        }
                    }}
                />
                <TextField
                    label="手机号"
                    type="tel"
                    variant="standard"
                    sx={{ width: "240px" }}
                    value={user.phone}
                    onChange={(e) => {
                        if (user) {
                            setUser({ ...user, phone: e.target.value })
                        }
                    }}
                />
                <TextField
                    label="E-Mail"
                    type="email"
                    variant="standard"
                    sx={{ width: "240px" }}
                    value={user.email}
                    onChange={(e) => {
                        if (user) {
                            setUser({ ...user, email: e.target.value })
                        }
                    }}
                />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "240px" }}
                >
                    <TextField
                        label="输入标签"
                        type="text"
                        variant="standard"
                        value={tag}
                        onChange={(e) => {
                            setTag(e.target.value)
                        }}
                        sx={{ width: "140px" }}
                    />
                    <Button variant='contained' onClick={handleTagAdd}>
                        添加
                    </Button>
                </Box>
                <Box
                    display="flex"
                    justifyContent="left"
                    flexWrap="wrap"
                    sx={{ width: "240px", "& > *": { margin: "2px!important" } }}
                >
                    {
                        tags.map((val, idx) => {
                            return (<Chip key={idx} label={val} variant="outlined" onDelete={() => {
                                handleTagDelete(val)
                            }} />)
                        })
                    }
                </Box>
                <Button sx={{ width: "240px" }} variant='contained' onClick={handleProfileUpdate}>
                    更新信息
                </Button>
            </Stack>
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