import { Box, CircularProgress, Grid, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const UserTimeline = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser, setTimelineProjects, timelineProjects } =
    useContext(UserContext);

  useEffect(() => {
    // API Call Here GetAllProjects
    // Configuration
    var config = {
      method: "GET",
      url: "http://localhost:5000/api/projects/all-projects",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
    };

    axios(config)
      .then((response) => {
        setAllProjects(response.data.message);
        setTimelineProjects(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : allProjects.length > 0 ? (
            allProjects.map((project) => (
              <Post key={project._id} project={project} />
            ))
          ) : (
            <Box className="text-center text-primary fw-bold py-5">
              No Projects Here
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          <div>
            <h5>Recommended Projects</h5>
            <div className="border p-3 my-1 rounded">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
              odit
            </div>
            <div className="border p-3 my-1 rounded">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
              odit
            </div>
            <div className="border p-3 my-1 rounded">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
              odit
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserTimeline;
