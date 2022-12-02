import React, { useEffect } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import axios from "axios";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HistoryIcon from "@mui/icons-material/History";
import BackpackIcon from "@mui/icons-material/Backpack";
import useStyles from "../../styles";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export const LandingPage = () => {
  const classes = useStyles();
  const email = localStorage.getItem("email");
  const token = JSON.parse(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const GetUserProfile = async () => {
    console.log("getuserprofile");
    // needs to be set in each api call in order to assure the variable is se
    try {
      const res = await axios.get(
        "https://localhost:7177/api/users/search/" + email,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      localStorage.setItem("id", res.data.id);
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };

  useEffect(() => {
    GetUserProfile();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems}>
            <Typography>New Journal</Typography>
          </Box>

          <Box className={classes.alignItems} style={{ mt: "30px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals");
              }}
            >
              <HistoryEduIcon style={{ fontSize: "250px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems}>
            <Typography>Wraps</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/wraps");
              }}
            >
              <HistoryIcon style={{ fontSize: "250px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems} style={{ p: 10 }}>
            <Typography>Past Journals</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/journals");
              }}
            >
              <ManageSearchIcon style={{ fontSize: "250px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
