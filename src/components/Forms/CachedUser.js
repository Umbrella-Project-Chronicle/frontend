import React from "react";

function GetCachedUser() {
  // const [cachedUser, setCachedUser] = useState({ id: "", email: "", firstName: "", lastName: "" });

  const x = JSON.parse(localStorage.getItem("userProfile")) || null;

  if (x) {
    return x;
  }
}

export default GetCachedUser;
