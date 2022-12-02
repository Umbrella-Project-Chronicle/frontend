import React, { useEffect } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import axios from "axios";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HistoryIcon from "@mui/icons-material/History";
import useStyles from "../../styles";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useMediaQuery } from "react-responsive";

export const LandingPage = () => {
  const classes = useStyles();
  const email = localStorage.getItem("email");
  const token = JSON.parse(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const iconSize = () => {
    const mobile = {
      typography: "h5",
      icon: "150px",
    };
    const desktop = {
      icon: "200px",
    };
    if (isMobile) {
      return mobile;
    } else {
      return desktop;
    }
  };

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
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">New Journal</Typography>
          </Box>

          <Box className={classes.alignItems} style={{ mt: "30px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals");
              }}
            >
              <HistoryEduIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
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
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">Wraps</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/wraps");
              }}
            >
              <HistoryIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
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
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">Past Journals</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/journals");
              }}
            >
              <ManageSearchIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
