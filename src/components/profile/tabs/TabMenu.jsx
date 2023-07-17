import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

const TabMenu = ({ tabValue, setTabValue }) => {
  const handleTabClick = (e, value) => {
    setTabValue(value);
  };

  return (
    <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
      <Tabs value={tabValue} variant="fullWidth" onChange={handleTabClick}>
        <Tab label="About" />
        <Tab label="Skills" />
        <Tab label="Followers" />
        <Tab label="Following" />
      </Tabs>
    </Box>
  );
};

export default TabMenu;
