import { ThumbUp } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, styled, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Component = styled(Link)`
  border: 1px solid #999999;
  border-radius: 10px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
  }
`;

const StyledLink = styled(Link)`
  padding: 6px 20px;
  background-color: #d9d9d9;
  border-radius: 30px;
`;

const JoinedProject = ({ project }) => {
  const handleClick = (id) => {
    // Get Project Detail using Project ID
  };

  return (
    <>
      <Component
        className="mx-auto my-3"
        to="joined-dashboard"
        state={{ projectId: project._id }}
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
                  color: "black",
                  "&:hover": { color: "#0075E1" },
                }}
              >
                {project.projectAdmin}
              </Typography>
              <Typography sx={{ color: "#515050", fontSize: "14px" }}>
                Project Admin
              </Typography>
            </Box>
          </Box>
          <AvatarGroup max={3}>
            <Avatar
              alt="Remy Sharp"
              src="https://www.physics.wisc.edu/wp-content/uploads/2022/05/20220506_Banquet_126-scaled-e1652203317180-300x300.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
            />
            <Avatar alt="Cindy Baker" src="http://i.imgur.com/nH3y3uy.jpg" />
            <Avatar
              alt="Agnes Walker"
              src="https://avatarfiles.alphacoders.com/106/thumb-106689.jpg"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
            />
          </AvatarGroup>
        </Box>
        <Box className="px-3 py-2 d-flex justify-content-between align-items-center">
          <Box>
            <Typography component="span" className="fw-bold text-dark">
              Project :{" "}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "#0075E1", "&:hover": { color: "red" } }}
            >
              {project.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
              color: "white",
              borderRadius: "20px",
              px: 2,
              py: 1,
              backgroundColor: "#0075E1",
            }}
          >
            <ThumbUp sx={{ mr: 1 }} />
            <Typography sx={{ fontWeight: "bold" }}>
              {project.likeCount}
            </Typography>
          </Box>
        </Box>
      </Component>
    </>
  );
};

export default JoinedProject;
