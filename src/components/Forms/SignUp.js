import { React, useState } from "react";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, CssBaseline, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/favicon.ico";

import emailValidator from "email-validator";
// import useNavigate from "react-router-dom";

const theme = createTheme();

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState("");

  const isPasswordSame = (password, conPass) => {
    return password === conPass;
  };

  const isPasswordLong = (password) => {
    return password.length >= 8;
  };

  const isPasswordValid = () => {
    return isPasswordSame() && isPasswordLong();
  };

  const isEmailValid = (email) => {
    return emailValidator.validate(email);
  };

  // used to send user to welcome page aftering signing up

  const navigate = useNavigate();

  const goToWelcome = (firstName, email) => {
    navigate("/welcome", { state: { firstName: firstName, email: email } });
  };

  // error handling

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      userType: 1,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    });
    axios
      .post("https://localhost:7177/api/users", {
        email: data.get("email"),
        password: data.get("password"),
        userType: 1,
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          goToWelcome(data.get("firstName"), data.get("email"));
        }
      })
      .catch((error) => {
        setError(error);
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
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="text"
                autoFocus
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="text"
                autoFocus
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
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
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="conPass"
                label="Confirm Password"
                type="password"
                id="conPass"
                autoComplete="current-password"
                helperText={error}
                onChange={(event) => setConPass(event.target.value)}
                value={conPass}
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
                  <Link href="/login" variant="body2">
                    {"Have an Account?"}
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

export default SignUp;
