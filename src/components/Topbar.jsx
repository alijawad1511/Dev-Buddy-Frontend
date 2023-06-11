import {
  Mail,
  Notifications,
  Menu as MenuIcon,
  AccountCircle,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  MenuItem,
  styled,
  Toolbar,
  Menu,
  Typography,
  Tooltip,
  Popover,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Topbar.module.css";
import { UserContext } from "../contexts/UserContext";

const Header = styled(AppBar)`
  z-index: 1201;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Topbar = (props) => {
  const [openUserProfileMenu, setOpenUserProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMailEl, setAnchorMailEl] = useState(null);
  const { handleSidebarOpen, open } = props;
  const navigate = useNavigate();
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const { socket } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("garbage");
    socket.emit("logout");
    navigate("/");
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const handleMailClick = (event) => {
    setAnchorMailEl(event.currentTarget);
  };

  const handleMailClose = () => {
    setAnchorMailEl(null);
  };

  const openNotifications = Boolean(anchorEl);
  const notificationsId = openNotifications
    ? "notifications-popover"
    : undefined;

  const openMail = Boolean(anchorMailEl);
  const mailId = openMail ? "mail-popover" : undefined;

  return (
    <>
      <Header className="bg-white">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            className="fw-bold"
            color="black"
            component="div"
          >
            Dev
            <Typography
              variant="h5"
              color="red"
              className="fw-bold"
              component="span"
            >
              Buddy
            </Typography>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="ms-auto">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="black"
              onClick={handleMailClick}
            >
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="black"
              onClick={handleNotificationsClick}
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Tooltip title="User Profile Menu">
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => setOpenUserProfileMenu(true)}
              >
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 40, height: 40 }}
                  src="https://www.qmul.ac.uk/busman/media/sbm/staff/Arash-Valipour-300x300.jpg"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={openUserProfileMenu}
          onClose={(e) => setOpenUserProfileMenu(false)}
          sx={{ border: "1px solid black" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Menu>
        <Popover
          id={notificationsId}
          open={openNotifications}
          anchorEl={anchorEl}
          onClose={handleNotificationsClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box p={2}>
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="body1">
              You have 17 new notifications.
            </Typography>
            {/* Place your notifications content here */}
          </Box>
        </Popover>
        <Popover
          id={mailId}
          open={openMail}
          anchorEl={anchorMailEl}
          onClose={handleMailClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box p={2}>
            <Typography variant="h6">Mails</Typography>
            <Typography variant="body1">You have 4 new mails.</Typography>
            {/* Place your mail content here */}
          </Box>
        </Popover>
      </Header>
    </>
  );
};

export default Topbar;
