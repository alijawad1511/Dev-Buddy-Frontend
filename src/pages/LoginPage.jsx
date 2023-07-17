import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, styled, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import { UserContext } from "../contexts/UserContext";

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
  fontSize: "16px",
  padding: "8px 20px",
  borderRadius: "60px",
  border: "1px solid #999999",
  outline: "none",
  backgroundColor: "#E3F3FF",
});

const LoginButton = styled("button")({
  fontSize: "18px",
  color: "white",
  padding: "8px 20px",
  width: "100%",
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

const StyledLink = styled(Link)`
  margin: 0;
  color: black;
  text-decoration: none;
  text-align: right;
  cursor: pointer;
  :hover {
    color: #f84600;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInUser, setSocket } = useContext(UserContext);

  const dialogStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    width: "400px",
    padding: "25px",
    boxShadow: "0px 0px 15px 4px",
  };

  useEffect(() => {
    if (
      localStorage.getItem("garbage") != undefined ||
      localStorage.getItem("garbage") != null
    ) {
      // Setting Logged In User State from LocalStorage
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));
      navigate("/timeline");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Body
    const data = JSON.stringify({
      email,
      password,
    });

    // Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    // API Call
    axios(config)
      .then((response) => {
        // Storing User Data in Local Storage (Encrypted)
        localStorage.setItem("garbage", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setLoggedInUser(response.data.user);
        navigate("/timeline");
      })
      .catch((error) => {
        swal("Authentication Failed", error.response.data.message, "error");
      });
  };

  return (
    <>
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
        <SubTitle>Sign In</SubTitle>
        <form onSubmit={handleLogin}>
          <InputField
            sx={{ marginBottom: "22px", width: "100%" }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            sx={{ marginBottom: "5px", width: "100%" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledLink to="/forgot-password" sx={{ display: "block" }}>
            Forgot Your Password?
          </StyledLink>
          <LoginButton type="submit">Login</LoginButton>
          <Typography
            component="div"
            sx={{ color: "black", marginLeft: "5px", marginBottom: "10px" }}
          >
            Don't have an account?
            <StyledLink
              to="/signup"
              sx={{
                color: "#F84600",
                fontWeight: "bold",
                "&:hover": {
                  color: "#b33402",
                },
              }}
            >
              Sign Up
            </StyledLink>
          </Typography>
        </form>
      </Dialog>
    </>
  );
};

export default LoginPage;
