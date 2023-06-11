import { Send } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./message/Message";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

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

const SearchField = styled("input")({
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "16px",
});

const ChatBody = styled(Box)`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(202, 205, 207);
    border-radius: 30px;
  }
  height: 420px;
  overflow-y: scroll;
`;

const Chatroom = () => {
  const [sentMessage, setSentMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const { socket } = useContext(UserContext);
  const {
    state: { projectId },
  } = useLocation();

  useEffect(() => {
    const data = JSON.stringify({
      projectId: projectId,
    });

    var config = {
      method: "POST",
      url: "http://localhost:5000/api/projects/chatroom/messages",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("garbage"),
      },
      data,
    };

    axios(config)
      .then((response) => {
        setMessages(response.data.message.chatroom);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  const handleChange = (e) => {
    setSentMessage(e.target.value);
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      // API Call to Send Message
      const data = JSON.stringify({
        projectId: projectId,
        text: sentMessage,
      });

      var config = {
        method: "POST",
        url: "http://localhost:5000/api/projects/chatroom/send-message",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("garbage"),
        },
        data,
      };

      axios(config)
        .then((response) => {
          // Adding New Message in messages array (Update UI)
          setMessages((prevMessages) => [
            ...prevMessages,
            response.data.message,
          ]);

          // Emit the new message to the server
          socket.emit("chat:message", response.data.message);

          // Clear the Send Message Field
          setSentMessage("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Box className="px-5 py-3">
        {/* <MainTitle variant="h5">Chatroom</MainTitle> */}
        <Box>
          <Box className="border px-3 py-2 fw-bold" sx={{ fontSize: "18px" }}>
            Project Title
          </Box>
          <ChatBody className="border px-3 py-3" ref={chatBodyRef}>
            {messages?.map((message) => (
              <Box component="div">
                <Message key={message._id} message={message} />
              </Box>
            ))}
          </ChatBody>
          <Box className="border px-3 py-2">
            <Box
              className="d-flex border px-3 py-1"
              sx={{
                borderRadius: "50px",
              }}
            >
              <SearchField
                type="text"
                value={sentMessage}
                onChange={handleChange}
                onKeyDown={handleEnterKeyDown}
                placeholder="Search Developer Here"
              />
              <Send sx={{ color: "#0075E1", marginLeft: "8px" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatroom;
