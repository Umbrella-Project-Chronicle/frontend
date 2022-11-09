import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Button, Grid, Typography, Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import useStyles from "../../styles.js";

export const Brief = () => {
  const [success, setSuccess] = useState(false);
  const [overall, setOverall] = useState(5);
  const token = JSON.parse(localStorage.getItem("userToken"));
  const userID = localStorage.getItem("id");
  const classes = useStyles();

  const postJournal = () => {
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 1,
          UserId: userID,
          Ratings: {
            Overall: overall,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        console.log("journal post", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function valuetext(value) {
    return value;
  }

  return (
    <Grid item>
      {success && <Alert severity="success">Submitted Journal!</Alert>}
      <Box>
        <Typography sx={{ fontWeight: "bold", fontSize: 40, letterSpacing: 6 }} className={classes.alignItems}>
          Brief Journal
        </Typography>
      </Box>
      <Divider sx={{ borderBottomWidth: 5, mt: 1, mb: 3 }} />

      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Overall</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          onChange={(event) => setOverall(event.target.value)}
          value={overall}
        />
      </Box>

      <Button
        onClick={() => {
          postJournal();
        }}
        sx={{ mb: "50px" }}
      >
        Submit Journal
      </Button>
    </Grid>
  );
};
