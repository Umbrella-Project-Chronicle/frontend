import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Button, Grid, Typography, Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import useStyles from "../../styles.js";

export const Full = () => {
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [overall, setOverall] = useState(5);
  const [happiness, setHappiness] = useState(5);
  const [depression, setDepression] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [sadness, setSadness] = useState(5);
  const [loneliness, setLoneliness] = useState(5);
  const token = JSON.parse(localStorage.getItem("userToken"));
  const userID = localStorage.getItem("id");
  const classes = useStyles();

  const postJournal = () => {
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 3,
          UserId: userID,
          Ratings: {
            Overall: overall,
            Happiness: happiness,
            Depression: depression,
            Anxiety: anxiety,
            Sadness: sadness,
            Loneliness: loneliness,
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
          onChange={(event) => setOverall(event.target.value)}
          value={overall}
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
          onChange={(event) => setHappiness(event.target.value)}
          value={happiness}
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
          onChange={(event) => setDepression(event.target.value)}
          value={depression}
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
          onChange={(event) => setAnxiety(event.target.value)}
          value={anxiety}
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
          onChange={(event) => setSadness(event.target.value)}
          value={sadness}
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
          onChange={(event) => setLoneliness(event.target.value)}
          value={loneliness}
        />
      </Box>
      <Box
        sx={{
          boxShadow: 4,
          p: 3,
          backgroundColor: "gray",
        }}
      >
        <TextField
          // autoComplete
          placeholder="Journal Here"
          multiline
          fullWidth
          onChange={(event) => setText(event.target.value)}
          value={text}
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
