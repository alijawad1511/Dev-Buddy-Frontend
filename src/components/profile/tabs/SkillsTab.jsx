import React from "react";
import { technologies } from "../../../data/technologies";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { Add } from "@mui/icons-material";

const Skill = styled(Box)`
  font-size: 14px;
  color: #0075e1;
  display: inline;
  text-transform: uppercase;
  padding: 8px 16px;
  background-color: #d7d5d5;
`;

const SkillsTab = ({
  userProfile,
  skillsToAdd,
  setSkillsToAdd,
  setUserProfile,
}) => {
  const handleAddSkills = () => {
    // Update skills in backend
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/users/add-skills`,
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
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          skills: prevProfile.skills.concat(skillsToAdd),
        }));
        setSkillsToAdd([]);
      })
      .catch((error) => swal("Error", error.message, "error"));
  };

  return (
    <Box className="mx-5 my-4 border" sx={{ borderRadius: "10px" }}>
      <Box className="d-flex flex-wrap p-3">
        {userProfile?.skills.length > 0 ? (
          userProfile?.skills.map((skill) => (
            <Skill key={skill} className="rounded-pill fw-bold me-2 mb-2">
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
              (tech) => !userProfile?.skills.includes(tech)
            )}
            value={skillsToAdd}
            onChange={(event, newTags) => setSkillsToAdd(newTags)}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Skill" />}
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
};

export default SkillsTab;
