import { AccountCircle, AccountCircleOutlined, AddCircle, ExpandLess, ExpandMore, Home, ListAlt, Login, LogoutOutlined, MenuSharp, Notifications } from "@mui/icons-material"
import { AppBar, Badge, Button, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Stack, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo, useState } from "react"
import { useHistory } from "react-router-dom"
import "./header.css"
import Theme from "./Theme"

const Header = memo((props) => {
    const { isLoggedIn, id, logout, notificationNum } = props
    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [logoutModal, setLogoutModal] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);


    const list = () => (
        <>
            {isLoggedIn ?
                <Box
                    sx={{ width: 250 }}
                >
                    <List>
                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push("/")
                            }}
                        >
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="トップ" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push(`/myproject/${id}`)
                            }}
                        >
                            <ListItemIcon>
                                <ListAlt />
                            </ListItemIcon>
                            <ListItemText primary="マイプロジェクト" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push(`/notice/${id}`)
                            }}
                        >
                            <ListItemIcon>
                                <Badge badgeContent={notificationNum} color="secondary">
                                    <Notifications />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="通知" />
                        </ListItemButton>

                        <ListItemButton
                            onClick=
                            {() => {
                                setProfileOpen(!profileOpen);
                            }
                            }
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="プロフィール" />
                            {profileOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                            <Divider />
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    onClick={() => {
                                        setDrawerOpen(false)
                                        history.push(`/profile/${id}`)
                                    }}
                                >
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="プロフィール設定" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}
                                    onClick={() => {
                                        setDrawerOpen(false)
                                        setLogoutModal(true)
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="ログアウト" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box >
                :
                <Box
                    sx={{ width: 250 }}
                    onKeyDown={() => { setDrawerOpen(false) }}
                >
                    <List>
                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push("/")
                            }}
                        >
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="トップ" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push(`/login`)
                            }}
                        >
                            <ListItemIcon>
                                <Login />
                            </ListItemIcon>
                            <ListItemText primary="ログイン" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push(`/signup`)
                            }}
                        >
                            <ListItemIcon>
                                <AddCircle />
                            </ListItemIcon>
                            <ListItemText primary="新規登録" />
                        </ListItemButton>
                    </List>
                </Box >
            }
        </>
    );

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Modal
                    open={logoutModal}
                    onClose={() => { setLogoutModal(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ログアウトします。よろしいですか？
                        </Typography>
                        <Stack spacing={2} direction="row" sx={{ mt: 2, justifyContent: "center" }}>
                            <Button variant="contained" onClick={() => { setLogoutModal(false) }}>キャンセル</Button>
                            <Button variant="outlined" onClick={() => { setLogoutModal(false); logout(); history.push("/"); }}>はい</Button>
                        </Stack>
                    </Box>
                </Modal>
                <Box>
                    <AppBar position="static">
                        <Toolbar>
                            {isLoggedIn
                                ?
                                <>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        <Tooltip title="トップ" arrow>
                                            <IconButton size="large" color="inherit"
                                                onClick={() => { history.push("/") }}>
                                                <Home />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="マイプロジェクト" arrow>
                                            <IconButton size="large" color="inherit"
                                                onClick={() => { history.push(`/myproject/${id}`) }}>
                                                <ListAlt />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="通知" arrow>
                                            <IconButton size="large" color="inherit"
                                                onClick={() => { history.push(`/notice/${id}`) }}>
                                                <Badge badgeContent={notificationNum} color="secondary">
                                                    <Notifications />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="プロフィール" arrow>
                                            <IconButton size="large" color="inherit"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >

                                                <AccountCircle />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleClose(); history.push(`/profile/${id}`); }}>
                                            <ListItemIcon>
                                                <AccountCircleOutlined fontSize="small" />
                                            </ListItemIcon>
                                            プロフィール設定
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleClose(); setLogoutModal(true); }}>
                                            <ListItemIcon>
                                                <LogoutOutlined fontSize="small" />
                                            </ListItemIcon>
                                            ログアウト
                                        </MenuItem>
                                    </Menu>
                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                        <IconButton
                                            size="large"
                                            aria-label="show more"
                                            aria-controls="primary-search-account-menu-mobile"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => { setDrawerOpen(true) }}
                                        >
                                            <MenuSharp />
                                        </IconButton>
                                    </Box>
                                    <Drawer
                                        anchor="right"
                                        open={drawerOpen}
                                        onClose={() => { setDrawerOpen(false) }}
                                    >
                                        {list()}
                                    </Drawer>
                                </>
                                :
                                <>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        <Tooltip title="トップ" arrow>
                                            <IconButton size="large" color="inherit"
                                                onClick={() => { history.push("/") }}>
                                                <Home />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="ログイン" arrow>
                                            <IconButton
                                                size="large"
                                                color="inherit"
                                                onClick={() => { history.push("/login") }}
                                            >
                                                <Login />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="新規登録" arrow>
                                            <IconButton
                                                size="large"
                                                color="inherit"
                                                onClick={() => { history.push("signup") }}
                                            >
                                                <AddCircle />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                        <IconButton
                                            size="large"
                                            aria-label="show more"
                                            aria-controls="primary-search-account-menu-mobile"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => { setDrawerOpen(true) }}
                                        >
                                            <MenuSharp />
                                        </IconButton>
                                    </Box>
                                    <Drawer
                                        anchor="right"
                                        open={drawerOpen}
                                        onClose={() => { setDrawerOpen(false) }}
                                    >
                                        {list()}
                                    </Drawer>
                                </>
                            }
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        </>
    )
})
export default Header