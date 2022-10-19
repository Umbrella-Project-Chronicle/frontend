import { useState, useEffect } from "react";

function GetCachedUser() {
  const [cachedUser, setCachedUser] = useState({ id: "", email: "", firstName: "", lastName: "" });

  const x = JSON.parse(localStorage.getItem("userProfile")) || null;

  if (x) {
    setCachedUser({ id: x.data.id, email: x.data.email, firstName: x.dat.firstName, lastName: x.data.lastName });
  }

  return cachedUser;
}

export default GetCachedUser;
