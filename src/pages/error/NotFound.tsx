import { Box, Button, Typography } from "@mui/material";
import router from "../../router";

function NotFound() {
    const navigateToHomePage = () => {
        router.navigate("/")
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            paddingTop="20px"
            height="60%"

        >
            <Typography fontSize="6em" color="#888">404</Typography>
            <Typography fontSize="1.5em" color="#444">页面走丢了</Typography>
            <Button variant="contained" onClick={navigateToHomePage} sx={{ m: 2 }}>返回主页</Button>
        </Box>
    )
}

export default NotFound;