import { Box, CssBaseline, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Leftbar from "../components/Leftbar";
import Topbar from "../components/Topbar";
import UserTimeline from "../components/UserTimeline";

const HomePage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("garbage")) {
      navigate("/");
    }
  }, []);

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

export default HomePage;
