import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollBar from "../custom/Scrollbar/ScrollBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageBox from "../custom/Chat/MessageBox";
import NoChats from "../custom/Chat/NoChat";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filterChat, setFilterChat] = useState("");
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");

  const handleArrowBack = () => setSelectedChat(null);
  const handleChatselection = (id) => setSelectedChat({});

  /* ZONA PRUEBA */
  const mockChatArray = [
    {
      id: "chat1",
      receiverId: "user1",
      name: "John Doe",
      image: "https://material-ui.com/static/images/avatar/1.jpg",
      lastMessage: {
        id: "msg1",
        content: "Hey there!",
        url: null,
        date: "10:30 AM",
        userId: "user1",
      },
    },
    {
      id: "chat2",
      receiverId: "user2",
      name: "Jane Smith",
      image: "https://material-ui.com/static/images/avatar/2.jpg",
      lastMessage: {
        id: "msg2",
        content: "How's it going?",
        url: null,
        date: "11:45 AM",
        userId: "user2",
      },
    },
    {
      id: "chat3",
      receiverId: "user3",
      name: "Alex Johnson",
      image: "https://material-ui.com/static/images/avatar/3.jpg",
      lastMessage: {
        id: "msg3",
        content: "Let's meet up later.",
        url: null,
        date: "2:15 PM",
        userId: "user3",
      },
    },
    {
      id: "chat4",
      receiverId: "user4",
      name: "Emily Brown",
      image: "https://material-ui.com/static/images/avatar/4.jpg",
      lastMessage: {
        id: "msg4",
        content: "Just finished the project!",
        url: null,
        date: "3:30 PM",
        userId: "user4",
      },
    },
    {
      id: "chat5",
      receiverId: "user5",
      name: "Michael Wilson",
      image: "https://material-ui.com/static/images/avatar/5.jpg",
      lastMessage: {
        id: "msg5",
        content: "Check out this article.",
        url: "https://example.com/article",
        date: "4:45 PM",
        userId: "user5",
      },
    },
    {
      id: "chat6",
      receiverId: "user6",
      name: "Olivia Garcia",
      image: "https://material-ui.com/static/images/avatar/6.jpg",
      lastMessage: {
        id: "msg6",
        content: "Happy birthday!",
        url: null,
        date: "6:20 PM",
        userId: "user6",
      },
    },
    {
      id: "chat7",
      receiverId: "user7",
      name: "William Martinez",
      image: "https://material-ui.com/static/images/avatar/7.jpg",
      lastMessage: {
        id: "msg7",
        content: "See you at the party.",
        url: null,
        date: "7:55 PM",
        userId: "user7",
      },
    },
    {
      id: "chat8",
      receiverId: "user8",
      name: "Sophia Anderson",
      image: "https://material-ui.com/static/images/avatar/8.jpg",
      lastMessage: {
        id: "msg8",
        content: "What's the plan for tomorrow?",
        url: null,
        date: "9:10 PM",
        userId: "user8",
      },
    },
  ];

  const mockCharBox = {
    id: "chat1",
    receiverId: "user1",
    name: "Usuario seleccionado",
    image: "https://material-ui.com/static/images/avatar/1.jpg",
    messages: {
      $values: [
        {
          id: "msg1",
          content: "Hey there!",
          url: null,
          date: "10:30 AM",
          userId: "user1",
        },
        {
          id: "msg1",
          content: "Hey there!",
          url: null,
          date: "10:30 AM",
          userId: "user2",
        },
        {
          id: "msg1",
          content: "Hey there!",
          url: null,
          date: "10:30 AM",
          userId: "user1",
        },
        {
          id: "msg1",
          content: "Hey there!",
          url: null,
          date: "10:30 AM",
          userId: "user2",
        },
      ],
    },
  };

  const mockMessages = [
    {
      position: "left",
      avatarSrc: "https://material-ui.com/static/images/avatar/1.jpg",
      name: "Remy Sharp",
      content: "Hello there!",
      time: "10:30 AM",
    },
    {
      position: "right",
      avatarSrc: "https://material-ui.com/static/images/avatar/2.jpg",
      name: "John Doe",
      content: "Hi, how are you?",
      time: "11:00 AM",
    },
    {
      position: "left",
      avatarSrc: "https://material-ui.com/static/images/avatar/1.jpg",
      name: "Remy Sharp",
      content: "Hello there! dsfdsfdsf sdf sdf sdf sdf sdfsd",
      time: "10:30 AM",
    },
    {
      position: "right",
      avatarSrc: "https://material-ui.com/static/images/avatar/2.jpg",
      name: "John Doe",
      content:
        "Hi, how are you? sdf sdf sdfsd fdsfdfdsfsd sdfsd fdsf sdfsdf sdfsdfsdf",
      time: "11:00 AM",
    },
    {
      position: "left",
      avatarSrc: "https://material-ui.com/static/images/avatar/1.jpg",
      name: "Remy Sharp",
      content:
        "Hello there! sdfdsfsdfsdf sdfsd dfsdf dssdfsdfd sdfsdf sdfsdf sdfsd sdfsdf",
      time: "10:30 AM",
    },
    {
      position: "right",
      avatarSrc: "https://material-ui.com/static/images/avatar/2.jpg",
      name: "John Doe",
      content:
        "Hi, how are you? sdfdsffddsf fhdsfhsdjk sdhfjkhsdkf ksdfsdjkhfjk jksdfjkdhfkj sdkfksdjhfjk sdkfjksdk",
      time: "11:00 AM",
    },
    {
      position: "left",
      avatarSrc: "https://material-ui.com/static/images/avatar/1.jpg",
      name: "Remy Sharp",
      content:
        "Hello there! ljkldgjkld pero compai sdjb jhfgbd dhfdsfndsknfkj kjdsfjksd",
      time: "10:30 AM",
    },
    {
      position: "right",
      avatarSrc: "https://material-ui.com/static/images/avatar/2.jpg",
      name: "John Doe",
      content:
        "Hi, how are you? ayer esty  dsfiojio dsfjlsdlkfjkldf lkdsnfklsdflsdkfsdklf klsd fklsd fklsd fkl sdklf sdlkf lksdf klsdf kl flsdflkadnsdfbsjfbsf jkhgiohgfngj kjedhfjk ksdjfiof lkdjflsd",
      time: "11:00 AM",
    },
  ];
  /* FIN ZONA PRUEBA */

  const filteredChats = mockChatArray.filter((chat) =>
    chat.name.toLowerCase().includes(filterChat.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Chat
        </Typography>
        <Button
          component={Link}
          to="#"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo chat
        </Button>
      </Stack>
      <Grid container component={Paper} sx={{ width: "100%", height: "75vh" }}>
        <Grid
          item
          xs={!isScreenBelow900px ? 3.8 : selectedChat ? 0 : 12}
          sx={{
            borderRight: isScreenBelow900px
              ? "none"
              : (theme) => `1px solid ${theme.palette.grey[300]}`,
            display: isScreenBelow900px && selectedChat ? "none" : "block",
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          {mockChatArray.length > 0 ? (
            <>
              <Toolbar>
                <TextField
                  value={filterChat}
                  onChange={(e) => setFilterChat(e.target.value)}
                  label="Buscar"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: "25px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Toolbar>
              <Box sx={{ height: "calc(100% - 63.98px)" }}>
                <ScrollBar>
                  <List>
                    {filteredChats.length > 0 ? (
                      filteredChats.map(({ id, name, image, lastMessage }) => (
                        <ListItem key={id} disablePadding>
                          <ListItemButton
                            onClick={handleChatselection}
                            selected={false}
                          >
                            <ListItemIcon>
                              <Avatar alt={name} src={image} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ fontSize: "0.7rem" }}
                                  >
                                    {lastMessage.date}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {lastMessage.content}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <NoChats
                        msg="No hay chats"
                        chatSection={false}
                        Icon={SpeakerNotesOffIcon}
                      />
                    )}
                  </List>
                </ScrollBar>
              </Box>
            </>
          ) : (
            <NoChats
              msg="No hay chats activos"
              chatSection={false}
              Icon={SpeakerNotesOffIcon}
            />
          )}
        </Grid>
        <Grid
          item
          xs={!isScreenBelow900px ? 8.2 : selectedChat ? 12 : 0}
          sx={{
            backgroundColor: "rgba(156, 39, 176, 0.04)",
            display: isScreenBelow900px && !selectedChat ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          {selectedChat ? (
            <>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              >
                <Toolbar>
                  {isScreenBelow900px && (
                    <IconButton>
                      <ArrowBackIcon onClick={handleArrowBack} />
                    </IconButton>
                  )}
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    sx={{ mr: 1, width: 50, height: 50 }}
                  />
                  <Typography variant="h6">nombre aquí</Typography>
                </Toolbar>
              </Box>
              <Box
                sx={{
                  padding: 1,
                  flexGrow: 1,
                  overflowY: "auto",
                  height: 2,
                }}
              >
                <ScrollBar>
                  {mockMessages.map((message, index) => (
                    <MessageBox
                      key={index}
                      position={message.position}
                      avatarSrc={message.avatarSrc}
                      name={message.name}
                      message={message.content}
                      time={message.time}
                    />
                  ))}
                </ScrollBar>
              </Box>
              <Box sx={{ padding: 1 }}>
                <TextField
                  multiline
                  fullWidth
                  label="Mensaje"
                  maxRows={6}
                  InputProps={{
                    sx: {
                      borderRadius: "25px",
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary">
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <NoChats
              msg="Selecciona un chat"
              chatSection={true}
              Icon={ChatBubbleOutlineIcon}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
