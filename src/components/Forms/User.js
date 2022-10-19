import { useState } from "react";
import axios from "axios";
import GetToken from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/Components/Forms/CachedToken.js";

function GetUser(email) {
  const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });

  const token = GetToken();

  const tokenConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios.post("https://localhost:7177/api/users/" + email, tokenConfig).then((response) => {
    console.log("got user from api");
    setUser({
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    });
    localStorage.setItem("userProfile", user);
  });
}

export default GetUser;
