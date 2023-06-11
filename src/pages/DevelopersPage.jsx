import { Box, CssBaseline, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Topbar from "../components/Topbar";

const DevelopersPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleSidebarOpen = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar handleSidebarOpen={handleSidebarOpen} open={open} />
      <Leftbar />
      <Outlet />
    </Box>
  );
};

export default DevelopersPage;
