import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import useStyles from "../../../styles.js";
import { useNavigate } from "react-router-dom";

export const Brief = () => {
  const [success, setSuccess] = useState(false);
  const [overall, setOverall] = useState(5);
  const token = JSON.parse(localStorage.getItem("userToken"));
  const userID = localStorage.getItem("id");
  const classes = useStyles();

  const navigate = useNavigate();

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
        setTimeout(() => {
          navigate("/journals");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function valuetext(value) {
    return value;
  }

  return (
    <Grid>
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
            sx={{ fontWeight: "bold", fontSize: 40, letterSpacing: 6 }}
          >
            Brief Journal
          </Typography>
        </Box>
        <Divider sx={{ borderBottomWidth: 5, mt: 1, mb: 3 }} />

        <Box sx={{ backgroundColor: "gray", boxShadow: 4, borderRadius: 1 }}>
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

        <Box
          sx={{
            backgroundColor: "black",
            boxShadow: 4,
            borderRadius: 1,
          }}
          className={classes.alignItems}
        >
          <Button
            onClick={() => {
              postJournal();
            }}
          >
            Submit Journal
          </Button>
        </Box>
        {success && <Alert severity="success">Submitted Journal!</Alert>}
      </Grid>
    </Grid>
  );
};
