import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, Box, Card, Typography, Divider } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "../../styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const Profile = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const GetUserProfile = async () => {
    const email = localStorage.getItem("email");
    const token = JSON.parse(localStorage.getItem("userToken"));
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
      console.log(res);
      setUserData(res.data);
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };
  useEffect(() => {
    GetUserProfile();
  }, [trigger]);
  return (
    <Grid justifyContent="center">
      {userData ? (
        <Grid sx={{ padding: 2 }}>
          <Box>
            <AccountCircleIcon sx={{ fontSize: 100 }} />
          </Box>
          <Box sx={{ justifyContent: "center" }}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 70,
                letterSpacing: 12,
                boxShadow: 4,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Profile
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
              padding: 3,
            }}
          >
            <Typography>{userData.firstName}</Typography>
          </Box>
          <Typography>{userData.lastName}</Typography>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};
