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
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { ProjectContext } from "../../../contexts/ProjectContext";

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

const AssignedTask = ({ task, projectId }) => {
  const [open, setOpen] = useState(false);
  const { assignedTasks, setAssignedTasks } = useContext(ProjectContext);
  const [selectedTask, setSelectedTask] = useState({});

  const handleMarkComplete = (taskId) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/mark-task-completed`,
        { projectId, taskId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        swal("Success", response.data.message, "success");

        // Updating Tasks Table on Frontend
        setAssignedTasks(assignedTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  const handleOpenModal = (task) => {
    setOpen(true);
    setSelectedTask(task);
  };

  return (
    <>
      <Component
        className="me-3 mb-3"
        sx={{
          "&:hover": { boxShadow: "0 0 5px 0px black" },
          cursor: "pointer",
        }}
        onClick={() => handleOpenModal(task)}
      >
        <Box className="border-bottom px-3 pt-3 pb-2">
          <Typography className="fw-bold">{task.title}</Typography>
          <Typography>{task.summary}</Typography>
        </Box>
        <Box className="d-flex align-items-center justify-content-between px-3 pt-2 pb-2">
          <Tooltip
            title={`Due Date: ${dayjs(task.dueDate).format("DD MMM YYYY")}`}
          >
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
            onClick={() => handleMarkComplete(task._id)}
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
          <Typography variant="h6">{selectedTask?.title}</Typography>
          <Typography variant="p" sx={{ display: "block" }}>
            {selectedTask?.summary}
          </Typography>
          <Chip
            icon={<Timelapse />}
            label={dayjs(task.dueDate).format("DD MMM YYYY")}
            sx={{ mt: 2 }}
          />
        </Box>
      </StyledModal>
    </>
  );
};

export default AssignedTask;
