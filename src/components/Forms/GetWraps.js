import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { DateTime } from "luxon";
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip } from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Card,
  Box,
  Grid,
  CircularProgress,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import circularProgressClasses from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { borderColor } from "@mui/system";
import { useMediaQuery } from "react-responsive";
import { EditJournal } from "./EditJournal";
import useStyles from "../../styles";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import CelebrationIcon from "@mui/icons-material/Celebration";

export const GetWraps = () => {
  const { DateTime } = require("luxon");
  const ONE_MONTH_AGO = new Date();
  ONE_MONTH_AGO.setMonth(ONE_MONTH_AGO.getMonth() - 1);
  const userID = localStorage.getItem("id");
  const [journals, setJournals] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [allJournals, setAllJournals] = useState(null);
  const [month, setMonth] = useState(
    DateTime.now().minus({ month: 1 }).toFormat("MMMM")
  );
  const [year, setYear] = useState(DateTime.now().toFormat("yyyy"));
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [backgroundColorTrigger, setBackgroundColorTrigger] = useState(false);
  const [averages, setAverages] = useState({
    overall: null,
    anxiety: null,
    depression: null,
    happiness: null,
    loneliness: null,
    sadness: null,
  });
  const isLeapYear = () => {
    if (DateTime.local(year).isInLeapYear) {
      return `${year}-02-29T00:00:00.00Z`;
    } else {
      return `${year}-02-28T23:59:59.00Z`;
    }
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState(null);
  const [toolTipClose, setToolTipClose] = useState(false);
  const omitZeros = (values) => {
    setJournals(
      values.map((value) => {
        if (value.journalType === 1) {
          value.ratings.anxiety = null;
          value.ratings.depression = null;
          value.ratings.happiness = null;
          value.ratings.loneliness = null;
          value.ratings.sadness = null;
          return value;
        } else {
          return value;
        }
      })
    );
  };

  const navigate = useNavigate();

  const months = {
    January: {
      begin: `${year}-01-01T00:00:00.00Z`,
      end: `${year}-01-31T23:59:59.00Z`,
    },
    February: {
      begin: `${year}-02-01T00:00:00.00Z`,
      end: isLeapYear(),
    },
    March: {
      begin: `${year}-03-01T00:00:00.00Z`,
      end: `${year}-03-30T23:59:59.00Z`,
    },
    April: {
      begin: `${year}-04-01T00:00:00.00Z`,
      end: `${year}-04-30T23:59:59.00Z`,
    },
    May: {
      begin: `${year}-05-01T00:00:00.00Z`,
      end: `${year}-05-31T23:59:59.00Z`,
    },
    June: {
      begin: `${year}-06-01T00:00:00.00Z`,
      end: `${year}-06-30T23:59:59.00Z`,
    },
    July: {
      begin: `${year}-07-01T00:00:00.00Z`,
      end: `${year}-07-31T23:59:59.00Z`,
    },
    August: {
      begin: `${year}-08-01T00:00:00.00Z`,
      end: `${year}-08-31T23:59:59.00Z`,
    },
    September: {
      begin: `${year}-09-01T00:00:00.00Z`,
      end: `${year}-09-30T23:59:59.00Z`,
    },
    October: {
      begin: `${year}-10-01T00:00:00.00Z`,
      end: `${year}-10-31T23:59:59.00Z`,
    },
    November: {
      begin: `${year}-11-01T00:00:00.00Z`,
      end: `${year}-11-30T23:59:59.00Z`,
    },
    December: {
      begin: `${year}-12-01T00:00:00.00Z`,
      end: `${year}-12-31T23:59:59.00Z`,
    },
  };

  const selectMonth = () => {
    const handleChange = (event) => {
      setMonth(event.target.value);
    };

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <Grid>
        <FormControl
          sx={{ minWidth: 80, borderColor: "white" }}
          variant="standard"
        >
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={handleChange}
            autoWidth
            label="Month"
            style={{ color: "white", fontSize: 20 }}
          >
            {months.map((month, i) => (
              <MenuItem key={i} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const GetAllJournals = async () => {
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
      setAllJournals(res.data);
      console.log("get ALL journals", res.data);
    } catch (err) {
      console.log("ERROR: failed fetching journals from api", err);
    }
  };

  const GetJournals = async () => {
    const startDate = months[`${month}`].begin;
    const endDate = months[`${month}`].end;

    console.log("get journals api call");

    try {
      let res = await axios.post(
        "https://localhost:7177/api/recap/journals",
        {
          startDate: startDate,
          endDate: endDate,
          userID: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("getjournal", res);
      omitZeros(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ApiGetAverages = async () => {
    const startDate = months[`${month}`].begin;
    const endDate = months[`${month}`].end;

    console.log("startdAte", startDate, "endDate", endDate);
    console.log("userId", userID, "token", token);
    try {
      let res = await axios.post(
        "https://localhost:7177/api/recap",
        {
          startDate: startDate,
          endDate: endDate,
          userID: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("api averages", res);
      setAverages({
        overall: res.data.emotionAverages.Overall,
        anxiety: res.data.emotionAverages.Sadness,
        depression: res.data.emotionAverages.Depression,
        happiness: res.data.emotionAverages.Happiness,
        loneliness: res.data.emotionAverages.Loneliness,
        sadness: res.data.emotionAverages.Sadness,
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const apiCalls = () => {
    GetJournals();
    ApiGetAverages();
    GetAllJournals();
  };

  useEffect(() => {
    apiCalls();
  }, [month]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const sizing = () => {
    const desktop = {
      height: 900,
      width: 1300,
      className: classes.journalModal,
      icon: "200px",
      click: "click",
    };
    const mediumSize = {
      height: 600,
      width: 800,
      className: classes.journalModal,
      icon: "200px",
      click: "click",
    };
    const mobile = {
      height: 300,
      width: 300,
      tooltip: {
        x: 40,
        y: 375,
      },
      className: classes.mobileJournalModal,
      typography: "h5",
      icon: "150px",
      click: "",
    };
    if (isDesktop) {
      return desktop;
    } else if (isMobile) {
      return mobile;
    } else {
      return mediumSize;
    }
  };

  const CustomTooltip = (props) => {
    console.log("custom tooltip props", props);
    if (props.payload.length === 0) {
      return null;
    }

    const journal = props.payload;

    const data = () => {
      if (journal.length === 1) {
        return (
          <Grid
            className={classes.alignItems}
            sx={{ maxWidth: 200, padding: 3 }}
          >
            <Box sx={{ margin: 2 }}>
              <div>
                {DateTime.fromISO(journal[0].payload.date).toFormat(
                  "MMMM dd, yyyy"
                )}
              </div>
            </Box>
            <Box>
              <div>Overall: {journal[0].value}</div>
            </Box>
          </Grid>
        );
      } else {
        return (
          <Grid sx={{ maxWidth: 200 }}>
            <Box sx={{ margin: 2 }}>
              {DateTime.fromISO(journal[0].payload.date).toFormat(
                "MMMM dd, yyyy"
              )}
            </Box>
            {journal.map((x) => {
              return (
                <Box sx={{ margin: 1 }}>
                  <Box>
                    <Typography>
                      <div>{x.name}</div>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      <div>{x.value}</div>
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <Box sx={{ backgroundColor: "gray" }}>
              <Typography>
                <div>"{journal[0].payload.response}"</div>
              </Typography>
            </Box>
          </Grid>
        );
      }
    };

    return (
      <Grid>
        <Grid className={classes.toolTip}>
          <Box sx={{ backgroundColor: "white" }}>
            {data()}

            <Button
              onClick={() => {
                setModalData(props.payload[0].payload);
                handleOpen();
              }}
            >
              <Typography sx={{ fontSize: 12 }}>Edit/View Journal</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const modalBlur = () => {
    if (open) {
      return classes.isBlurred;
    }
  };

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
          <EditJournal journal={modalData} />
        </Box>
      </Box>
    );
  };

  const CustomLabel = ({ x, y, stroke, value, width }) => {
    if (value != 0) {
      // No label if there is a value. Let the cell handle it.
      return null;
    }

    return (
      <text
        x={x}
        y={y}
        // Move slightly above axis
        dy={-10}
        // Center text
        dx={width / 2}
        fill={stroke}
        fontSize={15}
        textAnchor="middle"
      >
        N/A
      </text>
    );
  };

  const untilNextMonth = () => {
    const values = {
      days: DateTime.now()
        .endOf("month")
        .diff(DateTime.now(), ["days", "hours"]).values.days,
      hours: Math.round(
        DateTime.now().endOf("month").diff(DateTime.now(), ["days", "hours"])
          .values.hours
      ),
    };

    return values;
  };

  const areThereWraps = () => {
    console.log("are there no wraps", journals);
    if (journals === null) {
      return false;
    }
    if (journals.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const areThereJournals = () => {
    if (allJournals === null) {
      return false;
    }
    if (allJournals.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const youHaveThisManyDaysUntilYourFirstWrap = () => {
    return (
      <Grid>
        <Grid container spacing={1} justifyContent="center">
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
              <Box className={classes.alignItems}>
                <Typography variant="h4" sx={{ margin: 5 }}>
                  Wraps Occur Every Month
                </Typography>
              </Box>
              <Box className={classes.alignItems} style={{ margin: 10 }}>
                <Typography varient="h5">
                  You have {untilNextMonth().days} days and{" "}
                  {untilNextMonth().hours} hours until your first Wrap!
                </Typography>
              </Box>

              <Box className={classes.alignItems} style={{ mt: "30px" }}>
                <IconButton
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  <CelebrationIcon
                    style={{
                      fontSize: sizing().icon,
                      color: "black",
                      marginBottom: 20,
                    }}
                  />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const looksLikeYouDontHaveAnyWrapsThisMonth = () => {
    return (
      <Grid>
        <Grid container spacing={1} justifyContent="center">
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
              <Box className={classes.alignItems}>
                <Typography variant="h4" sx={{ margin: 5 }}>
                  Looks like this month doesn't have any Journals :(
                </Typography>
              </Box>

              <Box className={classes.alignItems} style={{ mt: "30px" }}>
                <IconButton
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  <InfoIcon
                    style={{
                      fontSize: sizing().icon,
                      color: "black",
                      marginBottom: 20,
                    }}
                  />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const hereAreYourWraps = () => {
    return (
      <Grid>
        <Grid>{open ? modal() : <></>}</Grid>
        <Grid className={modalBlur()}>
          {averages ? (
            <Grid spacing={2}>
              <Grid xs={10} sm={6} md={6} sx={{ p: 5 }} maxWidth="450px">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <StyledTableCell style={{ fontSize: 20 }}>
                        Emotion
                      </StyledTableCell>
                      <StyledTableCell>{selectMonth()}</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell>Overall</StyledTableCell>
                        <StyledTableCell>
                          {averages.overall ? (
                            averages.overall.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Sadness</StyledTableCell>
                        <StyledTableCell>
                          {averages.sadness ? (
                            averages.sadness.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Depression</StyledTableCell>
                        <StyledTableCell>
                          {averages.depression ? (
                            averages.depression.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Happiness</StyledTableCell>
                        <StyledTableCell>
                          {averages.happiness ? (
                            averages.happiness.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Loneliness</StyledTableCell>
                        <StyledTableCell>
                          {averages.loneliness ? (
                            averages.loneliness.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Sadness</StyledTableCell>
                        <StyledTableCell>
                          {averages.sadness ? (
                            averages.sadness.toFixed(2)
                          ) : (
                            <CircularProgress />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid>
                <LineChart
                  height={sizing().height}
                  width={sizing().width}
                  data={journals}
                  onMouseLeave={() => {
                    return;
                  }}
                >
                  <Line
                    connectNulls={true}
                    name="overall"
                    label={<CustomLabel />}
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="ratings.overall"
                    stroke="white"
                    strokeWidth={2}
                  />
                  <Line
                    connectNulls={true}
                    name="anxiety"
                    label={<CustomLabel />}
                    type="monotone"
                    dataKey="ratings.anxiety"
                    stroke="#ab0202"
                    strokeWidth={2}
                  />
                  <Line
                    connectNulls={true}
                    name="loneliness"
                    label={<CustomLabel />}
                    type="monotone"
                    dataKey="ratings.loneliness"
                    stroke="#038007"
                    strokeWidth={2}
                  />
                  <Line
                    connectNulls={true}
                    name="depression"
                    label={<CustomLabel />}
                    type="monotone"
                    dataKey="ratings.depression"
                    stroke="#026969"
                    strokeWidth={2}
                  />
                  <Line
                    connectNulls={true}
                    name="happiness"
                    label={<CustomLabel />}
                    type="monotone"
                    dataKey="ratings.happiness"
                    stroke="#f5c402"
                    strokeWidth={2}
                  />
                  <Line
                    connectNulls={true}
                    name="sadness"
                    label={<CustomLabel />}
                    type="monotone"
                    dataKey="ratings.sadness"
                    stroke="#020ff5"
                    strokeWidth={2}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    payload={[
                      {
                        value: "overall",
                        type: "line",
                        color: "white",
                      },
                      {
                        value: "anxiety",
                        type: "line",
                        color: "#ab0202",
                      },
                      {
                        value: "loneliness",
                        type: "line",
                        color: "#038007",
                      },
                      {
                        value: "depression",
                        type: "line",
                        color: "#026969",
                      },
                      {
                        value: "happiness",
                        type: "line",
                        color: "#f5c402",
                      },
                      {
                        value: "sadness",
                        type: "line",
                        color: "#020ff5",
                      },
                    ]}
                  />
                  <XAxis dataKey={month} />

                  <Tooltip
                    trigger={sizing().click}
                    content={<CustomTooltip />}
                  />
                </LineChart>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid>
      {areThereJournals() ? (
        <Grid>
          {areThereWraps() ? (
            <Grid>{hereAreYourWraps()}</Grid>
          ) : (
            <Grid>{youHaveThisManyDaysUntilYourFirstWrap()}</Grid>
          )}
        </Grid>
      ) : (
        <Grid>{youHaveThisManyDaysUntilYourFirstWrap()}</Grid>
      )}
    </Grid>
  );
};
