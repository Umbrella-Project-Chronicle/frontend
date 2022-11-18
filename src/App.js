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
import { Grid } from "@mui/material";
import { Full } from "./Components/Forms/Full.js";
import { Standard } from "./Components/Forms/Standard.js";
import { Container } from "@material-ui/core";
import useStyles from "./styles";
import { Brief } from "./Components/Forms/Brief.js";
import { GetWraps } from "./Components/Forms/GetWraps.js";
import { GetJournals } from "./Components/Forms/GetJournals";

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
    <>
      <CssBaseline />

      <main className={classes.container}>
        <div>
          <Container>
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
                      <GetWraps />
                    </>
                  }
                ></Route>
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
                      <GetJournals />
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
                      <Full />
                    </>
                  }
                ></Route>
                <Route
                  path="/newjournals/standard"
                  element={
                    <>
                      <ResponsiveAppBar />
                      <Standard />
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
              </Routes>
            </Router>
          </Container>
        </div>
      </main>
    </>
  );
}

export default App;
