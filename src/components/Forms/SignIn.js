import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignIn() {
  return (
    <div>
      <h1 className="mb-4">Welcome Back, Chronicler</h1>

      <Form>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
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
