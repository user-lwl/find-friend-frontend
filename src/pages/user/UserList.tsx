import * as userAPI from '../../service/user';
import { useEffect, useState } from 'react';
import { unauthorizedErrorHandler } from '../../utils/notification';
import { Box, Button, Chip, Divider, Stack, TextField } from '@mui/material';
import store from '../../redux';
import { User, UserFilterOperations } from '../../types';
import { UserCardMobile } from '../../components/UserCardMobile';
import { UserCardDesktop } from '../../components/UserCardDesktop';
import router from '../../router';

function UserList() {
    const [userList, setUserList] = useState<User[]>([])
    const [fetchMode, setFetchMode] = useState<UserFilterOperations>(store.getState().userFilterMode.operation);
    const [keyword, setKeyword] = useState<string>(store.getState().currentUsernameFilter.username);
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>(store.getState().currentTagsFilter.tags);

    const fetchUsers = () => {
        if (fetchMode == "recommend") {
            userAPI.matchUsers(8).then((user) => {
                setUserList(user)
            }).catch(unauthorizedErrorHandler)
        } else if (fetchMode == "username") {
            userAPI.searchUsers(keyword).then((user) => {
                setUserList(user)
            }).catch(unauthorizedErrorHandler);
        } else {
            if (tags.length != 0) {
                userAPI.searchUsersByTags(tags).then((user) => {
                    setUserList(user);
                }).catch(unauthorizedErrorHandler);
            } else {
                setUserList([]);
            }
        }
    }

    useEffect(() => {
        fetchUsers();
        setKeyword(store.getState().currentUsernameFilter.username);
    }, [fetchMode])

    const editUser = (user: User) => {
        if (store.getState().user.user.userRole != 1) {
            return;
        }
        store.dispatch({
            type: "selectedUser/setUser",
            user: user
        })
        store.dispatch({
            type: "currentUsernameFilter/setFilter",
            username: keyword
        })
        store.dispatch({
            type: "currentTagsFilter/setFilter",
            tags: tags
        })
        store.dispatch({
            type: "userFilterMode/setMode",
            operation: fetchMode
        })
        router.navigate("/users/edit")
    }

    const updateFetchMode = (mode: UserFilterOperations) => {
        if (mode !== fetchMode) {
            setFetchMode(mode);
        }
    }

    const handleTagAdd = () => {
        setTags([...tags, tag])
        setTag("")
    }


    const handleTagDelete = (tag: string) => {
        setTags(tags.filter((val) => tag !== val))
    }


    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                height="60%"
                sx={{ display: { md: "none" } }}
            >
                <Stack
                    direction="column"
                    spacing={1}
                    padding="8px"
                >
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Chip onClick={() => {
                            updateFetchMode("recommend")
                        }} variant={fetchMode == "recommend" ? "filled" : "outlined"} label="用户推荐" />
                        {
                            (store.getState().user.user && store.getState().user.user.userRole == 1) ? <Chip onClick={() => {
                                updateFetchMode("username")
                            }} variant={fetchMode == "username" ? "filled" : "outlined"} label="用户搜索" /> : ""
                        }
                        <Chip onClick={() => {
                            updateFetchMode("tags")
                        }} variant={fetchMode == "tags" ? "filled" : "outlined"} label="标签搜索" />
                    </Stack>
                    {fetchMode == "username" ? <Stack
                        direction="column"
                        spacing={2}
                    >
                        <TextField
                            label="用户名"
                            type="text"
                            variant="standard"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value)
                            }}
                        />
                        <Button onClick={fetchUsers} variant='contained'>搜索</Button>
                    </Stack> : ""}
                    {fetchMode == "tags" ? <Stack
                        direction="column"
                        spacing={2}
                    >
                        <Box
                            display="flex"
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
                                    return (<Chip key={idx} label={val} variant="outlined" onDelete={() => {
                                        handleTagDelete(val)
                                    }} />)
                                })
                            }
                        </Box>
                        <Button onClick={fetchUsers} variant='contained'>搜索</Button>
                    </Stack> : ""}
                </Stack>
                <Stack
                    padding="10px"
                    boxSizing="border-box"
                    direction="column"
                    divider={<Divider orientation='horizontal' flexItem />}
                    spacing={0}
                >
                    {
                        userList.map((item, idx) => {
                            return (<UserCardMobile onClick={() => {
                                editUser(item)
                            }} key={idx} user={item} />)
                        })
                    }
                </Stack>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                height="60%"
                sx={{ display: { xs: "none", md: "flex" } }}
            >
                {(store.getState().user.user && store.getState().user.user.userRole == 1) ? <Box>Admin area</Box> : ""}
                <Box
                    display="flex"
                    width="80%"
                    justifyContent="flex-start"
                    minWidth="900px"
                    flexWrap="wrap"
                    sx={{ "& > *": { margin: "10px" } }}
                >
                    {
                        userList.map((item, idx) => {
                            return (<UserCardDesktop onClick={() => {
                                editUser(item)
                            }} key={idx} user={item} />)
                        })
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default UserList;