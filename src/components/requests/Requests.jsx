import { Search } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Request from "./Request";

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

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // API Call Here GetAllProjects

    // Configuration
    var config = {
      method: "GET",
      url: "http://localhost:5000/api/projects/join-requests",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
    };

    axios(config)
      .then((response) => {
        setRequests(response.data.joinRequests);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAcceptJoinRequest = (data, id) => {
    // Accept Project Join Request

    var config = {
      method: "POST",
      url: "http://localhost:5000/api/projects/accept-join-request",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((response) => {
        console.log(response.data.message);
        // Update Requests on UI
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRejectJoinRequest = (data, id) => {
    // Reject Project Join Request

    var config = {
      method: "POST",
      url: "http://localhost:5000/api/projects/reject-join-request",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((response) => {
        console.log(response.data.message);
        // Update Requests on UI
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Participant Requests</MainTitle>
        <Box
          className="d-flex px-3 py-2 my-3"
          sx={{
            borderRadius: "50px",
            border: "1px solid #999999",
            boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Search sx={{ width: "25px", height: "25px" }} className="me-2" />
          <SearchField type="text" placeholder="Search Here" />
        </Box>
        <Box>
          {requests.length > 0 ? (
            requests.map((request) => (
              <Request
                key={request._id}
                handleAcceptJoinRequest={handleAcceptJoinRequest}
                handleRejectJoinRequest={handleRejectJoinRequest}
                request={request}
              />
            ))
          ) : (
            <Typography
              variant="h6"
              className="text-center text-primary fw-bold"
            >
              No Join Request
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Requests;
