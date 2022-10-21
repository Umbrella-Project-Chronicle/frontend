import { React, useState, useEffect } from "react";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, CssBaseline, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import SetNewUser from "./SetUser";

import Image from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/favicon.ico";

const theme = createTheme();

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [user, setUser] = useState({ id: "", email: "", token: "", firstName: "", lastName: "" });

  // used to send user to welcome page
  const navigate = useNavigate();

  const goToWelcome = (email) => {
    console.log("goToWelcome");
    navigate("/welcome", { state: { email: email } });
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
          console.log("status 200");
          localStorage.setItem("userToken", JSON.stringify(response.data.token));
          console.log("email", data.get("email"));
          goToWelcome(data.get("email"));
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          setError("Incorrect Password");
        } else setError("User Not Found");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "dark" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "center",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ bgcolor: "white" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 4,
              p: 3,
            }}
          >
            <Avatar src="" sx={{ m: 3 }}></Avatar>
            <Typography component="h1" variant="h5">
              Chronicle Sign In
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
