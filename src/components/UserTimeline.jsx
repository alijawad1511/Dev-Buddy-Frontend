import {
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { ThumbUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Component = styled(Link)`
  border: 1px solid #999999;
  border-radius: 10px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
  }
`;

const UserTimeline = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    loggedInUser,
    setTimelineProjects,
    timelineProjects,
    recommendedProjects,
    setRecommendedProjects,
  } = useContext(UserContext);

  useEffect(() => {
    // API Call Here GetAllProjects
    // Configuration
    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/all-projects`,
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

  useEffect(() => {
    // Get Recommended Projects
    // Configuration
    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/recommended-projects`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
    };

    axios(config)
      .then((response) => {
        setRecommendedProjects(response.data.recommendedProjects);
      })
      .catch((error) => {
        console.log(error.message);
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
            {recommendedProjects.length > 0 ? (
              recommendedProjects.map((project) => (
                <Component
                  key={project._id}
                  className="mx-auto my-3"
                  to="project/detail"
                  state={{
                    projectId: project._id,
                  }}
                >
                  <Box className="d-flex px-3 py-3 justify-content-between align-items-center border-bottom">
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {project.title}
                    </Typography>
                  </Box>
                  <Box className="px-3 py-2 d-flex justify-content-between align-items-center">
                    <Box
                      className="d-flex align-items-center"
                      sx={{
                        cursor: "pointer",
                        color: "black",
                      }}
                    >
                      <ThumbUp className="me-2" />
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        {project.likes.length}
                      </Typography>
                    </Box>
                  </Box>
                </Component>
              ))
            ) : (
              <p className="text-secondary">
                Add your skills in your profile to get recommended projects
                according to your skills
              </p>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserTimeline;
