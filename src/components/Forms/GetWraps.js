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

export const GetWraps = () => {
  const { DateTime } = require("luxon");
  const ONE_MONTH_AGO = new Date();
  ONE_MONTH_AGO.setMonth(ONE_MONTH_AGO.getMonth() - 1);
  const userID = localStorage.getItem("id");
  const [journals, setJournals] = useState(null);
  const [trigger, setTrigger] = useState(false);
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
  const [modal, setModal] = useState(null);

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

  const GetJournals = async () => {
    const startDate = months[`${month}`].begin;
    const endDate = months[`${month}`].end;
    console.log(token);
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
      setJournals(res.data);
      console.log(res);
      console.log(trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const ApiGetAverages = async () => {
    const startDate = months[`${month}`].begin;
    const endDate = months[`${month}`].end;

    console.log("startdAte", startDate, "endDate", endDate);
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const apiCalls = () => {
    GetJournals();
    ApiGetAverages();
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

  console.log(journals);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const sizing = () => {
    const desktop = {
      height: 800,
      width: 1200,
      className: classes.journalModal,
    };
    const mediumSize = {
      height: 400,
      width: 600,
    };
    const mobile = {
      height: 300,
      width: 300,
      tooltip: {
        x: 40,
        y: 375,
      },
      className: classes.mobileJournalModal,
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
    } else {
      setModal(props.payload[0].payload);

      return (
        <Grid className={classes.toolTip}>
          <Button
            onClick={() => {
              handleOpen();
              console.log("open", open);
            }}
          >
            View/Edit Journal
          </Button>

          {open ? <EditJournal journal={modal} /> : <></>}

          <Box>{props.payload[0].payload.id}</Box>
        </Grid>
      );
    }
  };

  return (
    <Grid sx={{ m: 4 }}>
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
            >
              <Line
                name="overall"
                isAnimationActive={false}
                type="monotone"
                dataKey="ratings.overall"
                stroke="white"
                strokeWidth={2}
              />
              <Line
                name="anxiety"
                type="monotone"
                dataKey="ratings.anxiety"
                stroke="#ab0202"
                strokeWidth={2}
              />
              <Line
                name="loneliness"
                type="monotone"
                dataKey="ratings.loneliness"
                stroke="#038007"
                strokeWidth={2}
              />
              <Line
                name="depression"
                type="monotone"
                dataKey="ratings.depression"
                stroke="#026969"
                strokeWidth={2}
              />
              <Line
                name="happiness"
                type="monotone"
                dataKey="ratings.happiness"
                stroke="#f5c402"
                strokeWidth={2}
              />
              <Line
                name="sadness"
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
                trigger="click"
                content={<CustomTooltip />}
                // className={classes.toolTip}
                // isAnimationActive={true}
                // position={sizing().tooltip}
                // trigger="click"
              />
            </LineChart>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
