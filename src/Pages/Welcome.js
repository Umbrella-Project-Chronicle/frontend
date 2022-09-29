import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function Welcome() {
  // const [userInfo, setUserInfo] = useState([]);
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [email, setemailName] = useState("");

  const location = useLocation();

  const email = location.state.email;

  useEffect(() => {
    console.log("executed only once!");
    fetchUser(email);
  }, [""]);

  function fetchUser(email) {
    axios.get(`https://localhost:7177/api/users/search/` + email).then((response) => {
      console.log(response.data);
      // setUserInfo(response);
      setID(response.data.id);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
    });
  }

  // const user = userInfo.data.map((x) => x);

  // function userJournals() {
  //   axios.get("https://localhost:7177/api/users/search/").then((response) => {
  //     console.log(response);
  //   });
  // }

  const greeting = () => {
    if (firstName) {
      return firstName;
    }
    if (email) {
      return email;
    } else {
      return "User";
    }
  };

  return (
    <div>
      <h1>Hello, {greeting()}!</h1>
      <div>
        <Link to="/entry">Journal here</Link>
      </div>
    </div>
  );
}

export default Welcome;
