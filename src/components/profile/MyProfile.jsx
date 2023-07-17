import {
  Add,
  Check,
  Edit,
  GitHub,
  Language,
  LinkedIn,
} from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { technologies } from "../../data/technologies";
import AddSocialLinksModal from "../modals/AddSocialLinksModal";
import Followers from "./Followers";
import Followings from "./Followings";
import { UserContext } from "../../contexts/UserContext";
import swal from "sweetalert";
import styles from "./MyProfile.module.css";
import SkillsTab from "./tabs/SkillsTab";
import UserProfile from "./UserProfile";
import SocialLinks from "./SocialLinks";
import Popularity from "./Popularity";
import ProjectsCount from "./ProjectsCount";
import TabMenu from "./tabs/TabMenu";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Skill = styled(Box)`
  font-size: 14px;
  color: #0075e1;
  display: inline;
  text-transform: uppercase;
  padding: 8px 16px;
  background-color: #d7d5d5;
`;

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("garbage"),
        },
      })
      .then((response) => {
        setUserProfile(response.data.user);
      })
      .catch((error) => swal("Error", error.response.data.message, "error"));
  }, []);

  const handleTabClick = (e, value) => {
    setTabValue(value);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;
    switch (value) {
      case 0:
        return (
          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            {userProfile ? (
              <Typography variant="h6" className="p-3 fw-bold text-danger">
                Introduction Not Added
              </Typography>
            ) : (
              <Typography className={`p-3`}>{userProfile.about}</Typography>
            )}
          </Box>
        );
      case 1:
        return (
          <SkillsTab
            userProfile={userProfile}
            setSkillsToAdd={setSkillsToAdd}
            skillsToAdd={skillsToAdd}
            setUserProfile={setUserProfile}
          />
        );
      case 2:
        return (
          <Box className="mx-5 my-4" sx={{ borderRadius: "10px" }}>
            <Followers />
          </Box>
        );
      case 3:
        return (
          <Box className="mx-5 my-4" sx={{ borderRadius: "10px" }}>
            <Followings />
          </Box>
        );
    }
    return <div>{value === index && <h2>{children}</h2>}</div>;
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TabMenu tabValue={tabValue} setTabValue={setTabValue} />
          <TabPanel value={tabValue}></TabPanel>
        </Grid>
        <Grid item xs={4} className="border-start px-3 overflow-scroll">
          <UserProfile userProfile={userProfile} />
          <SocialLinks userProfile={userProfile} setOpen={setOpen} />
          <Popularity userProfile={userProfile} />
          <ProjectsCount userProfile={userProfile} />
        </Grid>
      </Grid>
      <AddSocialLinksModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MyProfile;
