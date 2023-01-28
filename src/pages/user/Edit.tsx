import { Box } from '@mui/material';
import { useState } from 'react';
import UserProfile from '../../components/UserProfile';
import store from '../../redux';
import { User } from '../../types';
import { setNotification } from '../../utils/notification';

function Edit() {
    const [user, setUser] = useState<User>(store.getState().selectedUser.user);

    if (!store.getState().selectedUser.isSet) {
        setNotification("error", "未选择用户")
        history.back()
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            paddingTop="10px"
        >
            <UserProfile user={user} showSensitiveInformation={true} editable={true} ></UserProfile>
        </Box>)
}

export default Edit;