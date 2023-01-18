import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import store from '../redux';
import router from '../router';
import { logout } from '../service/user';
import { User } from '../types';
import { setNotification } from '../utils/notification';

const menuItems = [{
    name: "首页",
    route: "/",
    icon: "HomeIcon",
    authenticationRequired: false,
    childs: null
}, {
    name: "匹配",
    route: "/match",
    icon: "GroupAddIcon",
    authenticationRequired: true,
    childs: null
}, {
    name: "团队",
    route: "/teams",
    icon: "GroupsIcon",
    authenticationRequired: true,
    childs: null
}]

function NavigationBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<User>(store.getState().user.user)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(store.getState().user.isLoggedIn)

    React.useEffect(() => {
        // Trigger force re-render
        store.subscribe(() => {
            setUser(store.getState().user.user)
            setIsLoggedIn(store.getState().user.isLoggedIn)
        })
    }, [])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout().then(() => {
            store.dispatch({ type: "user/deleteUser" })
            setNotification("success", "登出成功")
            handleCloseUserMenu()
        }).catch(err => {
            setNotification("error", `登出失败: ${err.message}`)
            handleCloseUserMenu()
        })
    }

    const handleRouteChange = (path: string) => {
        router.navigate(path)
        handleCloseNavMenu()
        handleCloseUserMenu()
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Desktop Logo */}
                        <BubbleChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => {
                                handleRouteChange("/")
                            }}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {import.meta.env.VITE_APP_TITLE}
                        </Typography>

                        {/* Mobile Drawer Button */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="Open menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Mobile Logo */}
                        <BubbleChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            onClick={() => {
                                handleRouteChange("/")
                            }}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {import.meta.env.VITE_APP_TITLE}
                        </Typography>

                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {menuItems.map((item) => {
                                return (<Button
                                    key={item.name}
                                    onClick={() => {
                                        handleRouteChange(item.route)
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >{item.name}</Button>)
                            })}
                        </Box>

                        {/* User Icon */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="User menu">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="" src={user.avatarUrl ? user.avatarUrl : ""} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {!isLoggedIn ?
                                    [
                                        <MenuItem key="register" onClick={() => {
                                            handleRouteChange("/register")
                                        }}>
                                            <Typography textAlign="center">注册</Typography>
                                        </MenuItem>,
                                        <MenuItem key="login" onClick={() => {
                                            handleRouteChange("/login")
                                        }}>
                                            <Typography textAlign="center">登录</Typography>
                                        </MenuItem>
                                    ] : [
                                        <MenuItem key="profile" onClick={() => {
                                            handleRouteChange("/profile")
                                        }}>
                                            <Typography textAlign="center">个人中心</Typography>
                                        </MenuItem>,
                                        <MenuItem key="logout" onClick={handleLogout}>
                                            <Typography textAlign="center">登出</Typography>
                                        </MenuItem>
                                    ]
                                }

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Mobile Drawler Menu */}
            <SwipeableDrawer
                anchor="left"
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                onOpen={() => { }}
                PaperProps={{ sx: { width: 250 } }}
            >
                <List>
                    {menuItems.map(item => {
                        return (<ListItem key={item.name} disablePadding>
                            <ListItemButton onClick={() => {
                                handleRouteChange(item.route)
                            }}>
                                <ListItemIcon>
                                    {item.icon == "HomeIcon" ? <HomeIcon /> : ""}
                                    {item.icon == "GroupAddIcon" ? <GroupAddIcon /> : ""}
                                    {item.icon == "GroupsIcon" ? <GroupsIcon /> : ""}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>)
                    })}
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default NavigationBar;