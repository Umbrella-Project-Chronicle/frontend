import * as React from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  CardHeader,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import GetToken from "./CachedToken.js";
import GetCachedUser from "./CachedUser.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SetNewUser from "./SetUser.js";
import { useState, useEffect } from "react";
// import SignOut from "./SignOut";
import GetUser from "./GetUser";
import { Component } from "react";
import Ratings from "./Ratings";
import LandingCards from "./LandingCards";
import GetUserJournals from "./GetJournals";
import { CloseOutlined } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { wrapCards, statCards, profileCards, aboutCards, helpCards } from "./Cards";

function LandingPage(props) {
  const [journals, setJournals] = useState([]);
  const [gotUser, setGotUser] = useState(false);
  const [user, setUser] = useState([]);
  const [journalPage, setJournalPage] = useState(true);
  const [wrapPage, setWrapPage] = useState(false);
  const [statPage, setStatsPage] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [aboutPage, setAboutPage] = useState(false);
  const [helpPage, setHelpPage] = useState(false);

  // const [token, setToken] = useState("");

  // grab email from successful login
  const location = useLocation();
  const email = location.state.email;

  const navigate = useNavigate();

  useEffect(() => {
    // setToken(JSON.parse(localStorage.getItem("userToken")));
    GetUserProfile();
  }, []);

  //set token

  const greeting = () => {
    if (user) {
      return user.firstName;
    } else {
      return "User";
    }
  };

  const SignOut = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  //api call to get user
  const GetUserProfile = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      console.log("getuserprofile", email, "token", token);
      const res = await axios.get("https://localhost:7177/api/users/search/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser({
        id: res.data.id,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });
      console.log("user profile fetched from api", res);
      GetUserJournals(res.data.id);
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };
  // api call to get journals
  const GetUserJournals = async (userID) => {
    console.log("userid for GetUserJournals", userID);
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      const res = await axios.get(
        "https://localhost:7177/api/journal/user/" + userID,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        {
          UserId: userID,
        }
      );
      console.log("Journals fetched from api", res);
      setJournals(res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

  //api call to create new journals

  const postJournal = (text) => {
    // console.log("called postJournal", "tokemn", token, "userID", user.id, "firstName", user.firstName, "text", text);
    const token = JSON.parse(localStorage.getItem("userToken"));
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 3,
          UserId: user.id,
          Ratings: {
            Overall: 1,
            Happiness: 1,
            Depression: 1,
            Anxiety: 1,
            Sadness: 1,
            Loneliness: 1,
          },
          Response: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("journal post", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const container = window !== undefined ? () => window().document.body : undefined;

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& > *": {
  //       margin: theme.spacing(1),
  //       width: "25ch",
  //       flexGrow: 1,
  //     },
  //   },
  //   gridList: {
  //     width: "100%",
  //     height: "auto",
  //   },
  //   card: {
  //     maxWidth: "auto",
  //     height: "100%",
  //   },
  //   paper: {
  //     padding: 20,
  //     textAlign: "center",
  //     color: "black",
  //     fontFamily: "Roboto",
  //   },
  // }));

  // const classes = useStyles();

  const classes = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: "black",
      fontFamily: "Roboto",
      height: "100%",
      width: "100%",
    },
  };

  const journalCards = (
    <div>
      {journals ? (
        journals.map((journal) => (
          <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
            <CardHeader title={journal.date} />
            <Paper key={journal.id} style={classes.paper}>
              <Typography variant="h4">{journal.response}</Typography>
            </Paper>
          </Grid>
        ))
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );

  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => {
            setJournalPage(true);
            setWrapPage(false);
            setStatsPage(false);
            setProfilePage(false);
            setAboutPage(false);
            setHelpPage(false);
          }}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Journals" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setJournalPage(false);
            setWrapPage(true);
            setStatsPage(false);
            setProfilePage(false);
            setAboutPage(false);
            setHelpPage(false);
          }}
        >
          <ListItemIcon>
            <SignalCellularAltIcon />
          </ListItemIcon>
          <ListItemText primary="Wraps" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setJournalPage(false);
            setWrapPage(false);
            setStatsPage(true);
            setProfilePage(false);
            setAboutPage(false);
            setHelpPage(false);
          }}
        >
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => {
            setJournalPage(false);
            setWrapPage(false);
            setStatsPage(false);
            setProfilePage(true);
            setAboutPage(false);
            setHelpPage(false);
          }}
        >
          <ListItemIcon>
            <InsertEmoticonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setJournalPage(false);
            setWrapPage(false);
            setStatsPage(false);
            setProfilePage(false);
            setAboutPage(true);
            setHelpPage(false);
          }}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setJournalPage(false);
            setWrapPage(false);
            setStatsPage(false);
            setProfilePage(false);
            setAboutPage(false);
            setHelpPage(true);
          }}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            color: "black",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h2" noWrap component="div">
              Hello, {greeting()}
            </Typography>
            <Button
              sx={{ color: "red" }}
              onClick={() => {
                SignOut();
              }}
            >
              Log Out
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => {
                GetUserJournals();
              }}
            >
              GetUserJournals
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {journalPage && journalCards}
        {wrapPage && wrapCards}
        {statPage && statCards}
        {profilePage && profileCards}
        {aboutPage && aboutCards}
        {helpPage && helpCards}
      </Box>
    </div>
  );

  // ResponsiveDrawer.propTypes = {
  //   /**
  //    * Injected by the documentation to work in an iframe.
  //    * You won't need it on your project.
  //    */
  //   window: PropTypes.func,
  // };
}

export default LandingPage;
