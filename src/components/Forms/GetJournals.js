import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardHeader, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange } from "react-date-range";

const { DateTime } = require("luxon");

export function GetJournals() {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const email = localStorage.getItem("email");

  const THREE_MONTHS_AGO = new Date();
  THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);
  const [journals, setJournals] = useState(null);
  const [viewCalender, setViewCalender] = useState(false);
  const [viewCalenderButton, setViewCalenderButton] = useState(false);

  const [state, setState] = useState([
    {
      startDate: THREE_MONTHS_AGO,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [trigger, setTrigger] = useState(false);

  const GetUserProfile = async () => {
    console.log("getuserprofile");
    // needs to be set in each api call in order to assure the variable is se
    try {
      const res = await axios.get("https://localhost:7177/api/users/search/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      localStorage.setItem("id", res.data.id);
      setTrigger(!trigger);
    } catch (error) {
      console.log("ERROR: failed fetching user profile from api", error);
    }
  };

  const GetMonthofJournals = async () => {
    const userID = localStorage.getItem("id");
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: state[0].startDate.toISOString(),
        endDate: state[0].endDate.toISOString(),
        userID: userID,
      });
      setJournals(res.data);
      console.log(res);

      if (res.data.length > 0) {
        setViewCalenderButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserProfile();
  }, []);

  useEffect(() => {
    GetMonthofJournals();
  }, [trigger]);

  useEffect(() => {
    GetMonthofJournals();
  }, [state]);

  return (
    <>
      {viewCalenderButton ? (
        <>
          {viewCalender ? (
            <>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
              <button onClick={() => setViewCalender(false)}>Close</button>
            </>
          ) : (
            <button onClick={() => setViewCalender(true)}>View Calender</button>
          )}
        </>
      ) : (
        <></>
      )}

      <Grid item>
        {journals && journals.length === 0 ? <div>Looks like you haven't journalled yet</div> : <></>}
        {journals ? (
          journals.map((journal, i) => (
            <>
              <CardHeader
                key={journal.date}
                title={DateTime.fromISO(journal.date).toLocaleString(DateTime.DATETIME_MED)}
              />

              <Card direction="column" justify="center" sx={{ p: 2, m: 3, maxWidth: 300 }}>
                <ul key={i}>
                  <Typography>Date: {journal.date}</Typography>
                  <Typography>type: {journal.journalType}</Typography>
                  <Typography noWrap>Text: {journal.response}</Typography>
                  <Typography>Rating:</Typography>
                  <Typography>Overall: {journal.ratings.overall}</Typography>
                  <Typography>Anxiety: {journal.ratings.anxiety}</Typography>
                  <Typography>Depression: {journal.ratings.depression}</Typography>
                  <Typography>Happiness: {journal.ratings.happiness}</Typography>
                  <Typography>Lonliness: {journal.ratings.lonliness}</Typography>
                  <Typography>Sadness: {journal.ratings.sadness}</Typography>
                </ul>
              </Card>
            </>
          ))
        ) : (
          <div> nothing</div>
        )}
      </Grid>
    </>
  );
}
