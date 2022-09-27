import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const goToWelcome = (email) => {
    navigate("/welcome/" + email);
  };

  const createSession = async ({ email, password }) => {
    console.log(email, password);
    await fetch("https://localhost:7177/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        goToWelcome(email);
        console.log("made it");
      } else {
        console.log("unable to login");
      }
    });
  };

  return (
    <div>
      <h1 className="mb-4">Welcome Back</h1>
      <Form>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => createSession({ email, password })}>
          Log In
        </Button>
      </Form>
      <a style={{ fontSize: "20px" }} href={"/"}>
        New to Chronicle?
      </a>
    </div>
  );
}

export default SignIn;
