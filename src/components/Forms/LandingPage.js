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

function LandingPage(props) {
  const [journals, setJournals] = useState([]);
  const [gotUser, setGotUser] = useState(false);

  // grab email from successful login
  const location = useLocation();
  const email = location.state.email;

  // for mobile  development
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const container = window !== undefined ? () => window().document.body : undefined;

  // set user after login to
  SetNewUser(email);
  console.log("get Cached user", GetCachedUser());

  // const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });

  const user = GetCachedUser();
  const token = GetToken();

  const greeting = () => {
    if (user) {
      return user.firstName;
    } else {
      return "User";
    }
  };

  const navigate = useNavigate();

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& > *": {
  //       margin: theme.spacing(1),
  //       width: "25ch",
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
    },
  };

  const SignOut = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const GetUserJournals = () => {
    // console.log("GetUserJournals called", "token:", token, "user.id:", user.id);
    axios
      .get("https://localhost:7177/api/journal/user/" + user.id, {
        headers: {
          Authorization: "Bearer " + token,
        },
        UserId: user.id,
      })
      .then((res) => {
        console.log(res);
        setJournals(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postJournal = (text) => {
    // console.log("called postJournal", "tokemn", token, "userID", user.id, "firstName", user.firstName, "text", text);
    axios
      .post("https://localhost:7177/api/journal", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: {
          JournalType: 3,
          UserID: "632b973d18736cc8f6805c58",
          Name: user.firstName,
          Ratings: {
            Overall: 0,
            Happiness: 0,
            Depression: 0,
            Anxiety: 0,
            Sadness: 0,
            Loneliness: 0,
          },
        },
        Response: text,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    greeting();
    if (user) {
      GetUserJournals();
      console.log("journals", journals);
    }
  }, []);

  const areThereJournals = () => {
    if (journals === []) {
      return journals;
    } else {
      return <CircularProgress color="inherit" />;
    }
  };
  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Journals" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SignalCellularAltIcon />
          </ListItemIcon>
          <ListItemText primary="Wraps" />
        </ListItemButton>
        <ListItemButton>
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
            navigate("/user");
          }}
        >
          <ListItemIcon>
            <InsertEmoticonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton>
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
      <Box sx={{ display: "flex", marginRight: 24 }}>
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
            <Button sx={{ color: "black" }} onClick={() => postJournal("hello it worked")}>
              postJournal
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

        <div style={classes.root}>
          <Grid container spacing={3} sx={{ m: 12 }}>
            {/*Create items with different breakpoints */}
            {/*For example,This item will be 12 units wide on extra small screens */}

            <Grid item xs={12} sm={6}>
              <Paper style={classes.paper}>{areThereJournals()}</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={classes.paper}>
                {" "}
                The unanimous Declaration of the thirteen united States of America, When in the Course of human events,
                it becomes necessary for one people to dissolve the political bands which have connected them with
                another, and to assume among the powers of the earth, the separate and equal station to which the Laws
                of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that
                they should declare the causes which impel them to the separation. We hold these truths to be
                self-evident, that all men are created equal, that they are endowed by their Creator with certain
                unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure
                these rights, Governments are instituted among Men, deriving their just powers from the consent of the
                governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of
                the People to alter or to abolish it, and to institute new Government, laying its foundation on such
                principles and organizing its powers in such form, as to them shall seem most likely to effect their Saf
              </Paper>
            </Grid>
          </Grid>
        </div>
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
