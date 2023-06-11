import {
  MoreVert,
  ThumbUp,
  ThumbUpOutlined,
  ViewList,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";

const PostContainer = styled("div")({
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

const Review = ({ review }) => {
  const [liked, setLiked] = useState(true);

  const reviews = [
    {
      id: 1,
      user: "Jawad Shah",
      date: "12 Feb 2022 at 11:03 am",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate ut maecenas sed elementum vitae quisque aliquet augue eleifend. Mollis leo odio non egestas.",
      project: "Title of the Project",
      rating: 3,
    },
    {
      id: 2,
      user: "Ammar Shah",
      date: "12 Feb 2022 at 11:03 am",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate ut maecenas sed elementum vitae quisque aliquet augue eleifend. Mollis leo odio non egestas.",
      project: "Title of the Project",
      rating: 5,
    },
    {
      id: 1,
      user: "Noman Shah",
      date: "12 Feb 2022 at 11:03 am",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate ut maecenas sed elementum vitae quisque aliquet augue eleifend. Mollis leo odio non egestas.",
      project: "Title of the Project",
      rating: 4,
    },
  ];

  const handleLikeClick = () => {
    setLiked((prevState) => !prevState);
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
              {review.user}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "bolder", color: "#999999" }}
            >
              {review.date}
            </Typography>
          </div>
        </div>
        <IconButton color="black" sx={{ backgroundColor: "#ECEAEA" }}>
          <MoreVert />
        </IconButton>
      </div>
      <Box className="review pt-2">
        <Typography sx={{ height: "120px", overflow: "hidden" }}>
          {review.text}
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-between pb-2">
        <Box className="tags w-75 py-1 overflow-hidden">
          <Tag component="span">REACTJS</Tag>
          <Tag component="span">MONGODB</Tag>
          <Tag component="span">NODEJS</Tag>
          <Tag component="span">EXPRESSJS</Tag>
        </Box>
        <Box className="d-flex align-items-center" sx={{ cursor: "pointer" }}>
          <ViewList className="me-2" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "bold" }}
            component="span"
          >
            View Details
          </Typography>
        </Box>
      </Box>
      <Box className="footer py-3 border-top">
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
            24
          </Typography>
        </LikeButton>
      </Box>
    </PostContainer>
  );
};

export default Review;
