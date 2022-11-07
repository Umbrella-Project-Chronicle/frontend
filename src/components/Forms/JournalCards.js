import * as React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { Typography, Grid, Paper, CircularProgress, CardHeader } from "@mui/material";

function JournalCards(props) {
  const [journals, setJournals] = useState([]);
  // const [user, setUser] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    // for some reason this doesnt setToken in time for api calls
    // setToken(JSON.parse(localStorage.getItem("userToken")));
    GetUserProfile();
  }, []);

  // error handling to make sure user exits nefore rendering first name
  // const greeting = () => {
  //   if (user) {
  //     return user.firstName;
  //   } else {
  //     return "User";
  //   }
  // };

  //api call to get user
  const GetUserProfile = async () => {
    console.log("getuserprofile");
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
      console.log(res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

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
    <Grid item sx={{ width: 300 }}>
      {journals.length >= 1 ? (
        journals.map((journal) =>
          /^\s*$/.test(journal.response) ? (
            <></>
          ) : (
            <Grid>
              <CardHeader key={journal.date} title={Date(Date.UTC(journal.date))} />
              <Paper key={journal.id} style={classes.paper}>
                <Typography sx={{ fontSize: 20 }} noWrap variant="h4">
                  {journal.response}
                  {journal.date}
                </Typography>
              </Paper>
            </Grid>
          )
        )
      ) : (
        <Grid>
          <CardHeader />
          <Paper style={classes.paper}>
            <Typography variant="h5">We don't see any jounrnals</Typography>
            <Typography variant="h8" href="">
              Click here to start your first!
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default JournalCards;
