import React from "react";

import {styled, useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import {IconButton} from "@mui/material"


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    hide: {
        display: "none",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#000",
        height: "64px !important",
        minHeight: "64px !important",
    },
    appToolbar: {
        height: 64,
        minHeight: 64,
        color: "#fff",
        backgroundColor: "#000",
    },
    content: {
        flexGrow: 1,
    },
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(5)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const MainMenu = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    let mainMenuOpen =
        window.innerWidth <= 1280 ? "false" : localStorage.getItem("mainMenuOpen");
    const [open, setOpen] = React.useState(mainMenuOpen === "true");

    function handleDrawerOpen() {
        setOpen(true);
        localStorage.setItem("mainMenuOpen", "true");
    }

    function handleDrawerClose() {
        setOpen(false);
        localStorage.setItem("mainMenuOpen", "false");
    }



    return (
        <div>
            <CssBaseline/>
            <AppBar
                position="fixed" open={open}
            >
                <Toolbar className={classes.appToolbar} style={{backgroundColor: "#000"}}>
                    <div>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                ...(open && {display: 'none'}),
                                color:"#fff"
                            }}
                            tooltip="Раскрыть меню"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <Typography
                        variant="overline"
                        noWrap
                        style={{
                            flexGrow: 1,
                            marginLeft: 5,
                            marginBottom: 1,
                            fontSize: "18px",
                            fontWeight: 800,
                        }}
                    >
                    </Typography>
                    {props.components && props.components.ToolbarButtons && (
                        <props.components.ToolbarButtons/>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose} tooltip="Скрыть меню">
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon   sx={{
                                color:"#fff"
                            }}/>
                        ) : (
                            <ChevronLeftIcon   sx={{
                                color:"#fff"
                            }}/>
                        )}
                    </IconButton>
                </div>
                <Divider/>
                {props.components && props.components.Menu && (
                    <props.components.Menu/>
                )}
                <Divider/>
            </Drawer>
        </div>
    );
};
