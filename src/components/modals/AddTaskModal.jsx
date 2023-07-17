import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import swal from "sweetalert";
import { ProjectContext } from "../../contexts/ProjectContext";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
});

const AddTaskModal = ({ open, setOpen, projectId }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [projectParticipants, setProjectParticipants] = useState([]);
  const { tasks, setTasks } = useContext(ProjectContext);

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      projectId,
    });

    // Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/participants`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setProjectParticipants(response.data.participants);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title || !summary || !assignee || !dueDate) {
      swal("Error", "Please fill all the fields", "error");
      return;
    }

    const data = {
      title: title,
      summary: summary,
      assignee: assignee,
      dueDate: dayjs(dueDate).format("DD MMM YYYY"),
      projectId: projectId,
    };

    // Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/add-task`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        swal("Success", response.data.message, "success");

        // Update Tasks on Frontend Table
        setTasks([...tasks, response.data.newTask]);

        // Clear all fields of Add Task Form
        setTitle("");
        setSummary("");
        setAssignee("");
        setDueDate(null);
        setErrorMessage("");

        // Close Modal
        setOpen(false);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  const handleChange = (e) => {
    setAssignee(e.target.value);
  };

  return (
    <StyledModal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: "40%" }} borderRadius={3} bgcolor="white" px={3} py={2}>
        <Typography variant="h5" className="mb-4">
          Add New Task
        </Typography>
        <Typography variant="p" style={{ fontWeight: "bold", color: "red" }}>
          {errorMessage}
        </Typography>
        <form onSubmit={handleAddTask}>
          <FormControl fullWidth className="mb-3">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              placeholder="e.g. Side Navigation"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              label="Summary"
              placeholder="e.g. Design a navigation menu on left side and add some styling using MUI"
              rows={2}
            />
          </FormControl>
          <FormControl fullWidth className="mb-3">
            <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignee}
              label="Social Platform"
              onChange={handleChange}
            >
              {projectParticipants.map((participant) => (
                <MenuItem key={participant._id} value={participant._id}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={`${participant.firstname} ${participant.lastname}`}
                      src={participant.profile_pic}
                      style={{ marginRight: "10px" }}
                    />
                    <Typography>{`${participant.firstname} ${participant.lastname}`}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                label="MM/DD/YY"
                format="DD MMM YYYY"
                views={["year", "month", "day"]}
                onChange={(date) => setDueDate(date)}
              />
            </LocalizationProvider>
          </FormControl>
          <Button type="submit" variant="contained" className="rounded-pill">
            Add Task
          </Button>
        </form>
      </Box>
    </StyledModal>
  );
};

export default AddTaskModal;
