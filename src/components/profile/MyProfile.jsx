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

const SocialLink = styled("a")({
  textDecoration: "none",
});

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(userProfile?.about || "");
  const [openModal, setOpenModal] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("garbage"),
        },
      })
      .then((response) => {
        setUserProfile(response.data.user);
        setSkills(response.data.user.skills);
        console.log(response.data.user.socialLinks);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleTabClick = (e, value) => {
    setTabValue(value);
  };

  const [skills, setSkills] = useState([]);

  const handleAddSkills = () => {
    // Update skills in backend
    axios
      .post(
        "http://localhost:5000/api/users/add-skills",
        {
          skills: skillsToAdd,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
        }
      )
      .then((response) => {
        setUserProfile(response.data.user);
        setSkills(skills.concat(skillsToAdd));
        setSkillsToAdd([]);
      })
      .catch((error) => console.log(error.message));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleSaveClick = () => {
    // Update the About text
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      about: editedText,
    }));

    // Close the modal and reset the editing state and edited text
    setIsEditing(false);
    setOpenModal(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setOpenModal(false);
    setEditedText(userProfile?.about || "");
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;
    switch (value) {
      case 0:
        return (
          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", pt: 1, pr: 1 }}
            >
              <IconButton>
                <Edit />
              </IconButton>
            </Box>
            <Typography className="p-3">{userProfile?.about}</Typography>
          </Box>
        );
      case 1:
        return (
          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            <Box className="d-flex flex-wrap p-3">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Skill className="rounded-pill fw-bold me-2 mb-2">
                    {skill}
                  </Skill>
                ))
              ) : (
                <Typography variant="h6" className="fw-bold text-danger">
                  No Skill Added
                </Typography>
              )}
            </Box>
            <Box className="d-flex flex-wrap p-3">
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={technologies.filter(
                    (tech) => !skills.includes(tech)
                  )}
                  value={skillsToAdd}
                  onChange={(event, newTags) => setSkillsToAdd(newTags)}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Skill" />
                  )}
                />
              </FormControl>
              <Button
                variant="outlined"
                onClick={handleAddSkills}
                startIcon={<Add />}
              >
                Add Skills
              </Button>
            </Box>
          </Box>
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
          <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
            <Tabs
              value={tabValue}
              variant="fullWidth"
              onChange={handleTabClick}
            >
              <Tab label="About" />
              <Tab label="Skills" />
              <Tab label="Followers" />
              <Tab label="Following" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue}></TabPanel>
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
              {`${userProfile?.firstname} ${userProfile?.lastname}`}
            </Typography>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
            >
              {userProfile?.domain}
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
              <IconButton onClick={() => setOpen(true)}>
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
            <Box className="d-flex align-items-center mb-1">
              <Language className="me-2" />
              <SocialLink href="#">Website</SocialLink>
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
              <Typography>{userProfile?.followerCount}</Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Following</Typography>
              <Typography>{userProfile?.followingCount}</Typography>
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
              <Typography>{userProfile?.publishedProjectCount}</Typography>
            </Box>
            <Box className="d-flex align-items-center justify-content-between mb-1">
              <Typography className="fw-bold">Participations</Typography>
              <Typography>10</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddSocialLinksModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MyProfile;
