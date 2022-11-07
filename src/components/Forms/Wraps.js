import React, { useState, useEffect } from "react";
import axios from "axios";

export function GetWrap() {
  const [journals, setJournals] = useState(null);
  const userID = localStorage.getItem("id");
  // console.log(userID);

  const GetWraps = async () => {
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: "2022-10-24T00:00:00.000Z",
        endDate: "2022-10-29T00:00:00.000Z",
        userID: userID,
      });
      setJournals(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetWraps();
  }, []);

  return (
    <>
      <div>
        {journals ? (
          journals.map((journal, i) => (
            <ul key={i}>
              <li>{journal.date}</li>
              <li>{journal.journalType}</li>
              <li>{journal.respose}</li>
            </ul>
          ))
        ) : (
          <div> nothing</div>
        )}
      </div>
    </>
  );
}
