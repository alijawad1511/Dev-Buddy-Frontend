import { Box, styled, Typography } from "@mui/material";
import React from "react";
import CompletedTask from "./CompletedTask";
import PendingTask from "./PendingTask";
import ProjectTask from "./AssignedTask";

const MainTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CompletedTasks = () => {
  const tasks = [
    {
      id: 1,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "22-01-2023",
      status: "assigned",
    },
    {
      id: 2,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "29-03-2023",
      status: "assigned",
    },
    {
      id: 3,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "22-01-2023",
      status: "assigned",
    },
    {
      id: 4,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "22-01-2023",
      status: "assigned",
    },
    {
      id: 5,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "22-01-2023",
      status: "assigned",
    },
    {
      id: 6,
      summary:
        "Lorem ipsum dolor sit amet consectetur. Amet orci nunc odio ut facilisis consectetur. Porttitor velit imperdiet egestas lacus.",
      dueDate: "22-01-2023",
      status: "assigned",
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        <MainTitle variant="h5">Admin Approvals</MainTitle>
        <Box className="d-flex flex-wrap mt-3">
          {tasks.map((task) => (
            <PendingTask key={task.id} task={task} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CompletedTasks;
