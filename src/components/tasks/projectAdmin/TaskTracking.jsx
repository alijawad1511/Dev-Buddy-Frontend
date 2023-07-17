import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AddTask, DeleteForever, Edit } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import AddTaskModal from "../../modals/AddTaskModal";
import EditTaskModal from "../../modals/EditTaskModal";
import axios from "axios";
import swal from "sweetalert";
import dayjs from "dayjs";
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

const TaskTracking = () => {
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const { tasks, setTasks } = useContext(ProjectContext);
  const [selectedTask, setSelectedTask] = useState({});
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/all-tasks`,
        { projectId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  }, []);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEditTaskModal(true);
  };

  const handleDeleteClick = (taskId) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/delete-task`,
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
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  /*
    STATUS
    1 - Incomplete
    2 - Pending
    3 - Completed
  */

  const getTaskStatusLabel = (status) => {
    // Setting Label of Task Status Chip
    switch (status) {
      case "Incomplete":
        return "Incomplete"; // Set color for status 1
      case "Pending":
        return "Pending"; // Set color for status 2
      case "Completed":
        return "Completed"; // Set color for status 3
    }
  };

  const getTaskStatusColor = (status) => {
    // Setting Color of Tast Status Chip
    switch (status) {
      case "Incomplete":
        return "#90caf9"; // Set color for status 1
      case "Pending":
        return "#828282"; // Set color for status 2
      case "Completed":
        return "#66bb6a"; // Set color for status 3
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <Box className="d-flex justify-content-between align-items-center">
          <MainTitle variant="h5">Task Tracking</MainTitle>
          <Button
            variant="contained"
            startIcon={<AddTask />}
            onClick={() => setOpenAddTaskModal(true)}
          >
            Add New Task
          </Button>
        </Box>
        <Box className="d-flex flex-wrap mt-3">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ width: "5%" }}>
                    ID
                  </TableCell>
                  <TableCell align="left" style={{ width: "30%" }}>
                    Title
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    Assignee
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    Due Date
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.map((task, index) => (
                  <TableRow
                    key={task._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {task.title}
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={getTaskStatusLabel(task.status)}
                        style={{
                          backgroundColor: getTaskStatusColor(task.status),
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        avatar={
                          <Avatar
                            alt="Natacha"
                            src={task?.assignee.profile_pic}
                          />
                        }
                        label={`${task.assignee.firstname} ${task.assignee.lastname}`}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(task.dueDate).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          icon={<Edit />}
                          label="Edit"
                          onClick={() => handleEditTask(task)}
                        />
                        <Chip
                          icon={<DeleteForever style={{ color: "#a81207" }} />}
                          label="Delete"
                          onClick={() => handleDeleteClick(task._id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <AddTaskModal
        open={openAddTaskModal}
        setOpen={setOpenAddTaskModal}
        projectId={projectId}
      />
      <EditTaskModal
        open={openEditTaskModal}
        setOpen={setOpenEditTaskModal}
        projectId={projectId}
        task={selectedTask}
      />
    </Box>
  );
};

export default TaskTracking;
