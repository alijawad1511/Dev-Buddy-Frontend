import { Search } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Developer from "../developers/Developer";
import ProjectParticipant from "./ProjectParticipant";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ProjectTeam = () => {
  const [projectParticipants, setProjectParticipants] = useState([]);
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      projectId,
    });

    // Configuration
    var config = {
      method: "POST",
      url: "http://localhost:5000/api/projects/participants",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.participants);
        setProjectParticipants(response.data.participants);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const developers = [
    {
      _id: 1,
      firstname: "Jawad",
      lastname: "Shah",
      domain: "Full Stack Developer",
    },
    {
      _id: 2,
      firstname: "Khawaja",
      lastname: "Shaheryar",
      domain: "AI Engineer",
    },
    {
      _id: 3,
      firstname: "Mehroz",
      lastname: "Mustafa",
      domain: "ML Engineer",
    },
    {
      _id: 4,
      firstname: "Javed",
      lastname: "Baloch",
      domain: "Full Stack Developer",
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Project Team</MainTitle>
        <Box
          className="d-flex px-3 py-2 my-3"
          sx={{
            borderRadius: "50px",
            border: "1px solid #999999",
            boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Search sx={{ width: "25px", height: "25px" }} className="me-2" />
          <SearchField type="text" placeholder="Search Team Member" />
        </Box>
        <Box>
          {projectParticipants.map((developer) => (
            <ProjectParticipant key={developer._id} developer={developer} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTeam;
