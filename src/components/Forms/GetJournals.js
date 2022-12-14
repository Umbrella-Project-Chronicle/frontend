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
  Stack,
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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

      setJournals(res.data);
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

  var filterByJournalType = null;
  if (search) {
    filterByJournalType = search.filter((obj) => {
      return obj.journalType === value;
    });
  }

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

  console.log("search", search);

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
        <Grid id="journals">
          {open ? modal() : <></>}
          <Grid
            className={modalBlur()}
            container
            sx={{ justifyContent: "center" }}
          >
            <Box
              sx={{ background: "rgba(0, 0, 0, 0.4)", borderRadius: 5 }}
              id="search-components"
            >
              <Box item className={classes.alignItems} sx={{ margin: 3 }}>
                <Button>
                  <Typography
                    onClick={() => {
                      setSearch(journals);
                      setValue(0);
                      setViewCalendar(false);
                    }}
                    sx={{ color: "white" }}
                  >
                    All Journals
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ margin: 2 }}>
                <FormControl
                  item
                  fullWidth
                  sx={{ maxWidth: "500px", color: "white" }}
                >
                  <InputLabel id="JournalFilter" sx={{ color: "white" }}>
                    Type
                  </InputLabel>
                  <Select
                    labelId="JournalFilter"
                    id="JournalFilter"
                    value={value}
                    label="Age"
                    onChange={handleChange}
                    sx={{ color: "white" }}
                  >
                    <MenuItem value={1}>Brief</MenuItem>
                    <MenuItem value={2}>Standard</MenuItem>
                    <MenuItem value={3}>Full</MenuItem>
                    <MenuItem value={0}>All</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box item name="calendar" maxWidth={400} sx={{ margin: 3 }}>
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
              <Box item className={classes.alignItems} sx={{ margin: 3 }}>
                {search ? (
                  <Grid>
                    {value ? (
                      <Typography sx={{ color: "white" }}>
                        Journals: {filterByJournalType.length}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "white" }}>
                        Journals: {search.length}
                      </Typography>
                    )}
                  </Grid>
                ) : (
                  <Grid></Grid>
                )}
              </Box>
            </Box>

            <Grid>
              {search ? (
                <Grid container sx={{ justifyContent: "center" }}>
                  {value
                    ? filterByJournalType.map((journal, i) => {
                        return (
                          <Box item xs={12} sm={8} md={6} lg={6}>
                            <CardHeader key={journal.date} />
                            <Card sx={{ p: 2, m: 3 }}>
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
                                <div
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "15rem",
                                  }}
                                >
                                  <Typography noWrap>
                                    Text: {journal.response}
                                  </Typography>
                                </div>
                              ) : (
                                <></>
                              )}
                            </Card>
                          </Box>
                        );
                      })
                    : search.map((journal, i) => (
                        <Box item xs={12} sm={8} md={6} lg={6}>
                          <CardHeader key={journal.date} />

                          <Card sx={{ p: 2, m: 3 }}>
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
                              <div
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  width: "15rem",
                                }}
                              >
                                <Typography noWrap>
                                  Text: {journal.response}
                                </Typography>
                              </div>
                            ) : (
                              <></>
                            )}
                          </Card>
                        </Box>
                      ))}
                </Grid>
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
