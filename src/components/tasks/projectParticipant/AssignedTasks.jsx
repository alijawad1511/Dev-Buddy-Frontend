import { Box, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AssignedTask from "./AssignedTask";
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { ProjectContext } from "../../../contexts/ProjectContext";

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AssignedTasks = () => {
  const { assignedTasks, setAssignedTasks } = useContext(ProjectContext);
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/assigned-tasks`,
        { projectId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        setAssignedTasks(response.data.assignedTasks);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Assigned Tasks</MainTitle>
        <Box className="d-flex flex-wrap mt-3">
          {assignedTasks?.map((task) => (
            <AssignedTask key={task._id} projectId={projectId} task={task} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AssignedTasks;
