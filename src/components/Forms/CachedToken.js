import { useState, useEffect } from "react";

function GetToken() {
  const cachedToken = JSON.parse(localStorage.getItem("userToken"));

  if (cachedToken) {
    return cachedToken;
  } else {
    return null;
  }
}

export default GetToken;
