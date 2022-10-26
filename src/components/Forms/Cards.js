import { Grid, CardHeader, Paper, Typography } from "@mui/material";
import Ratings from "./Ratings.js";
import React from "react";

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

const emotions = ["Overall", "Happiness", "Depression", "Anxiety", "Sadness", "Loneliness"];

export const wrapCards = (
  <div>
    <Grid item xs={12}>
      <CardHeader title="Wraps" />
      <Paper style={classes.paper}>
        <Typography variant="h4">Wraps go here</Typography>
      </Paper>
    </Grid>
  </div>
);

export const statCards = (
  <div>
    {emotions.map((emotion) => (
      <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
        <CardHeader title={emotion} />
        <Paper key={emotion.id} style={classes.paper}>
          <Ratings emotion={emotion} />
        </Paper>
      </Grid>
    ))}
  </div>
);

export const profileCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="profiles" />
      <Paper style={classes.paper}>
        <Typography variant="h4">profiles go here</Typography>
      </Paper>
    </Grid>
  </div>
);
export const aboutCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="abouts" />
      <Paper style={classes.paper}>
        <Typography variant="h4">abouts go here</Typography>
      </Paper>
    </Grid>
  </div>
);
export const helpCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="helps" />
      <Paper style={classes.paper}>
        <Typography variant="h4">helps go here</Typography>
      </Paper>
    </Grid>
  </div>
);
