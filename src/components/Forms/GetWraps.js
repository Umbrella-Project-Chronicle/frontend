import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { DateTime } from "luxon";

export const GetWraps = () => {
  const { DateTime } = require("luxon");
  const ONE_MONTH_AGO = new Date();
  ONE_MONTH_AGO.setMonth(ONE_MONTH_AGO.getMonth() - 1);
  const userID = localStorage.getItem("id");
  const [journals, setJournals] = useState(null);

  const GetJournals = async () => {
    console.log("hello");
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: ONE_MONTH_AGO,
        endDate: DateTime.now(),
        userID: userID,
      });
      setJournals(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetJournals();
  }, []);

  return (
    <>
      <div>
        {journals ? (
          journals.map((journal, i) => (
            <>
              <ul>
                <li>{journal.date}</li>
              </ul>
            </>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
