import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
});

const EditSkillsModal = ({ open, setOpen }) => {
  const [socialPlatform, setSocialPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setSocialPlatform(e.target.value);
  };

  const handleAddSocialLink = (e) => {
    e.preventDefault();
    setOpen(false);
    console.log("Platform :", socialPlatform);
    console.log("URL :", url);
    // API Call to Add Social Link
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/users/add-social-link`,
        {
          platform: socialPlatform,
          url: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        console.log("Testing Response");
        swal("Success", response.data.message, "success");
      })
      .catch((error) => swal("Error", error.response.data.message, "error"));
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
          Add Social Link
        </Typography>
        <form onSubmit={handleAddSocialLink}>
          <FormControl fullWidth className="mb-3">
            <InputLabel id="demo-simple-select-label">
              Social Platform
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={socialPlatform}
              label="Social Platform"
              onChange={handleChange}
            >
              <MenuItem value={"GitHub"}>GitHub</MenuItem>
              <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
              <MenuItem value={"Website"}>Website</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="mb-3">
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </FormControl>
          <Button type="submit" variant="contained" className="rounded-pill">
            Add Social Link
          </Button>
        </form>
      </Box>
    </StyledModal>
  );
};

export default EditSkillsModal;
