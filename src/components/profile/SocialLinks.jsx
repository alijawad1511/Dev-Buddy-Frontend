import { AddLink, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography, styled } from "@mui/material";
import React from "react";

const SocialLink = styled("a")({
  textDecoration: "none",
});

const SocialLinks = ({ userProfile, setOpen }) => {
  return (
    <Box className="px-3 py-2 mb-3 border rounded">
      <Box className="d-flex align-items-center justify-content-between">
        <Typography
          variant="h5"
          sx={{ fontSize: "18px" }}
          className="fw-bold mb-2"
        >
          SOCIAL LINKS
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <AddLink />
        </IconButton>
      </Box>
      {userProfile?.socialLinks?.map((socialLink) => (
        <Box className="d-flex align-items-center mb-1">
          <SocialLink href={socialLink.url}>{socialLink.platform}</SocialLink>
        </Box>
      ))}
    </Box>
  );
};

export default SocialLinks;
