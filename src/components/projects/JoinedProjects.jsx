import { Search } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JoinedProject from "./JoinedProject";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const JoinedProjects = () => {
  const navigate = useNavigate();
  const [joinedProjects, setJoinedProjects] = useState([]);

  useEffect(() => {
    // API Call Here GetAllJoinedProjects

    // Body
    const data = JSON.stringify({
      userId: localStorage.getItem("garbage"),
    });

    // Configuration
    var config = {
      method: "GET",
      url: "http://localhost:5000/api/projects/joined-projects",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setJoinedProjects(response.data.joinedProjects);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Joined Projects</MainTitle>
        <Box
          className="d-flex px-3 py-2 my-3"
          sx={{
            borderRadius: "50px",
            border: "1px solid #999999",
            boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Search sx={{ width: "25px", height: "25px" }} className="me-2" />
          <SearchField type="text" placeholder="Search Project Here" />
        </Box>
        <Box>
          {joinedProjects.length > 0 ? (
            joinedProjects.map((project) => (
              <JoinedProject key={project._id} project={project} />
            ))
          ) : (
            <Typography
              variant="h6"
              className="text-center text-primary fw-bold"
            >
              No Project Joined Yet 🙁
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JoinedProjects;
