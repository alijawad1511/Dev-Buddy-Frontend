import { Search } from "@mui/icons-material";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Developer from "./Developer";

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

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      userId: localStorage.getItem("garbage"),
    });

    // Configuration
    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/all-developers`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setDevelopers(response.data.developers);
        setFilteredDevelopers(response.data.developers);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchDevelopers = (e) => {
    // Filter data in table on frontend
    if (e.target.value === "") {
      setFilteredDevelopers(developers);
    } else {
      setFilteredDevelopers(
        developers.filter(
          (developer) =>
            developer.firstname
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            developer.lastname
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            developer.domain
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Developers</MainTitle>
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
            onChange={(e) => handleSearchDevelopers(e)}
            placeholder="Search Developer Here"
          />
        </Box>
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
          ) : filteredDevelopers.length > 0 ? (
            filteredDevelopers.map((developer) => (
              <Developer key={developer._id} developer={developer} />
            ))
          ) : (
            <Typography
              variant="h6"
              className="text-center text-primary fw-bold"
            >
              No Developer Found 🙁
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Developers;
