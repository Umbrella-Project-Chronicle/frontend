import { Grid, CardHeader, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

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

export const ProfileCards = () => {
  const [user, setUser] = useState({});
  const GetUser = async () => {
    console.log("getuser ran");
    // needs to be set in each api call in order to assure the variable is set
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      const res = await axios.get(
        "https://localhost:7177/api/users/search/" +
          localStorage.getItem("email"),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("getuser", res.data);
      setUser(res.data);
      // return res.data;

      // console.log("user profile fetched from api", res);
      // gets user jounrals only if user is successfully fetched from api
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <Grid container justify="center">
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        direction="row"
        evelvation={6}
        square
      >
        <CardHeader title="profiles" />
        <Paper style={classes.paper}>
          <Typography variant="h4">{user.firstName}</Typography>
          <Typography variant="h4">{user.lastName}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export const AboutCards = () => {
  <div style={{ marginTop: "100px" }}>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="abouts" />
      <Paper style={classes.paper}>
        <Typography variant="h4">abouts go here</Typography>
      </Paper>
    </Grid>
  </div>;
};

export const HelpCards = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
        <CardHeader title="helps" />
        <Paper style={classes.paper}>
          <Typography variant="h4">helps go here</Typography>
        </Paper>
      </Grid>
    </div>
  );
};
