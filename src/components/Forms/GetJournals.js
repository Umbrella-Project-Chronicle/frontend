import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange } from "react-date-range";
import { useMediaQuery } from "react-responsive";
import { EditJournal } from "./EditJournal.js";
import useStyles from "../../styles.js";

const { DateTime } = require("luxon");

export function GetJournals() {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const email = localStorage.getItem("email");
  const userID = localStorage.getItem("id");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [journals, setJournals] = useState(null);

  const classes = useStyles();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const sizing = () => {
    const desktop = {
      calendar: true,
      className: classes.journalModal,
    };
    const mobile = {
      calendar: false,
      className: classes.mobileJournalModal,
    };

    if (isDesktop) {
      return desktop;
    } else {
      return mobile;
    }
  };

  const [viewCalendar, setViewCalendar] = useState(sizing().calendar);
  const [viewCalendarButton, setViewCalendarButton] = useState(
    sizing().calendar
  );

  const THREE_MONTHS_AGO = new Date();
  THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);

  const [state, setState] = useState([
    {
      startDate: THREE_MONTHS_AGO,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [trigger, setTrigger] = useState(false);

  const GetMonthofJournals = async () => {
    try {
      let res = await axios.post(
        "https://localhost:7177/api/recap/journals",
        {
          startDate: state[0].startDate.toISOString(),
          endDate: state[0].endDate.toISOString(),
          userID: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setJournals(res.data);
      console.log(res);

      if (res.data.length > 0) {
        setViewCalendarButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function GetJournalType(j) {
    if (j.journalType === 1) return "Brief";
    else if (j.journalType === 2) return "Standard";
    else if (j.journalType === 3) return "Full";
  }

  // useEffect(() => {
  //   GetMonthofJournals();
  //   console.log("trigger");
  // }, [trigger]);

  useEffect(() => {
    GetMonthofJournals();
    console.log("state");
  }, [state]);

  const modal = () => {
    return (
      <Box className={sizing().className}>
        <Box>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            CLOSE
          </Button>
        </Box>
        <EditJournal journal={modalData} />
      </Box>
    );
  };

  const modalBlur = () => {
    if (open) {
      return classes.isBlurred;
    }
  };

  return (
    <Grid>
      <Grid>{open === true ? modal() : <></>}</Grid>
      <Grid className={modalBlur()}>
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
              <Grid item xs={12} md={6} lg={4}>
                <CardHeader key={journal.date} />

                <Card sx={{ p: 2, m: 3, maxWidth: 300, minWidth: 300 }}>
                  <Typography>
                    Date:{" "}
                    {DateTime.fromISO(journal.date).toLocaleString(
                      DateTime.DATETIME_MED
                    )}{" "}
                  </Typography>
                  <Button
                    onClick={() => {
                      setModalData(journal);
                      handleOpen();
                    }}
                  >
                    Edit Journal
                  </Button>

                  <Typography>
                    Journal Type: {GetJournalType(journal)}
                  </Typography>
                  <Typography>Ratings:</Typography>
                  <ul className="ratingsUl" key={i}>
                    <Typography>ID: {journal.id}</Typography>
                    <Typography>Overall: {journal.ratings.overall}</Typography>
                    {journal.journalType >= 2 ? (
                      <div>
                        <Typography>
                          Anxiety: {journal.ratings.anxiety}
                        </Typography>
                        <Typography>
                          Depression: {journal.ratings.depression}
                        </Typography>
                        <Typography>
                          Happiness: {journal.ratings.happiness}
                        </Typography>
                        <Typography>
                          Loneliness: {journal.ratings.loneliness}
                        </Typography>
                        <Typography>
                          Sadness: {journal.ratings.sadness}
                        </Typography>
                      </div>
                    ) : (
                      <></>
                    )}
                  </ul>
                  {journal.journalType === 3 ? (
                    <div>
                      <Typography>Text: {journal.response}</Typography>
                    </div>
                  ) : (
                    <></>
                  )}
                </Card>
              </Grid>
            ))
          ) : (
            <div> No Journals Exists </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
