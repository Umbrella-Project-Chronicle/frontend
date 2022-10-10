import { React, useState } from "react";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, CssBaseline, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/favicon.ico";

const theme = createTheme();

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // used to send user to welcome page
  const navigate = useNavigate();

  const goToWelcome = (email) => {
    navigate("/welcome/", { state: { email: email } });
  };

  // error handling
  // const isError = () => {
  //   if (error) {
  //     return (
  //       <Alert variant="danger" style={{ fontSize: "18px" }}>
  //         {error}
  //       </Alert>
  //     );
  //   }
  // };

  // function isError() {
  //   if (error) {
  //     return error;
  //   } else {
  //     return "hello";
  //   }
  // }

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
        console.log(response);
        if (response.status === 200) {
          goToWelcome(data.get("email"));
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("User not Found");
        }
        if (error.response.status === 409) {
          setError("Incorrect Password");
        } else setError("there was a problem");
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
            }}
          >
            <Avatar src=""></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                helperText={error}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              {error && <Alert> {error}</Alert>}
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
