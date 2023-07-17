import {
  Box,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Title = styled(Typography)`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0px;
`;

const SubTitle = styled(Typography)`
  font-size: 26px;
  font-weight: bold;
  color: #a9a9a9;
  text-align: center;
  margin-bottom: 30px;
`;

const InputField = styled("input")({
  padding: "8px 20px",
  borderRadius: "60px",
  border: "1px solid #999999",
  outline: "none",
  backgroundColor: "#E3F3FF",
});

const SignUpButton = styled("input")({
  fontSize: "18px",
  width: "100%",
  color: "white",
  padding: "8px 20px",
  marginTop: "22px",
  marginBottom: "10px",
  borderRadius: "60px",
  border: "1px solid #999999",
  outline: "none",
  backgroundColor: "#F84600",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#db4104",
  },
});

const dialogStyle = {
  backgroundColor: "white",
  borderRadius: "20px",
  width: "400px",
  padding: "25px",
  boxShadow: "0px 0px 15px 4px",
};

const StyledLink = styled(Link)`
  margin: 0;
  text-decoration: none;
  text-align: right;
  cursor: pointer;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Sign Up");
    // SignUp API Call Here
    // Body
    const data = JSON.stringify({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    // Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    // API Call
    axios(config)
      .then((response) => {
        swal("Success", response.data.message, "success");
        // Navigate to Login Page
        navigate("/");
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Title>
        Dev
        <Typography
          component="span"
          sx={{ fontSize: "36px", fontWeight: "bold", color: "#F84600" }}
        >
          Buddy
        </Typography>
      </Title>
      <SubTitle>Sign Up</SubTitle>
      <form onSubmit={handleSignup}>
        <Box className="d-flex mb-3">
          <InputField
            className="flex-fill w-25 me-2"
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputField
            className="flex-fill w-25"
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Box>
        <InputField
          className="mb-3 w-100"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <InputField
          className="mb-3 w-100"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <InputField
          className="mb-1 w-100"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <SignUpButton type="submit" value="Sign Up" />
        <Typography
          component="p"
          sx={{ color: "black", marginLeft: "5px", marginBottom: "10px" }}
        >
          Already have an account?
          <StyledLink
            to="/"
            sx={{
              color: "#F84600",
              fontWeight: "bold",
              "&:hover": {
                color: "#b33402",
              },
            }}
          >
            Login
          </StyledLink>
        </Typography>
      </form>
    </Dialog>
  );
};

export default SignUpPage;
