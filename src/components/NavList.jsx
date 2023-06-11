import {
  AccountCircle,
  BackupTable,
  Dns,
  Group,
  Inbox,
  Mail,
  Reviews,
  Timelapse,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = styled(ListItem)`
  &:hover {
    background-color: rgba(153, 153, 153, 0.2);
  }
`;

const NavList = ({ open }) => {
  const location = useLocation();
  const navItems = [
    { id: 1, name: "Timeline", icon: <Timelapse />, route: "/timeline" },
    { id: 2, name: "My Projects", icon: <Dns />, route: "/my-projects" },
    {
      id: 3,
      name: "Joined Projects",
      icon: <BackupTable />,
      route: "/joined-projects",
    },
    { id: 4, name: "Developers", icon: <Group />, route: "/developers" },
    { id: 5, name: "Requests", icon: <Group />, route: "/requests" },
    { id: 6, name: "Reviews", icon: <Reviews />, route: "/reviews" },
    {
      id: 7,
      name: "My Profile",
      icon: <AccountCircle />,
      route: "/my-profile",
    },
  ];

  return (
    <List>
      {navItems.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            backgroundColor: location.pathname.includes(item.route)
              ? "rgba(153, 153, 153, 0.2)"
              : "inherit",
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(153, 153, 153, 0.2)" },
          }}
        >
          <Link
            to={`${item.route}`}
            style={{
              textDecoration: "none",
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              color: "inherit",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
