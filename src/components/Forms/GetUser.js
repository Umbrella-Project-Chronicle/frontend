import { useState, useEffect } from "react";
import axios from "axios";
import GetToken from "./CachedToken.js";
import GetCachedUser from "./CachedUser.js";

function GetUser(email) {
  // const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });
  // const token = GetToken();

  // const tokenConfig = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // };

  if (GetCachedUser()) {
    console.log("found cached user");
    const user = JSON.parse(localStorage.getItem("userProfile"));
    return user;
  }

  // useEffect(() => {
  //   axios.post("https://localhost:7177/api/users/" + email, tokenConfig).then((response) => {
  //     console.log("got user from api");
  //     setUser({
  //       id: response.data.id,
  //       email: response.data.email,
  //       firstName: response.data.firstName,
  //       lastName: response.data.lastName,
  //     });
  //     localStorage.setItem("userProfile", user);
  //   });
  // });
}

export default GetUser;
