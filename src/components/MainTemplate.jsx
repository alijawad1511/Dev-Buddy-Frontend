import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavList from "./NavList";
import Topbar from "./Topbar";
import { Paper } from "@mui/material";
import UserTimeline from "./UserTimeline";
import Leftbar from "./Leftbar";

const MainTemplate = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleSidebarOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar handleSidebarOpen={handleSidebarOpen} open={open} />
      <Leftbar />
      <UserTimeline />
    </Box>
  );
};

export default MainTemplate;
