import { useState, useEffect } from "react";
import axios from "axios";
import GetToken from "./CachedToken.js";

function GetUser(email) {
  const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });
  const token = GetToken();

  axios
    .get("https://localhost:7177/api/users/search/" + email, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log("Got user from api", response);
      setUser({
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
      return user;
    });
}

export default GetUser;
