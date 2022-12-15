import React, { useEffect, useState } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import axios from "axios";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HistoryIcon from "@mui/icons-material/History";
import useStyles from "../../styles";

import { CardContent, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useMediaQuery } from "react-responsive";
import { AboutCards } from "./About";

export const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const email = localStorage.getItem("email");
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [journals, setJournals] = useState(null);
  const check = () => {
    if (localStorage.getItem("firstTime")) {
      return true;
    } else {
      return false;
    }
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    console.log("hello");
    if (location.state) {
      setUserData(location.state.userData);
      localStorage.setItem("id", location.state.userData.id);
    } else {
      if (!localStorage.getItem("id")) {
        GetUserProfile();
      }
    }
    if (!journals) {
      GetUserJournals();
    }
  }, [location]);

  console.log("userdata on landing page", location);

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

  const GetUserJournals = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const userID = localStorage.getItem("id");
    try {
      const res = await axios.get(
        "https://localhost:7177/api/journal/user/" + userID,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        {
          UserId: userID,
        }
      );
      console.log("Journals fetched from api", res);
      setJournals(res.data.reverse());
      console.log(res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

  return (
    <Grid>
      <Box className={classes.alignItems}>
        {check() ? <AboutCards isLandingPage="true" /> : <></>}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {userData ? (
          <Grid item xs={10} sm={10} md={8} lg={8}>
            <Card
              style={{
                maxHeight: "100px",
                backgroundColor: "rgba(240, 240, 240,0.8)",
                p: 3,
                borderRadius: 10,
              }}
            >
              <Box className={classes.alignItems} style={{ margin: "10px" }}>
                {userData.firstName ? (
                  <Typography style={{ fontSize: 30 }}>
                    Welcome back, {userData.firstName}!
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: 30 }}>Welcome!</Typography>
                )}
              </Box>
            </Card>
          </Grid>
        ) : (
          <></>
        )}

        <Grid item xs={10} sm={10} md={8} lg={8}>
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
                  navigate("/newjournals", {
                    state: { userData: userData, journals: journals },
                  });
                }}
              >
                <HistoryEduIcon
                  style={{ fontSize: iconSize().icon, color: "black" }}
                />
              </IconButton>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
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
                  navigate("/wraps", {
                    state: { userData: userData, journals: journals },
                  });
                }}
              >
                <HistoryIcon
                  style={{ fontSize: iconSize().icon, color: "black" }}
                />
              </IconButton>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={10} sm={10} md={8} lg={8}>
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
                  navigate("/journals", {
                    state: { userData: userData, journals: journals },
                  });
                }}
              >
                <ManageSearchIcon
                  style={{ fontSize: iconSize().icon, color: "black" }}
                />
              </IconButton>
            </Box>
            <Box className={classes.alignItems}>
              <Typography style={{ fontSize: 15, marginBottom: 8 }}>
                {journals && journals.length > 1 ? (
                  <div>{journals.length} total</div>
                ) : (
                  <></>
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
