import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreeText from "./Components/Forms/FreeText";
import chronicleLogo from "../src/logo.ico";
import SignIn from "./Components/Forms/SignIn.js";
import SignUp from "./Components/Forms/SignUp.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import LandingPage from "./Components/Forms/JournalCards.js";
import { useState, useEffect } from "react";
import GetToken from "./Components/Forms/CachedToken";
import SignOut from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/SignOut.js";
import ResponsiveAppBar from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/AppBar.js";
import {
  StatsCards,
  WrapCards,
  ProfileCards,
  AboutCards,
  HelpCards,
} from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/Cards.js";
import JournalCards from "./Components/Forms/JournalCards.js";
import { PostJournal } from "./Components/Forms/NewJournal";
import Ratings from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/Ratings.js";
import { Brief } from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/Brief.js";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);

  setInterval(() => {
    // console.log("set 1 min interval for inactivity");
    if (GetToken()) {
      const now = new Date().getTime();
      const setUpTime = Number(localStorage.getItem("setUpTime"));
      // console.log("now", now, "setuptime", setUpTime);
      if (now - setUpTime > 0.5 * 60 * 60 * 1000) {
        SignOut();
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        // console.log("user is logged in");
      }
    } else {
      setIsLoggedIn(false);
      // console.log("user is logged out");
    }
  }, 60 * 1000);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      sx={{
        backgroundImage: `url(${chronicleLogo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 100%",
        backgroundAttachment: "fixed",
        backgroundColor: "#282c34",
      }}
    >
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>

          <Route path="/login" element={<SignIn />}></Route>

          <Route
            path="/wraps"
            element={
              <>
                {" "}
                <ResponsiveAppBar />
                <WrapCards />
              </>
            }
          ></Route>
          {/* <Route
              path="/stats"
              element={
                <>
                  {" "}
                  <ResponsiveAppBar />
                  <StatsCards />
                </>
              }
            ></Route> */}
          <Route
            path="profile"
            element={
              <>
                {" "}
                <ResponsiveAppBar />
                <ProfileCards />
              </>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <>
                {" "}
                <ResponsiveAppBar />
                <AboutCards />
              </>
            }
          ></Route>
          <Route
            path="/help"
            element={
              <>
                {" "}
                <ResponsiveAppBar />
                <HelpCards />
              </>
            }
          ></Route>

          <Route
            path="/journals"
            element={
              <>
                <ResponsiveAppBar />
                <JournalCards />
              </>
            }
          ></Route>
          <Route
            path="/newjournals"
            element={
              <>
                <ResponsiveAppBar />
                <PostJournal />
              </>
            }
          ></Route>
          <Route
            path="/newjournals/full"
            element={
              <>
                <ResponsiveAppBar />
                <Ratings />
              </>
            }
          ></Route>
          <Route
            path="/newjournals/brief"
            element={
              <>
                <ResponsiveAppBar />
                <Brief />
              </>
            }
          ></Route>
          {/* <Route path="/user" element={<LandingPage />}></Route> */}
        </Routes>
      </Router>
      {/* </body> */}
    </Grid>
  );
}

export default App;
