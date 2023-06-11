import { DeleteForever } from "@mui/icons-material";
import { Avatar, Box, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Component = styled(Box)`
  border-radius: 5px;
  border: 1px solid #999999;
  padding: 25px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const MainTitle = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  font-weight: bolder;
  color: black;
`;

const ProjectOwner = styled(Typography)`
  font-size: 16px;
  color: #515050;
`;

const StyledButton = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: white;
  padding: 10px 30px;
`;

const Followers = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      userId: localStorage.getItem("garbage"),
    });

    // Configuration
    var config = {
      method: "GET",
      url: "http://localhost:5000/api/users/my-followers",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleRemoveFollowerClick = (developerId) => {
    const data = JSON.stringify({
      followerId: developerId,
    });

    var config = {
      method: "POST",
      url: "http://localhost:5000/api/users/remove-follower",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setFollowers(followers.filter((obj) => obj._id !== developerId));
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box>
      {followers.map((developer) => (
        <Component
          key={developer._id}
          sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
          className="mx-auto my-3 d-flex align-items-center justify-content-between"
        >
          <Box className="d-flex align-items-center">
            <Avatar
              sx={{ width: 50, height: 50 }}
              className="me-2"
              src={developer.profile_pic}
            />
            <Box>
              <MainTitle
                variant="h5"
                to="profile"
                state={{ developerId: developer._id }}
              >{`${developer.firstname} ${developer.lastname}`}</MainTitle>
              <ProjectOwner variant="h6">{developer.domain}</ProjectOwner>
            </Box>
          </Box>
          <StyledButton
            className="rounded-pill me-2"
            sx={{
              backgroundColor: "#e01504",
              "&:hover": { backgroundColor: "#bd1304", color: "white" },
            }}
            onClick={() => handleRemoveFollowerClick(developer._id)}
          >
            <DeleteForever /> Remove
          </StyledButton>
        </Component>
      ))}
    </Box>
  );
};

export default Followers;
