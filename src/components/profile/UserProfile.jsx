import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const UserProfile = ({ userProfile }) => {
  return (
    <Box className="d-flex flex-column align-items-center mt-5 mb-3">
      <Avatar
        alt="Trevor Henderson"
        src={userProfile?.profile_pic}
        sx={{ width: "150px", height: "150px" }}
      ></Avatar>
      <Typography
        variant="h5"
        sx={{ fontSize: "30px", color: "#0075E1" }}
        className="fw-bold"
      >
        {`${userProfile?.firstname} ${userProfile?.lastname}`}
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
        {userProfile?.domain}
      </Typography>
    </Box>
  );
};

export default UserProfile;
