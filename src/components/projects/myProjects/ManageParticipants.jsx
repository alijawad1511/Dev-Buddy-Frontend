import { Search } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyProjectParticipant from "./MyProjectParticipant";
import swal from "sweetalert";
import { ProjectContext } from "../../../contexts/ProjectContext";

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const SearchField = styled("input")({
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "16px",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ManageParticipants = () => {
  const { participants, setParticipants } = useContext(ProjectContext);
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    // Body
    const data = JSON.stringify({
      projectId,
    });

    // Configuration
    var config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/projects/participants`,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setParticipants(response.data.participants);
      })
      .catch((error) => {
        swal("Error", error.response.data.message);
      });
  }, []);

  const handleRemoveParticipantClick = (participant) => {
    swal({
      title: "Are you sure?",
      text: `Do you want to remove ${participant.firstname} ${participant.lastname} from your Project Team`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Body
        const data = JSON.stringify({
          projectId,
          participantId: participant._id,
        });

        // Configuration
        var config = {
          method: "POST",
          url: `${process.env.REACT_APP_BASE_URL}/api/projects/remove-participant`,
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("garbage"),
          },
          data,
        };

        axios(config)
          .then((response) => {
            // Update Frontend by changing state
            setParticipants(
              // projectParticipants.filter((obj) => obj._id !== participant._id)
              participants.filter((obj) => obj._id !== participant._id)
            );
            swal("Success!", response.data.message, "success");
          })
          .catch((error) => {
            swal("Error!", error.response.data.message, "error");
          });
      }
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Manage Participants</MainTitle>
        <Box
          className="d-flex px-3 py-2 my-3"
          sx={{
            borderRadius: "50px",
            border: "1px solid #999999",
            boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Search sx={{ width: "25px", height: "25px" }} className="me-2" />
          <SearchField type="text" placeholder="Search Team Member" />
        </Box>
        <Box>
          {participants?.map((developer) => (
            <MyProjectParticipant
              key={developer._id}
              handleRemoveParticipantClick={handleRemoveParticipantClick}
              developer={developer}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageParticipants;
