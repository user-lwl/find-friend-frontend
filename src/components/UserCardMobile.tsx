import { useState, useEffect } from 'react';
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material"
import { User } from "../types"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export function UserCardMobile(props: {
    user: User,
    onClick?: React.MouseEventHandler<HTMLElement>
}) {

    const [tags, setTags] = useState<String[]>([]);

    useEffect(() => {
        return () => {
            if (props.user.tags) {
                try {
                    setTags(JSON.parse(props.user.tags))
                } catch (e) {

                }
            }
        }
    }, [])


    return (
        <Box
            marginY="10px"
            onClick={props.onClick}
        >
            <Stack
                direction="row"
                spacing={2}
            >
                <Avatar sx={{ width: "4.65rem", height: "4.65rem" }} sizes="large" src={props.user.avatarUrl ? props.user.avatarUrl : ""} />
                <Stack>
                    <Typography width="65vw" noWrap sx={{ fontSize: "1.1rem", fontStyle: (props.user.username && props.user.username !== "") ? "normal" : "italic" }}>{(props.user.username && props.user.username !== "") ? props.user.username : "该用户暂时没有用户名"}</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <PhoneIcon />
                        <Typography width="55vw" noWrap>{props.user.phone ? props.user.phone : "暂无手机号"}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <EmailIcon />
                        <Typography width="55vw" noWrap>{props.user.email ? props.user.email : "暂无 Email"}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Box
                display="flex"
                justifyContent="left"
                sx={{ width: "100%", "& > *": { margin: "2px!important" } }}
                paddingTop="3px"
                overflow="scroll"
            >
                {
                    tags.map((val, idx) => {
                        return (<Chip key={idx} label={val} variant="outlined" />)
                    })
                }
            </Box>
        </Box>
    )
}