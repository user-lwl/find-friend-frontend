import { Box, Button, Typography } from '@mui/material'
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import StartIcon from '@mui/icons-material/Start';
import { useState } from 'react'
import store from '../redux';
import router from '../router';
import { setNotification } from '../utils/notification';

function HomePage() {
    const handleGettingStarted = () => {
        if (!store.getState().user.isLoggedIn) {
            setNotification("info", "您尚未登录");
            router.navigate("/login");
        } else {
            router.navigate("/users");
        }
    }


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            paddingTop="20px"
            height="70%"
        >
            <BubbleChartIcon sx={{ fontSize: "8em", color: "#888" }} />
            <Typography sx={{ m: 2 }} fontSize="1.5em">{import.meta.env.VITE_APP_TITLE} —— {import.meta.env.VITE_APP_DESCRIPTION}</Typography>
            <Button size='large' variant="contained" sx={{ m: 2 }} onClick={handleGettingStarted} endIcon={<StartIcon />}>寻找伙伴</Button>
        </Box>
    )
}

export default HomePage
