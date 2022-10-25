import axios from "axios";
import React, { useState } from "react";
import GetToken from "./CachedToken";

function GetJournals(UserId) {
  const token = GetToken();

  axios
    .get("https://localhost:7177/api/user/" + UserId, {
      headers: {
        Authorization: "Bearer " + token,
      },
      UserId: UserId,
    })
    .then((res) => {
      // console.log(res);
      const journals = res.data;
      return journals;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default GetJournals;
