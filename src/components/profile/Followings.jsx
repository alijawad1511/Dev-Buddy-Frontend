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

const Followings = () => {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      userId: localStorage.getItem("garbage"),
    });

    // Configuration
    var config = {
      method: "GET",
      url: "http://localhost:5000/api/users/my-followings",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setFollowings(response.data.following);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleUnfollowClick = (developerId) => {
    const data = JSON.stringify({
      followingId: developerId,
    });

    var config = {
      method: "POST",
      url: "http://localhost:5000/api/users/unfollow",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setFollowings(followings.filter((obj) => obj._id !== developerId));
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box>
      {followings.map((developer) => (
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
              backgroundColor: "#999999",
              "&:hover": { backgroundColor: "#747474", color: "white" },
            }}
            onClick={() => handleUnfollowClick(developer._id)}
          >
            Unfollow
          </StyledButton>
        </Component>
      ))}
    </Box>
  );
};

export default Followings;
