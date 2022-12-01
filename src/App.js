import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/Forms/SignIn.js";
import SignUp from "./Components/Forms/SignUp.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useState, useEffect } from "react";
import GetToken from "./Components/Forms/CachedToken";
import SignOut from "./Components/Forms/SignOut.js";
import ResponsiveAppBar from "./Components/Forms/AppBar.js";
import {
  WrapCards,
  ProfileCards,
  AboutCards,
  HelpCards,
} from "./Components/Forms/Cards.js";
import JournalCards from "./Components/Forms/JournalCards.js";
import { PostJournal } from "./Components/Forms/NewJournal";
import { Grid, Box } from "@mui/material";
import { Full } from "./Components/Forms/NewJournals/Full.js";
import { Standard } from "./Components/Forms/NewJournals/Standard.js";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import { Brief } from "./Components/Forms/NewJournals/Brief.js";
import { GetWraps } from "./Components/Forms/GetWraps.js";
import { GetJournals } from "./Components/Forms/GetJournals";
import { LandingPage } from "./Components/Forms/LandingPage.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();

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

  return (
    <Grid>
      <CssBaseline />

      <main className={classes.container}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Grid>
                  <SignUp />
                </Grid>
              }
            ></Route>

            <Route
              path="/login"
              element={
                <Grid>
                  <SignIn />
                </Grid>
              }
            ></Route>

            <Route
              path="/home"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <LandingPage />
                </Grid>
              }
            ></Route>

            <Route
              path="/wraps"
              element={
                <Grid alignItems="center">
                  {" "}
                  <ResponsiveAppBar />
                  <GetWraps />
                </Grid>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Grid>
                  {" "}
                  <ResponsiveAppBar />
                  <ProfileCards />
                </Grid>
              }
            ></Route>
            <Route
              path="/about"
              element={
                <Grid>
                  {" "}
                  <ResponsiveAppBar />
                  <AboutCards />
                </Grid>
              }
            ></Route>
            <Route
              path="/help"
              element={
                <Grid>
                  {" "}
                  <ResponsiveAppBar />
                  <HelpCards />
                </Grid>
              }
            ></Route>

            <Route
              path="/journals"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <GetJournals />
                </Grid>
              }
            ></Route>
            <Route
              path="/newjournals"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <PostJournal />
                </Grid>
              }
            ></Route>
            <Route
              path="/newjournals/full"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <Full />
                </Grid>
              }
            ></Route>
            <Route
              path="/newjournals/standard"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <Standard />
                </Grid>
              }
            ></Route>
            <Route
              path="/newjournals/brief"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <Brief />
                </Grid>
              }
            ></Route>
          </Routes>
        </Router>
      </main>
    </Grid>
  );
}

export default App;
