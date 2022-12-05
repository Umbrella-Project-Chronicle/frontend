import axios from "axios";
import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Modal,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import useStyles from "/Users/eliotpitman/Desktop/umbrella/frontend/src/styles.js";

import { useMediaQuery } from "react-responsive";

export const EditJournal = ({ journal }) => {
  const [updatedText, setUpdatedText] = useState(journal.response);
  const userID = localStorage.getItem("id");
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [updatedOverall, setUpdatedOverall] = useState(journal.ratings.overall);
  const [updatedHappiness, setUpdatedHappiness] = useState(
    journal.ratings.happiness
  );
  const [updatedDepression, setUpdatedDepression] = useState(
    journal.ratings.depression
  );
  const [updatedAnxiety, setUpdatedAnxiety] = useState(journal.ratings.anxiety);
  const [updatedSadness, setUpdatedSadness] = useState(journal.ratings.sadness);
  const [updatedLoneliness, setUpdatedLoneliness] = useState(
    journal.ratings.loneliness
  );
  const [success, setSuccess] = useState(false);

  const classes = useStyles();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const ratingSize = () => {
    const mobile = {
      width: "100%",
    };
    const desktop = {
      width: "44%",
    };

    if (isMobile) {
      return mobile;
    } else {
      return desktop;
    }
  };
  function valuetext(value) {
    return value;
  }

  const updateJournal = () => {
    console.log(journal.id);
    axios
      .put(
        "https://localhost:7177/api/journal/" + journal.id,
        {
          JournalType: journal.journalType,
          UserId: userID,
          Ratings: {
            Overall: updatedOverall,
            Happiness: updatedHappiness,
            Depression: updatedDepression,
            Anxiety: updatedAnxiety,
            Sadness: updatedSadness,
            Loneliness: updatedLoneliness,
          },
          Response: updatedText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("journal updated", res);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid>
      <Box>
        <button
          onClick={() => {
            updateJournal();
          }}
        ></button>
      </Box>
      <Grid
        sx={{
          mt: 4,
          boxShadow: 4,
          bgcolor: "rgba(240, 240, 240,0.5)",
          m: 5,
          p: 2,
          borderRadius: 1,
        }}
      >
        <Box sx={{ justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 40,
              letterSpacing: 12,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Full Journal
          </Typography>
        </Box>
        <Divider sx={{ borderBottomWidth: 5, mt: 1, mb: 3 }} />
        {journal.id}
        <Box
          sx={{
            backgroundColor: "gray",
            boxShadow: 4,
            display: "flex",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Overall</Typography>
            <Slider
              aria-label="rating"
              defaultValue={journal.ratings.overall}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedOverall(event.target.value)}
              value={updatedOverall}
            />
          </Box>

          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Happiness</Typography>
            <Slider
              aria-label="rating"
              defaultValue={updatedHappiness}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedHappiness(event.target.value)}
              value={updatedHappiness}
            />
          </Box>
          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Depression</Typography>
            <Slider
              aria-label="rating"
              defaultValue={updatedDepression}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedDepression(event.target.value)}
              value={updatedDepression}
            />
          </Box>
          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Anxiety</Typography>
            <Slider
              aria-label="rating"
              defaultValue={updatedAnxiety}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedAnxiety(event.target.value)}
              value={updatedAnxiety}
            />
          </Box>
          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Sadness</Typography>
            <Slider
              aria-label="rating"
              defaultValue={updatedSadness}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedSadness(event.target.value)}
              value={updatedSadness}
            />
          </Box>
          <Box
            sx={{
              width: ratingSize().width,
              backgroundColor: "gray",
              boxShadow: 4,
              m: 3,
              borderRadius: 1,
            }}
          >
            <Typography className={classes.alignItems}>Loneliness</Typography>
            <Slider
              aria-label="rating"
              defaultValue={updatedLoneliness}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => setUpdatedLoneliness(event.target.value)}
              value={updatedLoneliness}
            />
          </Box>
          <Box
            sx={{
              width: ratingSize().width,
              boxShadow: 4,
              p: 3,
              backgroundColor: "gray",
              borderRadius: 1,
            }}
          >
            <TextField
              // autoComplete
              placeholder={journal.response}
              multiline
              fullWidth
              onChange={(event) => setUpdatedText(event.target.value)}
              value={updatedText}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "black",
              boxShadow: 4,
              borderRadius: 1,
              width: "100%",
            }}
            className={classes.alignItems}
          ></Box>
          {success && <Alert severity="success">Updated Journal!</Alert>}
        </Box>
      </Grid>
    </Grid>
  );
};
