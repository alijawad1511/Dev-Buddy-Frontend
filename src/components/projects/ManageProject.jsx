import {
  Assignment,
  Chat,
  CheckCircle,
  FactCheck,
  Groups,
  ViewList,
} from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DashboardItem = styled(Link)`
  width: 250px;
  height: 150px;
  border: 1px solid #999999;
  margin: 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-decoration: none;
  &:hover: {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
  }
`;

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const ManageProject = () => {
  const {
    state: { projectId },
  } = useLocation();

  console.log("Manage Project : ", projectId);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Manage Project</MainTitle>
        <Box className="mt-3 d-flex flex-wrap align-items-center justify-content-between">
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="project-detail"
            state={{ projectId }}
          >
            <ViewList
              sx={{ width: "40px", height: "40px", color: "#1976D2" }}
            />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Project Details
            </Typography>
          </DashboardItem>
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="project-team"
            state={{ projectId }}
          >
            <Groups sx={{ width: "40px", height: "40px", color: "black" }} />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Project Team
            </Typography>
          </DashboardItem>
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="chatroom"
            state={{ projectId }}
          >
            <Chat sx={{ width: "40px", height: "40px", color: "#9E9E9E" }} />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Chatroom
            </Typography>
          </DashboardItem>
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="assigned-tasks"
            state={{ projectId }}
          >
            <Assignment
              sx={{ width: "40px", height: "40px", color: "#E64A19" }}
            />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Assigned Tasks
            </Typography>
          </DashboardItem>
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="admin-approvals"
            state={{ projectId }}
          >
            <FactCheck
              sx={{ width: "40px", height: "40px", color: "#009688" }}
            />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Admin Approvals
            </Typography>
          </DashboardItem>
          <DashboardItem
            sx={{ "&:hover": { boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.25)" } }}
            to="completed-tasks"
            state={{ projectId }}
          >
            <CheckCircle
              sx={{ width: "40px", height: "40px", color: "green" }}
            />
            <Typography
              sx={{ fontSize: "18px", color: "black" }}
              className="mt-2 fw-bold"
            >
              Completed Tasks
            </Typography>
          </DashboardItem>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageProject;
