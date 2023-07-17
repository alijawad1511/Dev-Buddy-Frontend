import { Box, Typography } from "@mui/material";
import React from "react";

const Popularity = ({ userProfile }) => {
  return (
    <Box className="px-3 py-2 mb-3 border rounded">
      <Box className="d-flex align-items-center justify-content-between">
        <Typography
          variant="h5"
          sx={{ fontSize: "18px" }}
          className="fw-bold mb-2"
        >
          POPULARITY
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between mb-1">
        <Typography className="fw-bold">Followers</Typography>
        <Typography>{userProfile?.followerCount}</Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between mb-1">
        <Typography className="fw-bold">Following</Typography>
        <Typography>{userProfile?.followingCount}</Typography>
      </Box>
    </Box>
  );
};

export default Popularity;
