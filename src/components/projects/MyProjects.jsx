import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyProject from "./MyProject";
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

const MyProjects = () => {
  const navigate = useNavigate();
  const [myProjects, setMyProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Call Here GetAllProjects

    // Body
    const data = JSON.stringify({
      userId: localStorage.getItem("garbage"),
    });

    // Configuration
    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/my-projects`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setMyProjects(response.data.myProjects);
        setFilteredProjects(response.data.myProjects);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchMyProjects = (e) => {
    // Filter data in table on frontend
    if (e.target.value === "") {
      setFilteredProjects(myProjects);
    } else {
      setFilteredProjects(
        myProjects.filter((project) =>
          project.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">My Projects</MainTitle>
        <Box
          className="d-flex px-3 py-2 my-3"
          sx={{
            borderRadius: "50px",
            border: "1px solid #999999",
            boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Search sx={{ width: "25px", height: "25px" }} className="me-2" />
          <SearchField
            type="text"
            onChange={(e) => handleSearchMyProjects(e)}
            placeholder="Search Project Here"
          />
        </Box>
        <Button
          className="rounded-pill fw-bold"
          color="success"
          variant="contained"
          onClick={() => navigate("create-project")}
        >
          <Add /> Create Project
        </Button>
        <Box>
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
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <MyProject key={project._id} project={project} />
            ))
          ) : (
            <Typography
              variant="h6"
              className="text-center text-primary fw-bold"
            >
              No Project Found
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProjects;
