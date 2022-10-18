import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// const createUser = () => {

//   return cachedUser;
// };

function GetToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const cachedToken = JSON.parse(localStorage.getItem("userToken")) || null;
    console.log("cached token", cachedToken);

    if (cachedToken) {
      setToken(cachedToken.data.token);
      console.log("using cached token");
    }
  }, []);

  return (
    <div>
      <h1>{token}</h1>
    </div>
  );
}

// function Welcome() {
// useEffect(() => {
//   console.log(email);
//   fetchUser(email);
// }, [""]);

// let config = {
//   headers: {
//     Authorization: "Bearer " + token,
//   },
// };

// function fetchUser(email) {
//   console.log("fetch user called");
//   axios.get(`https://localhost:7177/api/users/search/` + email, config).then((response) => {
//     console.log(response.data);
//     console.log("email:", email, "config", config);
//     // setUserInfo(response);
//     setID(response.data.id);
//     setFirstName(response.data.firstName);
//     setLastName(response.data.lastName);
//   });
// .then(fetchJournals(id));
// }

// function fetchJournals() {
//   axios.get(`https://localhost:7177/api/journal/user/630d00bf12acfe4c84188a2a`).then((response) => {
//     console.log(response);
//   });
// }

// const greeting = () => {
//   if (firstName) {
//     return firstName;
//   }
//   if (email) {
//     return email;
//   } else {
//     return "User";
//   }
// };

// return (
//   <div>
//     {/* <div>{user}</div> */}
//     <div>
//       <Link to="/entry">Journal here</Link>
//       {/* <Button onClick={() => fetchJournals()}>hello</Button> */}
//     </div>
//     {/* <button onClick={boo()}> sdfdsasa</button> */}
//   </div>
// );
// }

export default GetToken;
