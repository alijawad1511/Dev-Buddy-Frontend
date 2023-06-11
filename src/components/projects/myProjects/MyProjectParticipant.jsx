import { Delete, Feedback, PersonRemove, Report } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

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

const MyProjectParticipant = ({ developer, handleRemoveParticipantClick }) => {
  const handleReviewClick = () => {
    swal({
      title: "Information",
      text: "This feature is in development phase. Be patient and enjoy other features 😊",
      icon: "info",
    });
  };

  return (
    <Component
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
      <Box>
        <Tooltip title="Remove Participant">
          <IconButton onClick={() => handleRemoveParticipantClick(developer)}>
            <PersonRemove />
          </IconButton>
        </Tooltip>
        <Tooltip title="Give Review">
          <IconButton onClick={handleReviewClick}>
            <Feedback />
          </IconButton>
        </Tooltip>
      </Box>
    </Component>
  );
};

export default MyProjectParticipant;
