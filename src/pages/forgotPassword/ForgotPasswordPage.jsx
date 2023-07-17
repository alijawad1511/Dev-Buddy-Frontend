import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";
import { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { ArrowBackIosNew, Email, ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import swal from "sweetalert";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/users/forgot-password`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        // Handle the successful response here
        swal("Reset Password", response.data.message, "success");
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
        setErrorMessage(error.response.data.message);
        // Handle the error here
      });
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <form className={styles.formBody} onSubmit={handleResetPassword}>
        <ErrorOutline
          style={{
            width: "60px", // Set the width
            height: "60px", // Set the height
            color: "rgb(0, 107, 179)", // Set the color
            marginBottom: "30px",
          }}
        />
        <h2 className={styles.formTitle}>Forgot Password</h2>
        <p className={styles.formText}>
          Enter your email and we'll send you a link to reset your password
        </p>
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          variant="standard"
          style={{ width: "100%" }} // Set the width to 100%
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={styles.errorMessage}>{errorMessage}</p>
        <Button
          variant="contained"
          type="submit"
          color="success"
          style={{ width: "100%", marginBottom: "30px", marginTop: "30px" }} // Set the width to 100%
        >
          Reset Password
        </Button>
        <Box
          onClick={handleBackToLogin}
          style={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBackIosNew fontSize="small" />
          Back to Login
        </Box>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
