import { Box, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import CompletedTask from "./CompletedTask";

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

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/completed-tasks`,
        { projectId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        setCompletedTasks(response.data.completedTasks);
        console.log(response.data.completedTasks);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Completed Tasks</MainTitle>
        <Box className="d-flex flex-wrap mt-3">
          {completedTasks?.map((task) => (
            <CompletedTask key={task._id} projectId={projectId} task={task} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CompletedTasks;
