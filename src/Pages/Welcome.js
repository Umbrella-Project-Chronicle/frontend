import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";

function Welcome() {
  const location = useLocation();

  const email = location.state.email;
  const name = location.state.firstName;

  // const userInfo = async (email) => {
  //   console.log("email", email);
  //   await fetch("https://localhost:7177/api/users/search/" + email, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const greeting = () => {
    if (name) {
      return name;
    }
    if (email) {
      return email;
    } else {
      return "User";
    }
  };

  return (
    <div>
      <h1>Hello, {greeting()}!</h1>
      <div>
        <Link to="/entry">Journal here</Link>
      </div>
    </div>
  );
}

export default Welcome;
