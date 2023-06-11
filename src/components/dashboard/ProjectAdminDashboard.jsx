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

const DashboardContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: theme.spacing(3),
}));

const DashboardGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
});

const DashboardCard = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: 5,
  transition: "transform 0.3s ease-in-out",
  textDecoration: "none",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const DashboardIcon = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  marginBottom: theme.spacing(2),
}));

const DashboardTitle = styled(Typography)({
  fontSize: 18,
  color: "black",
  fontWeight: "bold",
  textAlign: "center",
});

const ProjectAdminDashboard = () => {
  const {
    state: { projectId },
  } = useLocation();

  return (
    <DashboardContainer>
      <DrawerHeader />
      <MainTitle variant="h5">Project Admin Dashboard</MainTitle>
      <DashboardGrid>
        <DashboardCard to="project-detail" state={{ projectId }}>
          <DashboardIcon>
            <ViewList color="#1976D2" />
          </DashboardIcon>
          <DashboardTitle>Project Details</DashboardTitle>
        </DashboardCard>
        <DashboardCard to="manage-participants" state={{ projectId }}>
          <DashboardIcon>
            <Groups color="black" />
          </DashboardIcon>
          <DashboardTitle>Manage Participants</DashboardTitle>
        </DashboardCard>
        <DashboardCard to="chatroom" state={{ projectId }}>
          <DashboardIcon>
            <Chat color="#9E9E9E" />
          </DashboardIcon>
          <DashboardTitle>Chatroom</DashboardTitle>
        </DashboardCard>
        <DashboardCard to="assigned-tasks" state={{ projectId }}>
          <DashboardIcon>
            <Assignment color="#E64A19" />
          </DashboardIcon>
          <DashboardTitle>Assigned Tasks</DashboardTitle>
        </DashboardCard>
        <DashboardCard to="admin-approvals" state={{ projectId }}>
          <DashboardIcon>
            <FactCheck color="#009688" />
          </DashboardIcon>
          <DashboardTitle>Admin Approvals</DashboardTitle>
        </DashboardCard>
        <DashboardCard to="completed-tasks" state={{ projectId }}>
          <DashboardIcon>
            <CheckCircle color="green" />
          </DashboardIcon>
          <DashboardTitle>Completed Tasks</DashboardTitle>
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default ProjectAdminDashboard;
