import * as uploadAPI from '../service/upload';
import * as userAPI from '../service/user';
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Avatar, Box, Button, CircularProgress, Stack, TextField, Select, MenuItem, InputLabel, FormControl, Chip, FormControlLabel, Switch } from '@mui/material';
import { setNotification, unauthorizedErrorHandler } from '../utils/notification';
import * as _ from 'lodash';
import store from '../redux';

function UserProfile(props: { user: User, editable: boolean, showSensitiveInformation: boolean }) {
    let parsedTags = [];

    if (props.user.tags) {
        parsedTags = JSON.parse(props.user.tags);
    }

    const [user, setUser] = useState<User>(props.user);
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>(parsedTags);

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
            uploadAPI.uploadFile(blob).then((res) => {
                setUser({
                    ...user,
                    avatarUrl: res.filePath
                })
            }).catch(unauthorizedErrorHandler)
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
        setUser({ ...user, tags: JSON.stringify(tags) })
        let form = _.cloneDeepWith(user);
        form.tags = JSON.stringify(tags);
        userAPI.updateUser(form).then(() => {
            userAPI.getCurrentUser().then(user => {
                store.dispatch({
                    type: "user/setUser",
                    user: user
                })
            })
            setNotification("success", "用户信息更新成功")
        }).catch((err) => {
            setNotification("error", `用户信息更新失败: ${err.message}`)
        })
    }

    const handleUserDelete = () => {
        userAPI.deleteUser(user.id).then(() => {
            setNotification("success", "用户删除成功")
        }).catch((err) => {
            setNotification("error", `用户删除失败: ${err.message}`)
        })
    }


    return (

        <Stack
            maxWidth="440px"
            width="100%"
            padding="10px"
            boxSizing="border-box"
            direction="column"
            alignItems="center"
            spacing={2}
        >
            <Avatar sx={{ width: 140, height: 140 }} src={user.avatarUrl ? user.avatarUrl : ""} />
            <Button variant='contained' component="label">
                上传头像
                <input onChange={handleFileSelect} hidden accept="image/*" type="file" />
            </Button>
            {
                props.showSensitiveInformation ? <FormControlLabel control={<Switch checked={user.userStatus == 0} onChange={(e) => {
                    if (e.target.checked) {
                        setUser({ ...user, userStatus: 0 })
                    } else {
                        setUser({ ...user, userStatus: 1 })
                    }
                }} />} label={user.userStatus == 0 ? "启用" : "停用"} /> : ""
            }
            <Chip variant="outlined" label={user.userRole == 0 ? "普通用户" : "管理员"} color={user.userRole == 0 ? 'default' : 'success'} />
            <TextField
                label="账号"
                type="text"
                variant="standard"
                required
                sx={{ width: "100%" }}
                disabled
                value={user.userAccount}
            />
            <TextField
                label="星球编号"
                disabled
                type="text"
                variant="standard"
                sx={{ width: "100%" }}
                value={user.planetCode}
            />
            <FormControl sx={{ marginTop: "32px!important", width: "100%" }}
            >
                <InputLabel id="gender-select">性别</InputLabel>
                <Select
                    labelId="gender-select"
                    label="性别"
                    inputProps={{ readOnly: !props.editable }}
                    value={user.gender ? user.gender : 0}
                    size="small"
                    onChange={(e) => {
                        if (typeof e.target.value == 'number') {
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
            {
                props.showSensitiveInformation ? <FormControl sx={{ marginTop: "32px!important", width: "100%" }}
                >
                    <InputLabel id="role-select">角色</InputLabel>
                    <Select
                        labelId="role-select"
                        label="角色"
                        inputProps={{ readOnly: !props.editable }}
                        value={user.userRole}
                        size="small"
                        onChange={(e) => {
                            if (typeof e.target.value == 'number') {
                                setUser({ ...user, userRole: e.target.value })
                            }
                        }}
                    >
                        <MenuItem value={0}>普通用户</MenuItem>
                        <MenuItem value={1}>管理员</MenuItem>
                    </Select>
                </FormControl> : ""
            }
            <TextField
                label="用户名"
                type="text"
                inputProps={{ readOnly: !props.editable }}
                variant="standard"
                sx={{ width: "100%" }}
                value={user.username}
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
            />
            <TextField
                label="手机号"
                type="tel"
                inputProps={{ readOnly: !props.editable }}
                variant="standard"
                sx={{ width: "100%" }}
                value={user.phone}
                onChange={(e) => {
                    setUser({ ...user, phone: e.target.value })
                }}
            />
            <TextField
                label="E-Mail"
                type="email"
                inputProps={{ readOnly: !props.editable }}
                variant="standard"
                sx={{ width: "100%" }}
                value={user.email}
                onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
            />
            <Box
                display={props.editable ? 'flex' : 'none'}
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
            >
                <TextField
                    label="输入标签"
                    type="text"
                    variant="standard"
                    value={tag}
                    onChange={(e) => {
                        setTag(e.target.value)
                    }}
                    sx={{ width: "60%" }}
                />
                <Button variant='contained' onClick={handleTagAdd}>
                    添加
                </Button>
            </Box>
            <Box
                display="flex"
                justifyContent="left"
                flexWrap="wrap"
                sx={{ width: "100%", "& > *": { margin: "2px!important" } }}
            >
                {
                    tags.map((val, idx) => {
                        if (props.editable) {
                            return (<Chip key={idx} label={val} variant="outlined" onDelete={() => {
                                handleTagDelete(val)
                            }} />)
                        } else {
                            return (<Chip key={idx} label={val} variant="outlined" />)
                        }
                    })
                }
            </Box>
            <Button sx={{ width: "100%" }} variant='contained' onClick={handleProfileUpdate}>
                更新信息
            </Button>
            {
                props.showSensitiveInformation ? <Button sx={{ width: "100%" }} variant='contained' color='error' onClick={handleUserDelete}>
                    删除用户
                </Button> : ""
            }
        </Stack>
    )
}

export default UserProfile;