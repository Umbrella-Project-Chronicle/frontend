import { useState, useEffect } from "react";
import axios from "axios";
import GetToken from "./CachedToken.js";
import GetCachedUser from "./CachedUser.js";

function GetUser(email) {
  // const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });
  const token = GetToken();

  if (GetCachedUser()) {
    console.log("found cached user");
    const user = JSON.parse(localStorage.getItem("userProfile"));
    return user;
  } else {
    axios
      .get("https://localhost:7177/api/users/search/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("Got user from api", response);
        return response.data;
      });
  }
}

export default GetUser;
