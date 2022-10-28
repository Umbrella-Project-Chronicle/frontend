import * as React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { Typography, Grid, Paper, CircularProgress, CardHeader } from "@mui/material";

function JournalCards(props) {
  const [journals, setJournals] = useState([]);
  const [user, setUser] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    // for some reason this doesnt setToken in time for api calls
    // setToken(JSON.parse(localStorage.getItem("userToken")));
    GetUserProfile();
  }, []);

  // error handling to make sure user exits nefore rendering first name
  const greeting = () => {
    if (user) {
      return user.firstName;
    } else {
      return "User";
    }
  };

  //api call to get user
  const GetUserProfile = async () => {
    // needs to be set in each api call in order to assure the variable is set
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      const res = await axios.get("https://localhost:7177/api/users/search/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      localStorage.setItem("id", res.data.id);
      GetUserJournals(res.data.id);
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };
  // api call to get journals
  const GetUserJournals = async (userID) => {
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
      // console.log("Journals fetched from api", res);
      setJournals(res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

  //api call to create new journals

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

  //parses through journals and displays them in cards on render. styling needs done

  return (
    <div style={{ marginTop: "100px" }}>
      {journals.length > 1 ? (
        journals.map((journal) => (
          <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
            <CardHeader key={journal.date} title={journal.date} />
            <Paper key={journal.id} style={classes.paper}>
              <Typography variant="h4">{journal.response}</Typography>
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
          <CardHeader />
          <Paper style={classes.paper}>
            <Typography variant="h5">We don't see any jounrnals</Typography>
            <Typography variant="h8" href="">
              Click here to start your first!
            </Typography>
          </Paper>
        </Grid>
      )}
    </div>
  );
}

export default JournalCards;
