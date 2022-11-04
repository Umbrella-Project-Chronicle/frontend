import { React, useState } from "react";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import emailValidator from "email-validator";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState("");
  const [passLengthError, setPassLengthError] = useState("");
  const [passMatchError, setPassMatchError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isPasswordMatch = (password, conPass) => {
    return password === conPass;
  };

  const isPasswordLength = (password) => {
    return password.length >= 8;
  };

  const isEmailValid = (email) => {
    return emailValidator.validate(email);
  };

  const handlePassChange = (event) => {
    if (!isPasswordLength(event.target.value)) {
      setPassLengthError("Password is Not Long Enough");
    } else {
      setPassLengthError(null);
    }
    setPassword(event.target.value);
  };

  const handlePassConfirm = (event) => {
    if (!isPasswordMatch(password, event.target.value)) {
      setPassMatchError("Passwords Do Not Match");
    } else {
      setPassMatchError(null);
    }

    setConPass(event.target.value);
  };

  const handleEmailChange = (event) => {
    if (!isEmailValid(event.target.value)) {
      setEmailError("Email is Invalid");
    } else {
      setEmailError(null);
    }
    setEmail(event.target.value);
  };

  // used to send user to welcome page aftering signing up

  const navigate = useNavigate();

  const goToWelcome = (email) => {
    navigate("/journals");
  };

  // error handling

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    });
    if (isPasswordLength(password) && isPasswordMatch(password, conPass) && isEmailValid(email)) {
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
            const now = new Date().getTime();
            localStorage.setItem("userToken", JSON.stringify(response.data.token));
            localStorage.setItem("setUpTime", now);
            localStorage.setItem("email", data.get("email"));
            goToWelcome(data.get("email"));
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <>
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
          Sign Up
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
            onChange={handleEmailChange}
            value={email}
          />
          {emailError && (
            <Alert variant="outlined" severity="info">
              {" "}
              {emailError}
            </Alert>
          )}
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
            onChange={handlePassChange}
            value={password}
          />
          {passLengthError && (
            <Alert variant="outlined" severity="info">
              {" "}
              {passLengthError}
            </Alert>
          )}
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
            onChange={handlePassConfirm}
            value={conPass}
          />
          {passMatchError && (
            <Alert variant="outlined" severity="info">
              {" "}
              {passMatchError}
            </Alert>
          )}
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
    </>
  );
}

export default SignUp;
