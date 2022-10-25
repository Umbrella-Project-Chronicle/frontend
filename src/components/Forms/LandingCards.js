import React from "react";
import { CircularProgress, Grid, Paper, CardHeader, Card } from "@mui/material";

function LandingCards(journals) {
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

  const areThereJournals = () => {
    if (journals === []) {
      return <CircularProgress color="inherit" />;
    } else {
      return journals;
    }
  };

  return (
    <div style={classes.root}>
      <Grid container spacing={3} sx={{ m: 12 }}>
        {/*Create items with different breakpoints */}
        {/*For example,This item will be 12 units wide on extra small screens */}

        <Grid item xs={12} sm={6}>
          <CardHeader title="Your Journals" />
          <Card style={classes.paper}>{areThereJournals()}</Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardHeader title="Your Wraps" />
          <Paper style={classes.paper}>
            <CircularProgress color="inherit" />{" "}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingCards;
