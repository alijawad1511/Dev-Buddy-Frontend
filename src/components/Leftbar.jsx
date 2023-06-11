import React from "react";
import { Add, Menu, Timelapse } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import styles from "../styles/Leftbar.module.css";
import NavList from "./NavList";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Plus = styled("span")({
  fontSize: "30px",
  fontWeight: "bold",
  color: "red",
});

const CreateButton = styled(Link)({
  fontSize: "22px",
  fontWeight: "bold",
  border: "1px solid #999999",
  textDecoration: "none",
  borderRadius: "50px",
  color: "black",
  "&:hover": {
    color: "black",
    backgroundColor: "rgba(153, 153, 153, 0.2)",
  },
  cursor: "pointer",
});

const Sidebar = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Leftbar = ({ open }) => {
  return (
    <Sidebar variant="permanent" open={true}>
      <DrawerHeader />
      {/* <div className="pt-3 pb-1 px-5">
        <CreateButton
          to="/create-project"
          className="d-flex align-items-center justify-content-center"
        >
          <Plus className="me-2">+</Plus>
          Create
        </CreateButton>
      </div> */}
      {/* <ListItem
          disablePadding
          className="border"
          sx={{ display: "block", borderRadius: "50px" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Plus>+</Plus>
            </ListItemIcon>
            <ListItemText primary="Create" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem> */}
      <NavList open={true} />
    </Sidebar>
  );
};

export default Leftbar;
