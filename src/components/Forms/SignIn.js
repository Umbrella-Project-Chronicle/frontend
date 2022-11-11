import { React, useState, useEffect } from "react";
import { Button, TextField, Link, Paper, Box, Grid, Typography, Alert } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import SetNewUser from "./SetUser";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [user, setUser] = useState({ id: "", email: "", token: "", firstName: "", lastName: "" });

  // used to send user to welcome page
  const navigate = useNavigate();

  const goToWelcome = (email) => {
    navigate("/journals", { state: { email: email } });
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
          localStorage.setItem("userToken", JSON.stringify(response.data.token));
          localStorage.setItem("setUpTime", now);
          localStorage.setItem("email", data.get("email"));
          goToWelcome(data.get("email"));
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          setError("Incorrect Password");
        } else setError("User Not Found");
      });
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
        <Typography component="h1" variant="h5" sx={{ color: "white", fontSize: 40, mb: 2 }}>
          Chronicle
        </Typography>

        <Typography component="h1" variant="h5" sx={{ color: "white" }}>
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
    </>
  );
}

export default SignIn;
