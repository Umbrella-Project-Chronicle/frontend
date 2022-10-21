import React from "react";
import axios from "axios";
import GetToken from "./CachedToken.js";

const SetNewUser = (email) => {
  // const [user, setUser] = useState({ id: "", email: "", firstName: "", lastName: "" });

  const token = GetToken();

  axios
    .get("https://localhost:7177/api/users/search/" + email, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log("Set cachedUser", response);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
    });
};

export default SetNewUser;
