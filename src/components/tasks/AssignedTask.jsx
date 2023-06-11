import { Timelapse } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Modal,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Component = styled(Box)`
  width: 300px;
  border-radius: 5px;
  border: 1px solid #999999;
`;

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ProjectTask = ({ task }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Component
        className="me-3 mb-3"
        sx={{
          "&:hover": { boxShadow: "0 0 5px 0px black" },
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
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
              backgroundColor: "#0075E1",
              padding: "6px 16px",
              fontWeight: "500",
              borderRadius: "40px",
              display: "inline-block",
              marginRight: "4px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#026bcc", color: "white" },
            }}
          >
            Mark as Complete
          </Box>
        </Box>
      </Component>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ width: "40%" }}
          borderRadius={3}
          bgcolor="white"
          px={3}
          py={2}
        >
          <Typography variant="h6">Summary</Typography>
          <Typography variant="p" sx={{ display: "block" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reprehenderit soluta et quam esse laboriosam? Molestias, fuga. Nihil
            reiciendis voluptate exercitationem!
          </Typography>
          <Chip icon={<Timelapse />} label="22-01-2023" sx={{ mt: 2 }} />
        </Box>
      </StyledModal>
    </>
  );
};

export default ProjectTask;
