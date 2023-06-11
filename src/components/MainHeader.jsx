import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, styled, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = styled(AppBar)`
  background-color: "#fff";
`;

const MainHeader = () => {
  return (
    <Header>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
      </Toolbar>
    </Header>
  );
};

export default MainHeader;
