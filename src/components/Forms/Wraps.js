import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardHeader, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange } from "react-date-range";

export function GetWrap() {
  const THREE_MONTHS_AGO = new Date();
  THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);
  const [journals, setJournals] = useState(null);
  const [viewCalender, setViewCalender] = useState(false);
  const [state, setState] = useState([
    {
      startDate: THREE_MONTHS_AGO,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const userID = localStorage.getItem("id");

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  // startDate: "2022-10-24T00:00:00.000Z",
  // endDate: "2022-10-29T00:00:00.000Z",

  console.log("startDate", state[0].startDate.toISOString(), "endDate", state[0].endDate.toISOString());

  console.log(state);

  const GetWraps = async () => {
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: state[0].startDate.toISOString(),
        endDate: state[0].endDate.toISOString(),
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
  }, [state]);

  return (
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

      <Grid item>
        {journals ? (
          journals.map((journal, i) => (
            <>
              <CardHeader title={journal.date} />
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
