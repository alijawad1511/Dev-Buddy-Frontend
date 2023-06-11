import { MailOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
});

const ForgotPasswordModal = ({ open, setOpen }) => {
  const [socialLink, setSocialLink] = useState("");
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setSocialLink(e.target.value);
  };

  const handleAddSocialLink = (e) => {
    e.preventDefault();
    setOpen(false);
    alert(`URL : ${socialLink}/${username}`);
  };

  return (
    <StyledModal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ width: "40%" }}
        className="text-center"
        borderRadius={3}
        bgcolor="white"
        px={3}
        py={2}
      >
        <MailOutline fontSize="large" />
        <Typography variant="h5" className="mb-4 fw-bold text-success">
          Email Confirmation
        </Typography>
        <Typography className="mb-2">
          We have sent an email to your email address. After receiving the email
          follow the link provided to recover your password
        </Typography>
        <Button type="submit" variant="contained" className="rounded-pill">
          Ok
        </Button>
      </Box>
    </StyledModal>
  );
};

export default ForgotPasswordModal;
