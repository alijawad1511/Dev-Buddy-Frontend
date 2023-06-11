import { Cancel, DoneOutline, Star } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Component = styled(Box)`
  border: 1px solid #999999;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  padding: 6px 20px;
  background-color: #d9d9d9;
  border-radius: 30px;
`;

const Request = ({
  request,
  handleAcceptJoinRequest,
  handleRejectJoinRequest,
}) => {
  const acceptJoinRequest = () => {
    const data = {
      projectId: request.project._id,
      userId: request.user._id,
    };

    handleAcceptJoinRequest(data, request._id);
  };

  const rejectJoinRequest = () => {
    const data = {
      projectId: request.project._id,
      userId: request.user._id,
    };

    handleRejectJoinRequest(data, request._id);
  };

  return (
    <Component
      sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
      className="mx-auto my-3"
      to="joined-dashboard"
    >
      <Box className="d-flex px-3 py-3 justify-content-between align-items-center border-bottom">
        <Box className="d-flex align-items-center">
          <Avatar
            sx={{ width: 50, height: 50, mr: 2 }}
            src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
          />
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                "&:hover": { color: "#0075E1" },
              }}
            >
              {`${request.user.firstname} ${request.user.lastname}`}
            </Typography>
            <Typography sx={{ color: "#515050" }}>
              {request.user.domain}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "between",
            alignItems: "center",
            color: "white",
            borderRadius: "20px",
            px: 3,
            py: 1,
            backgroundColor: "#0075E1",
          }}
        >
          <Star sx={{ mr: 2 }} />
          <Typography sx={{ fontWeight: "bold" }}>24</Typography>
        </Box>
      </Box>
      <Box className="px-3 py-3 d-flex justify-content-between align-items-center">
        <Box>
          <Typography component="span" className="fw-bold">
            Project :{" "}
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#0075E1", "&:hover": { color: "red" } }}
          >
            {request.project.title}
          </Typography>
        </Box>
        <Box>
          <StyledLink
            to=""
            onClick={acceptJoinRequest}
            sx={{
              mr: 1,
              color: "green",
              "&:hover": { color: "green", border: "1px solid green" },
            }}
          >
            <DoneOutline />
          </StyledLink>
          <StyledLink
            to=""
            onClick={rejectJoinRequest}
            sx={{
              color: "red",
              "&:hover": { color: "red", border: "1px solid red" },
            }}
          >
            <Cancel />
          </StyledLink>
        </Box>
      </Box>
    </Component>
  );
};

export default Request;
