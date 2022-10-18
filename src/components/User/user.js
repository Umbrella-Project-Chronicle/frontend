import { React, useState } from "react";

function User(props) {
  const user = {
    id: props.id,
    email: props.email,
    token: props.token,
    firstName: props.firstName,
    lastName: props.lastName,
  };

  return user;
}

export default User;
