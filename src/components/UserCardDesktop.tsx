import { useState, useEffect } from 'react';
import { Card, Avatar, Stack, Typography, Divider, Box, Chip } from '@mui/material'
import { User } from '../types'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export function UserCardDesktop(props: {
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

    return (<Card
        sx={{ padding: "10px", width: "380px" }}
        onClick={props.onClick}
    >
        <Stack
            spacing={1}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Avatar sx={{ width: "4.65rem", height: "4.65rem" }} sizes="large" src={props.user.avatarUrl ? props.user.avatarUrl : ""} />
                <Typography noWrap sx={{ fontSize: "1.5rem", fontWeight: 500, fontStyle: (props.user.username && props.user.username !== "") ? "normal" : "italic" }}>{(props.user.username && props.user.username !== "") ? props.user.username : "该用户暂时没有用户名"}</Typography>
            </Stack>
            <Divider orientation='horizontal' flexItem />
            <Stack>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <PhoneIcon />
                    <Typography noWrap>{props.user.phone ? props.user.phone : "暂无手机号"}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <EmailIcon />
                    <Typography noWrap>{props.user.email ? props.user.email : "暂无 Email"}</Typography>
                </Stack>
            </Stack>
            <Divider orientation='horizontal' flexItem />
            <Box
                display="flex"
                justifyContent="left"
                sx={{ width: "100%", "& > *": { margin: "2px!important" } }}
                paddingTop="3px"
                flexWrap="wrap"
            >
                {
                    tags.map((val, idx) => {
                        return (<Chip key={idx} label={val} variant="outlined" />)
                    })
                }
            </Box>
        </Stack>
    </Card>)
}