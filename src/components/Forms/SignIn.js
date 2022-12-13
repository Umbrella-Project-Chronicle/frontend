import { React, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import useStyles from "../../styles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const styles = useStyles();

  // used to send user to welcome page
  const navigate = useNavigate();

  const goToWelcome = (userData) => {
    navigate("/home", { state: { userData: userData } });
  };

  // api call to sign in
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    axios
      .post("https://localhost:7177/api/users/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        console.log("status", response.status);
        console.log("response", response);
        if (response.status === 200) {
          const now = new Date().getTime();
          localStorage.setItem("setUpTime", now);
          localStorage.setItem("email", data.get("email"));
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );
          console.log(response);
          GetUser();
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          setError("Incorrect Password");
        } else setError("User Not Found");
      });
  };

  const GetUser = () => {
    console.log("getusercallsed");
    const email = localStorage.getItem("email");
    const token = JSON.parse(localStorage.getItem("userToken"));

    console.log(email, token);

    axios
      .get("https://localhost:7177/api/users/search/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("get user response", res);

          const userData = res.data;

          goToWelcome(userData);
        }
      })
      .catch((error) => {
        console.log("ERROR: failed fetching user profile from api", error);
        goToWelcome();
      });
  };

  return (
    <Grid>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 4,
          bgcolor: "rgba(240, 240, 240,0.5)",
          p: 3,
          borderRadius: 1,
          justifyContent: "center",
          maxWidth: "450px",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontSize: 40, mb: 2 }}>
          Chronicle
        </Typography>

        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          {error && <Alert severity="info"> {error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default SignIn;
