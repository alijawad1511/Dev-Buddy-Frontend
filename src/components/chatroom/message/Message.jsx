import { Avatar, Box, styled, Typography } from "@mui/material";
import React from "react";

const Component = styled(Box)`
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  display: inline-block;
  min-width: 50%;
`;

const Message = ({ message }) => {
  const createdAt = new Date(message.createdAt);

  // Format Time as "10:23 AM"
  const time = createdAt.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Format Date as "07 June 2023"
  const date = createdAt.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Component>
      <Box className="header pb-2 d-flex align-items-center justify-content-between">
        <Box className="d-flex align-items-center">
          <Avatar
            sx={{ width: 40, height: 40, marginRight: "8px" }}
            src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
          />
          <div>
            <Typography
              variant="h5"
              sx={{ fontSize: "16px", fontWeight: "bold", color: "#0075E1" }}
            >
              {`${message.sender.firstname} ${message.sender.lastname}`}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "12px",
                fontWeight: "bolder",
                color: "#999999",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", color: "#515050" }}
                className="fw-bold"
                component="span"
              >
                {date}
              </Typography>
              {" - "}
              <Typography
                sx={{ fontSize: "12px", color: "#515050" }}
                component="span"
                className="fw-bold"
              >
                {time}
              </Typography>
            </Typography>
          </div>
        </Box>
      </Box>
      <Typography>{message.text}</Typography>
    </Component>
  );
};

export default Message;
