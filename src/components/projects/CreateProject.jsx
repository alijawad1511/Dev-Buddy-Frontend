import { Add, Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { technologies } from "../../data/technologies";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const SearchField = styled("input")({
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "16px",
});

const CreateProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const handlePublishProject = (e) => {
    e.preventDefault();

    if (title === "") {
      return;
    }

    if (description === "") {
      return;
    }

    if (tags.length < 1) {
      return;
    }

    const data = JSON.stringify({
      title,
      description,
      tags,
    });

    // API Parameters Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/create-project`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    // // API Call
    axios(config)
      .then((response) => {
        navigate("/my-projects");
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Create Project</MainTitle>
        <Box className="mt-5">
          <form onSubmit={handlePublishProject}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-multiline-static"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                placeholder="e.g. My Project is an Ecommerce App using MERN Stack."
                rows={5}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={technologies}
                value={tags}
                onChange={(event, newTags) => setTags(newTags)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Technology Stack"
                    placeholder="Favorites"
                  />
                )}
              />
            </FormControl>
            <Button type="submit" variant="contained" className="rounded-pill">
              Publish Project
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProject;
