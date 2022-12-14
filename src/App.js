import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/Forms/SignIn.js";
import SignUp from "./Components/Forms/SignUp.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import ResponsiveAppBar from "./Components/Forms/AppBar.js";
import { NewJournal } from "./Components/Forms/NewJournal";
import { Grid } from "@mui/material";
import { Full } from "./Components/Forms/NewJournals/Full.js";
import { Standard } from "./Components/Forms/NewJournals/Standard.js";
import { Brief } from "./Components/Forms/NewJournals/Brief.js";
import { GetWraps } from "./Components/Forms/GetWraps.js";
import { GetJournals } from "./Components/Forms/GetJournals";
import { LandingPage } from "./Components/Forms/LandingPage.js";
import { AboutCards } from "./Components/Forms/About.js";
import { EditJournal } from "./Components/Forms/EditJournal.js";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

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
                <Grid>
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
                </Grid>
              }
            ></Route>
            <Route
              path="/about"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <AboutCards />
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
              path="/test"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <EditJournal />
                </Grid>
              }
            ></Route>
            <Route
              path="/newjournals"
              element={
                <Grid>
                  <ResponsiveAppBar />
                  <NewJournal />
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
