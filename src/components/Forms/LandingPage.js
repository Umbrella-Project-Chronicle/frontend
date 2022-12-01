import React, { useEffect } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import axios from "axios";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HistoryIcon from "@mui/icons-material/History";
import BackpackIcon from "@mui/icons-material/Backpack";
import useStyles from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LandingPage = () => {
  const classes = useStyles();
  const email = localStorage.getItem("email");
  const token = JSON.parse(localStorage.getItem("userToken"));

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
            backgroundColor: "rgba(240, 240, 240,0.5)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems}>
            <Typography>Click here to Journal</Typography>
          </Box>

          <Box className={classes.alignItems}>
            <FontAwesomeIcon icon={["fas", "fa-pen-nib"]} />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.5)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Typography>Click here to view wraps</Typography>
          <Box>
            <HistoryIcon />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.5)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Typography>Click here to view past wraps</Typography>
          <Box>
            <BackpackIcon />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
