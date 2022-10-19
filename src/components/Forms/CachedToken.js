import { useState } from "react";

function GetToken() {
  const [token, setToken] = useState("");

  const cachedToken = JSON.parse(localStorage.getItem("userToken")) || null;

  if (cachedToken) {
    setToken(cachedToken.data.token);
  }

  return token;
}

export default GetToken;
