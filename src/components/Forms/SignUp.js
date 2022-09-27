import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import emailValidator from "email-validator";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState(false);

  const isPasswordValid = (password, conPass) => {
    return password.length >= 5 && password === conPass;
  };

  const isEmailValid = (email) => {
    return emailValidator.validate(email);
  };

  // used to send user to welcome page aftering signing up

  const navigate = useNavigate();

  const goToSignIn = (firstName) => {
    navigate("/welcome", { state: { firstName: firstName } });
  };

  const createAccount = async ({ firstName, lastName, email, password, conPass }) => {
    if (isPasswordValid(password, conPass) && isEmailValid(email)) {
      console.log(firstName, lastName, email, password, conPass);
      await fetch("https://localhost:7177/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userType: 1,
          firstName: firstName,
          lastName: lastName,
        }),
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          goToSignIn(firstName);
        } else {
          setError("unable to create user");
        }
      });
    }
  };

  // const [error, setError] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first-name"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        ></Form.Control>{" "}
        {/* {error.email && (
          <div style={{ fontSize: "15px" }} className="err">
            {error.email}
          </div>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last-name"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        ></Form.Control>{" "}
        {/* {error.email && (
          <div style={{ fontSize: "15px" }} className="err">
            {error.email}
          </div>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          onBlur={isEmailValid()}
        ></Form.Control>{" "}
        {/* {error.email && (
          <div style={{ fontSize: "15px" }} className="err">
            {error.email}
          </div>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        ></Form.Control>{" "}
      </Form.Group>
      {/* {error.password && (
        <div style={{ fontSize: "15px" }} className="err">
          {error.password}
        </div>
      )} */}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          onChange={(event) => setConPass(event.target.value)}
          value={conPass}
        ></Form.Control>{" "}
      </Form.Group>
      {/* {error.confirmPassword && (
        <div style={{ fontSize: "15px" }} className="err">
          {error.confirmPassword}
        </div>
      )} */}

      <Button onClick={() => createAccount({ firstName, lastName, email, password, conPass })}>Submit</Button>
      <div></div>
      <a style={{ fontSize: "20px" }} href={"/login"}>
        Already have an Account?
      </a>
    </Form>
  );
}

export default SignUp;
