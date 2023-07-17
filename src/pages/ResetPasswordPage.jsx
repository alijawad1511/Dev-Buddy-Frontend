import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/users/reset-password/${id}/${token}`
      )
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => {
        navigate("*");
      });
  }, []);

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Password reset logic
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/reset-password`, {
        userId,
        newPassword,
      })
      .then((response) => {
        // Password Reset Successfully
        swal("Success", response.data.message, "success");
        navigate("/");
      })
      .catch((error) => {
        // Handle the error
        console.log(error.response.data.message);
      });

    // Reset the form
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <form onSubmit={handleResetPassword}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          p: "30px",
          mx: "auto",
          marginTop: "30px",
        }}
      >
        <TextField
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        {error && <Box sx={{ color: "red", mt: 1 }}>{error}</Box>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      </Paper>
    </form>
  );
};

export default ResetPasswordPage;
