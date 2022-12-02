import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardHeader, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange } from "react-date-range";
import { useMediaQuery } from "react-responsive";

const { DateTime } = require("luxon");

export function GetJournals() {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const email = localStorage.getItem("email");
  const userID = localStorage.getItem("id");

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const doesCalendarShow = () => {
    const desktop = {
      calendar: true,
    };
    const mobile = {
      calendar: false,
    };

    if (isDesktop) {
      return desktop;
    } else {
      return mobile;
    }
  };

  console.log(doesCalendarShow().calendar);

  const THREE_MONTHS_AGO = new Date();
  THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);
  const [journals, setJournals] = useState(null);
  const [viewCalendar, setViewCalendar] = useState(doesCalendarShow().calendar);
  const [viewCalendarButton, setViewCalendarButton] = useState(
    doesCalendarShow().calendar
  );

  const [state, setState] = useState([
    {
      startDate: THREE_MONTHS_AGO,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [trigger, setTrigger] = useState(false);

  // const GetUserProfile = async () => {
  //   console.log("getuserprofile");
  //   // needs to be set in each api call in order to assure the variable is se
  //   try {
  //     const res = await axios.get(
  //       "https://localhost:7177/api/users/search/" + email,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     localStorage.setItem("id", res.data.id);
  //     setTrigger(!trigger);
  //   } catch (error) {
  //     console.log("ERROR: failed fetching user profile from api", error);
  //   }
  // };

  const GetMonthofJournals = async () => {
    try {
      let res = await axios.post("https://localhost:7177/api/recap/journals", {
        startDate: state[0].startDate.toISOString(),
        endDate: state[0].endDate.toISOString(),
        userID: userID,
      });
      setJournals(res.data);
      console.log(res);

      if (res.data.length > 0) {
        setViewCalendarButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   GetUserProfile();
  // }, []);

  useEffect(() => {
    GetMonthofJournals();
  }, [trigger]);

  useEffect(() => {
    GetMonthofJournals();
  }, [state]);

  return (
    <Grid>
      <Box
        display={"flex"}
        justifyContent="center"
        maxWidth={400}
        style={{ backgroundColor: "gray", borderRadius: 1 }}
      >
        {viewCalendarButton ? (
          <Grid>
            {viewCalendar ? (
              <Box justifyContent="center">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
                <Button onClick={() => setViewCalendar(false)}>Close</Button>
              </Box>
            ) : (
              <Box>
                <Button onClick={() => setViewCalendar(true)}>
                  View Calendar
                </Button>
              </Box>
            )}
          </Grid>
        ) : (
          <></>
        )}
      </Box>

      <Grid container spacing={1}>
        {journals && journals.length === 0 ? (
          <div>Looks like you haven't journalled yet</div>
        ) : (
          <></>
        )}
        {journals ? (
          journals.map((journal, i) => (
            <Grid item xs={12} sm={6} md={3}>
              <CardHeader
                key={journal.date}
                title={DateTime.fromISO(journal.date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              />

              <Card
                direction="column"
                justify="center"
                sx={{ p: 2, m: 3, maxWidth: 300 }}
              >
                <ul key={i}>
                  <Typography>Date: {journal.date}</Typography>
                  <Typography>type: {journal.journalType}</Typography>
                  <Typography noWrap>Text: {journal.response}</Typography>
                  <Typography>Rating:</Typography>
                  <Typography>Overall: {journal.ratings.overall}</Typography>
                  <Typography>Anxiety: {journal.ratings.anxiety}</Typography>
                  <Typography>
                    Depression: {journal.ratings.depression}
                  </Typography>
                  <Typography>
                    Happiness: {journal.ratings.happiness}
                  </Typography>
                  <Typography>
                    Lonliness: {journal.ratings.lonliness}
                  </Typography>
                  <Typography>Sadness: {journal.ratings.sadness}</Typography>
                </ul>
              </Card>
            </Grid>
          ))
        ) : (
          <div> nothing</div>
        )}
      </Grid>
    </Grid>
  );
}
