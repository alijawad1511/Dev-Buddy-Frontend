import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
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

const Participant = ({ participant }) => {
  const handleClick = (id) => {
    // Get Project Detail using Project ID
  };
  return (
    <Component
      sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
      className="mx-auto my-3 d-flex align-items-center justify-content-between"
      to="joined-dashboard"
    >
      <Box className="d-flex align-items-center">
        <Avatar
          sx={{ width: 50, height: 50 }}
          className="me-2"
          src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
        />
        <Box>
          <MainTitle variant="h5">Jawad Shah</MainTitle>
          <ProjectOwner variant="h6">MERN Stack Developer</ProjectOwner>
        </Box>
      </Box>
      <StyledButton
        className="rounded-pill me-2"
        sx={{
          backgroundColor: "#0075e1",
          "&:hover": { backgroundColor: "#026bcc", color: "white" },
        }}
      >
        Follow
      </StyledButton>
    </Component>
  );
};

export default Developer;
