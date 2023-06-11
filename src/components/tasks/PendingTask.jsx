import { Timelapse } from "@mui/icons-material";
import { Box, IconButton, styled, Tooltip, Typography } from "@mui/material";
import React from "react";

const Component = styled(Box)`
  width: 300px;
  border-radius: 5px;
  border: 1px solid #999999;
`;

const PendingTask = ({ task }) => {
  return (
    <Component
      className="me-3 mb-3"
      sx={{ "&:hover": { boxShadow: "0 0 5px 0px black" } }}
    >
      <Box className="border-bottom px-3 pt-3 pb-2">
        <Typography className="fw-bold">Summary</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut
          facilisis consectetur. Porttitor velit imperdiet egestas lacus.
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between px-3 pt-2 pb-2">
        <Tooltip title="Due Date: 22-01-2023">
          <IconButton color="black">
            <Timelapse />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            color: "white",
            padding: "6px 16px",
            backgroundColor: "#757575",
            fontWeight: "500",
            borderRadius: "40px",
            display: "inline-block",
            marginRight: "4px",
          }}
        >
          Pending
        </Box>
      </Box>
    </Component>
  );
};

export default PendingTask;
