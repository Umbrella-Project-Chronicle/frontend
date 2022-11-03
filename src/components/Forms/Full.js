import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Button, Grid, Typography, Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import useStyles from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/styles.js";

export const Full = () => {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const userID = localStorage.getItem("id");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const postJournal = () => {
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 3,
          UserId: userID,
          Ratings: {
            Overall: 1,
            Happiness: 1,
            Depression: 1,
            Anxiety: 1,
            Sadness: 1,
            Loneliness: 1,
          },
          Response: text,
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
          Full Journal
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
        />
      </Box>

      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Happiness</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Depression</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Anxiety</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Sadness</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography className={classes.alignItems}>Loneliness</Typography>
        <Slider
          aria-label="rating"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>

      <TextField
        // autoComplete
        placeholder="Journal Here"
        multiline
        fullWidth
        onChange={(event) => setText(event.target.value)}
        value={text}
      />

      <Button
        onClick={() => {
          postJournal();
        }}
        sx={{ mb: "50px" }}
      >
        {" "}
        Submit Journal
      </Button>
    </Grid>
  );
};
