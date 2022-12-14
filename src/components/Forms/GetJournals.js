import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange } from "react-date-range";
import { useMediaQuery } from "react-responsive";
import { EditJournal } from "./EditJournal.js";
import useStyles from "../../styles.js";
import { useNavigate, useLocation } from "react-router-dom";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CloseIcon from "@mui/icons-material/Close";

import Autocomplete from "@mui/material/Autocomplete";

const { DateTime } = require("luxon");

export const GetJournals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("userToken"));
  const email = localStorage.getItem("email");
  const userID = localStorage.getItem("id");
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [journals, setJournals] = useState(null);
  const typeFilterOptions = [3, 2, 1];
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [userData, setUserData] = useState(null);

  const [search, setSearch] = useState(journals);

  console.log("location", location);

  const classes = useStyles();
  useEffect(() => {
    if (location.state) {
      console.log("location.state");
      if (location.state.userData) {
        console.log("location.state.userData", location.state.userData);
        setUserData(location.state.userData);
      }
      if (location.state.journals) {
        console.log("locationstate.journal", location.state.journals);
        setJournals(location.state.journals);
      } else {
        GetUserJournals();
      }
    } else {
      GetUserJournals();
    }
  }, [location]);

  // console.log("journals", journals, "userData", userData);

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

  const GetUserJournals = async () => {
    console.log("getuserjournals");
    const token = JSON.parse(localStorage.getItem("userToken"));
    const userID = localStorage.getItem("id");
    try {
      const res = await axios.get(
        "https://localhost:7177/api/journal/user/" + userID,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        {
          UserId: userID,
        }
      );
      console.log("Journals fetched from api", res);
      setJournals(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

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
      setSearch(res.data.reverse());
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

  const filterByJournalType = journals.filter((obj) => {
    return obj.journalType === value;
  });

  const modalBlur = () => {
    if (open) {
      return classes.isBlurred;
    }
  };

  const iconSize = () => {
    const mobile = {
      typography: "h5",
      icon: "150px",
    };
    const desktop = {
      icon: "200px",
    };
    if (isMobile) {
      return mobile;
    } else {
      return desktop;
    }
  };

  console.log("userdata", userData);
  console.log("journals", journals);

  return (
    <Grid>
      {journals && journals.length === 0 ? (
        <Grid justifyContent="center">
          <Grid item xs={10} sm={10} md={12} lg={12}>
            <Card
              style={{
                minHeight: "300px",
                backgroundColor: "rgba(240, 240, 240,0.8)",
                p: 10,
                borderRadius: 10,
                margin: 10,
              }}
            >
              <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
                <Typography variant="h3" sx={{ margin: 5 }}>
                  Journal for the First Time
                </Typography>
              </Box>

              <Box className={classes.alignItems} style={{ mt: "30px" }}>
                <IconButton
                  onClick={() => {
                    navigate("/newjournals", { state: { userData: userData } });
                  }}
                >
                  <HistoryEduIcon
                    style={{
                      fontSize: iconSize().icon,
                      color: "black",
                      marginBottom: 20,
                    }}
                  />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Grid>{open ? modal() : <></>}</Grid>

          <Grid className={modalBlur()}>
            <Box>
              <Typography onClick={() => {}}>Reset</Typography>
            </Box>
            <Box name="calendar" maxWidth={400} sx={{ margin: 3 }}>
              {viewCalendarButton ? (
                <Grid>
                  {viewCalendar ? (
                    <Box justifyContent="center">
                      <Button onClick={() => setViewCalendar(false)}>
                        <Box>
                          <CloseIcon />
                        </Box>
                      </Button>
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </Box>
                  ) : (
                    <Box justifyContent="center">
                      <Button onClick={() => setViewCalendar(true)}>
                        <Box
                          sx={{
                            backgroundColor: "black",
                            borderRadius: 1,
                            padding: 2,
                          }}
                        >
                          <Typography>View Calendar</Typography>
                        </Box>
                      </Button>
                    </Box>
                  )}
                </Grid>
              ) : (
                <></>
              )}
            </Box>

            <Grid container spacing={1}>
              {search ? (
                search.map((journal, i) => (
                  <Grid>
                    <Grid item xs={8} sm={8} md={8} lg={4}>
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
                          <Typography>
                            Overall: {journal.ratings.overall}
                          </Typography>
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
                  </Grid>
                ))
              ) : (
                <Box>
                  <Typography>
                    No Journals Exist During This Time Period :(
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
