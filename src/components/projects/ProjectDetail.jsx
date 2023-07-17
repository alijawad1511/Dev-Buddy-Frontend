import { MoreVert, ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Heading = styled(Typography)`
  font-size: 18px;
`;

const Tag = styled(Typography)`
  font-size: 10px;
  font-weight: 600;
  color: #0075e1;
  background-color: #d7d5d5;
  padding: 6px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 20px;
  cursor: pointer;
`;

const LikeButton = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ProjectDetail = () => {
  const {
    state: { projectId },
  } = useLocation();
  const [liked, setLiked] = useState();
  const [projectLikeCount, setProjectLikeCount] = useState();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/project/${projectId}`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
    };

    // API Call
    axios(config)
      .then((response) => {
        setProjectLikeCount(response.data.project.likeCount);
        setLiked(response.data.project.isLiked);
        setProject(response.data.project);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLikeClick = () => {
    // API Call
    if (!liked) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/projects/like`,
          { project_id: project._id },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("garbage"),
            },
          }
        )
        .then((response) => {
          // Response Message
          // Toggle Like Button
          setLiked((prevState) => !prevState);
          if (!liked) {
            setProjectLikeCount(projectLikeCount + 1);
          } else {
            setProjectLikeCount(projectLikeCount - 1);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/projects/unlike`,
          { project_id: project._id },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("garbage"),
            },
          }
        )
        .then((response) => {
          // Response Message
          // Toggle Like Button
          setLiked((prevState) => !prevState);
          if (!liked) {
            setProjectLikeCount(projectLikeCount + 1);
          } else {
            setProjectLikeCount(projectLikeCount - 1);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box className="px-5 py-3">
          <MainTitle variant="h5">{project.title}</MainTitle>
          <Box className="header border-top border-bottom py-3 d-flex align-items-center justify-content-between">
            <Box className="d-flex align-items-center">
              <Avatar
                sx={{ width: 50, height: 50, marginRight: "8px" }}
                src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
              />
              <div>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0075E1",
                  }}
                >
                  {project.projectAdmin}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bolder",
                    color: "#999999",
                  }}
                >
                  Project Admin
                </Typography>
              </div>
            </Box>
            <div className="buttons">
              <LikeButton
                sx={{
                  cursor: "pointer",
                  color: liked ? "#0075E1" : "black",
                }}
                onClick={handleLikeClick}
              >
                {liked ? (
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
            </div>
          </Box>
          <Box className="mt-2 py-2 border-bottom">{project.description}</Box>
          <Typography variant="h5" className="fw-bold my-2">
            Tags
          </Typography>
          <Box className="d-flex flex-wrap tags py-1">
            {/*'?' Check If Array exists or not*/}
            {project.tags?.map((tag) => (
              <Tag
                key={tag}
                component="span"
                sx={{
                  "&:hover": { backgroundColor: "#0075E1", color: "white" },
                }}
              >
                {tag.toUpperCase()}
              </Tag>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProjectDetail;
