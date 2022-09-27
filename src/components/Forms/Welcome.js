import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";

function Welcome() {
  const queryParams = new URLSearchParams(window.location.search);
  const user = queryParams.get("email");

  const userInfo = async (user) => {
    console.log(user);
    await fetch("https://localhost:7177/api/" + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <Button onClick={() => userInfo(user)}>Get User</Button>
    </div>
  );
}

export default Welcome;
