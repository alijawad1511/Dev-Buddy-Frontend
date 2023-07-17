import { Box, Typography } from "@mui/material";
import React from "react";

const ProjectsCount = ({ userProfile }) => {
  return (
    <Box className="px-3 py-2 mb-3 border rounded">
      <Box className="d-flex align-items-center justify-content-between">
        <Typography
          variant="h5"
          sx={{ fontSize: "18px" }}
          className="fw-bold mb-2"
        >
          PROJECTS
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between mb-1">
        <Typography className="fw-bold">Published Projects</Typography>
        <Typography>{userProfile?.publishedProjectCount}</Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between mb-1">
        <Typography className="fw-bold">Participations</Typography>
        <Typography>{userProfile?.participatedProjectCount}</Typography>
      </Box>
    </Box>
  );
};

export default ProjectsCount;
