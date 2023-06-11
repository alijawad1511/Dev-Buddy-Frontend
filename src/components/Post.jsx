import {
  MoreVert,
  ThumbUp,
  ThumbUpOutlined,
  ViewList,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostContainer = styled("div")({
  width: "600px",
  padding: "0px 20px",
  margin: "20px auto",
  borderRadius: "20px",
  border: "1px solid #999999",
  boxShadow: "0px 0px 6px 4px rgba(153,153,153, 0.2)",
});

const Tag = styled(Typography)`
  font-size: 10px;
  font-weight: 600;
  color: #0075e1;
  background-color: #d7d5d5;
  padding: 6px 8px;
  margin-right: 4px;
  border-radius: 20px;
`;

const LikeButton = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ViewDetailLink = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  cursor: pointer;
  :hover {
    color: #0075e1;
  }
`;

const Post = ({ project }) => {
  const navigate = useNavigate();
  const [projectLiked, setProjectLiked] = useState(project.isLiked);
  const [projectLikeCount, setProjectLikeCount] = useState(project.likeCount);
  const [joinRequest, setJoinRequest] = useState(project.joinRequest);
  const [joined, setJoined] = useState(project.joined);

  // State for handling menu anchor element
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // Open the menu
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLikeClick = () => {
    // API Call
    if (!projectLiked) {
      axios
        .post(
          "http://localhost:5000/api/projects/like",
          { project_id: project._id },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("garbage"),
            },
          }
        )
        .then((response) => {
          // Toggle Like Button
          setProjectLiked((prevState) => !prevState);
          if (!projectLiked) {
            setProjectLikeCount(projectLikeCount + 1);
          } else {
            setProjectLikeCount(projectLikeCount - 1);
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      axios
        .post(
          "http://localhost:5000/api/projects/unlike",
          { project_id: project._id },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("garbage"),
            },
          }
        )
        .then((response) => {
          // Toggle Like Button
          setProjectLiked((prevState) => !prevState);
          if (!projectLiked) {
            setProjectLikeCount(projectLikeCount + 1);
          } else {
            setProjectLikeCount(projectLikeCount - 1);
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleJoinProjectClick = () => {
    const data = JSON.stringify({
      projectId: project._id,
    });

    // Login for API Call for Send and Cancel Join Request
    if (joinRequest) {
      var config = {
        method: "POST",
        url: "http://localhost:5000/api/projects/cancel-join-request",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("garbage"),
        },
        data,
      };

      axios(config)
        .then((response) => {
          setJoinRequest(false);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      var config = {
        method: "POST",
        url: "http://localhost:5000/api/projects/send-join-request",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("garbage"),
        },
        data,
      };

      axios(config)
        .then((response) => {
          setJoinRequest(true);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <PostContainer>
      <div className="header border-bottom py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Avatar
            sx={{ width: 50, height: 50, marginRight: "8px" }}
            src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
          />
          <div>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "bold", color: "#0075E1" }}
            >
              {project.projectAdmin}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "bolder", color: "#999999" }}
            >
              20-12-2023 at 09:34 PM
            </Typography>
          </div>
        </div>
        <div className="buttons">
          {!joined && !project.projectOwned && (
            <Box
              sx={{
                color: joinRequest ? "black" : "white",
                backgroundColor: joinRequest ? "#999999" : "#F84600",
                padding: "6px 16px",
                fontWeight: "500",
                borderRadius: "40px",
                display: "inline-block",
                marginRight: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: joinRequest ? "#747474" : "#de4002",
                },
              }}
              onClick={handleJoinProjectClick}
            >
              {joinRequest ? "Cancel Request" : "Join Project"}
            </Box>
          )}
          <IconButton color="black" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            {/* Menu items */}
            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      <Box className="content pt-2">
        <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "bold" }}>
          {project.title}
        </Typography>
        <Typography sx={{ maxHeight: "120px", overflow: "hidden" }}>
          {project.description}
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between pb-2">
        <Box className="tags w-75 py-1 overflow-hidden">
          {project.tags.map((tag) => (
            <Tag component="span">{tag.toUpperCase()}</Tag>
          ))}
        </Box>
        <ViewDetailLink
          to="project/detail"
          state={{
            projectId: project._id,
          }}
        >
          <ViewList className="me-2" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "bold" }}
            component="span"
          >
            View Details
          </Typography>
        </ViewDetailLink>
      </Box>
      <Box className="footer py-3 border-top">
        <LikeButton
          sx={{
            cursor: "pointer",
            color: projectLiked ? "#0075E1" : "black",
          }}
          onClick={handleLikeClick}
        >
          {projectLiked ? (
            <ThumbUp className="me-2" />
          ) : (
            <ThumbUpOutlined className="me-2" />
          )}
          <Typography
            component="span"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            {projectLikeCount}
          </Typography>
        </LikeButton>
      </Box>
    </PostContainer>
  );
};

export default Post;
