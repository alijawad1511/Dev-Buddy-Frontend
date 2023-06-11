import { Edit, GitHub, LinkedIn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SectionTitle = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom
`;

const Skill = styled(Box)`
  font-size: 14px;
  color: #0075e1;
  display: inline;
  text-transform: uppercase;
  padding: 8px 16px;
  background-color: #d7d5d5;
`;

const SocialLink = styled("a")({
  textDecoration: "none",
});

const MyReviews = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            <Box className="d-flex px-3 py-2 border-bottom align-items-center justify-content-between">
              <Typography sx={{ fontSize: "18px" }} className="fw-bold">
                ABOUT
              </Typography>
              <Tooltip title="Edit">
                <IconButton>
                  <Edit fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography className="p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              perferendis nobis quam quibusdam, ab non nulla aspernatur ratione
              labore ipsa quo corporis. Velit, pariatur? Obcaecati illo ipsum ad
              harum consequatur. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Unde perferendis nobis quam quibusdam, ab non
              nulla aspernatur ratione labore ipsa quo corporis. Velit,
              pariatur? Obcaecati illo ipsum ad harum consequatur.
            </Typography>
          </Box>

          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            <Box className="d-flex px-3 py-2 border-bottom align-items-center justify-content-between">
              <Typography sx={{ fontSize: "18px" }} className="fw-bold">
                SKILLS
              </Typography>
              <Tooltip title="Edit">
                <IconButton>
                  <Edit fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box className="d-flex flex-wrap p-3">
              <Skill className="rounded-pill fw-bold me-2 mb-2">REACT</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">node</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">experess</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">mongodb</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">mui</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">
                bootstrap
              </Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">git</Skill>
              <Skill className="rounded-pill fw-bold me-2 mb-2">python</Skill>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="border-start px-3 overflow-scroll">
          <Box className="d-flex flex-column align-items-center mt-5 mb-3">
            <Avatar
              alt="Trevor Henderson"
              src="https://i.ytimg.com/an/spXibirpUHA/6341534521799397715_mq.jpg?v=62b744c2"
              sx={{ width: "150px", height: "150px" }}
            />
            <Typography
              variant="h5"
              sx={{ fontSize: "30px", color: "#0075E1" }}
              className="fw-bold"
            >
              Jawad Shah
            </Typography>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
            >
              Full Stack Developer
            </Typography>
          </Box>
          <Box className="px-3 py-2 mb-3 border rounded">
            <Box className="d-flex align-items-center justify-content-between">
              <Typography
                variant="h5"
                sx={{ fontSize: "18px" }}
                className="fw-bold mb-2"
              >
                SOCIAL LINKS
              </Typography>
              <IconButton>
                <Edit />
              </IconButton>
            </Box>
            <Box className="d-flex align-items-center mb-1">
              <GitHub className="me-2" />
              <SocialLink href="#">GitHub</SocialLink>
            </Box>
            <Box className="d-flex align-items-center mb-1">
              <LinkedIn className="me-2" />
              <SocialLink href="#">LinkedIn</SocialLink>
            </Box>
          </Box>
          <Box className="px-3 py-2 mb-3 border rounded">
            <Box className="d-flex align-items-center justify-content-between">
              <Typography
                variant="h5"
                sx={{ fontSize: "18px" }}
                className="fw-bold mb-2"
              >
                POPULARITY
              </Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Followers</Typography>
              <Typography>45</Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Following</Typography>
              <Typography>24</Typography>
            </Box>
          </Box>
          <Box className="px-3 py-2 mb-3 border rounded">
            <Box className="d-flex align-items-center justify-content-between">
              <Typography
                variant="h5"
                sx={{ fontSize: "18px" }}
                className="fw-bold mb-2"
              >
                PROJECTS
              </Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Published Projects</Typography>
              <Typography>12</Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Participations</Typography>
              <Typography>10</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyReviews;
