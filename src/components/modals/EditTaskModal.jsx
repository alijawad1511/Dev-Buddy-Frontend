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

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
});

const EditTaskModal = ({ open, setOpen, projectId, task }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // States Initialization
    setTitle(task.title);
    setSummary(task.summary);
    setAssignee(task.assignee?._id);
    setDueDate(dayjs(new Date(task.dueDate)));
  }, [task]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/projects/participants`,
          { projectId },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("garbage"),
            },
          }
        );
        setParticipants(response.data.participants);
      } catch (error) {
        swal("Error", error.response.data.message, "error");
      }
    };

    fetchParticipants();
  }, [projectId]);

  const handleChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    // Check if any of the fields have changed
    const isTitleChanged = title !== task.title;
    const isSummaryChanged = summary !== task.summary;
    const isDueDateChanged = dueDate !== dayjs(new Date(task.createdAt));
    const isAssigneeChanged = assignee !== task.assignee._id;

    if (
      isTitleChanged ||
      isSummaryChanged ||
      isDueDateChanged ||
      isAssigneeChanged
    ) {
      // User has edited task
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/projects/edit-task`, {
          title: isTitleChanged ? title : task.title,
          summary: isSummaryChanged ? summary : task.summary,
          dueDate: isDueDateChanged ? dueDate : dayjs(new Date(task.createdAt)),
          assignee: isAssigneeChanged ? assignee : task.assignee._id,
          projectId: projectId,
          taskId: task._id,
        })
        .then((response) => {
          // Handle successful response
          console.log("Task updated successfully");
        })
        .catch((error) => {
          // Handle error response
          console.error("Error updating task:", error);
        });
    } else {
      // No changes made by the user
      console.log("No changes made to the task");
    }
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
          Edit Task
        </Typography>
        <form onSubmit={handleEditTask}>
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
              {participants.map((participant) => (
                <MenuItem key={participant._id} value={participant._id}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt="Remy Sharp"
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
                views={["year", "month", "day"]}
                value={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </LocalizationProvider>
          </FormControl>
          <Button type="submit" variant="contained" className="rounded-pill">
            Save Changes
          </Button>
        </form>
      </Box>
    </StyledModal>
  );
};

export default EditTaskModal;
