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

  const CustomizedDot = (props) => {
    const { payload } = props;
    console.log("props", props);
    console.log("paylod", payload);
    console.log("open", open);

    if (open) {
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
          <EditJournal journal={payload} />;
        </Box>
      );
    }

    // if (value > 5) {
    //   return (
    //     <svg
    //       x={cx - 10}
    //       y={cy - 10}
    //       width={20}
    //       height={20}
    //       fill="red"
    //       viewBox="0 0 1024 1024"
    //     >
    //       <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
    //     </svg>
    //   );
    // }

    // return (
    //   <svg
    //     x={cx - 10}
    //     y={cy - 10}
    //     width={20}
    //     height={20}
    //     fill="green"
    //     viewBox="0 0 1024 1024"
    //   >
    //     <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
    //   </svg>
    // );
  };

  const CustomEditJournal = (props) => {
    const { payload } = props;
    console.log("props", props);
    console.log("paylod", payload);
    console.log("open", open);

    // if (open) {
    //   return (
    //     <Box className={sizing().className}>
    //       <Box>
    //         <Button
    //           onClick={() => {
    //             handleClose();
    //           }}
    //         >
    //           CLOSE
    //         </Button>
    //       </Box>
    //       <EditJournal journal={payload} />;
    //     </Box>
    //   );
    // }
  };

  // const backgroundcolor = () => {
  //   if (backgroundColorTrigger) {
  //     return "rgba(192,192,192,0.3)";
  //   } else {
  //     return " ";
  //   }
  // };

  return (
    <Grid sx={{ m: 4 }}>
      <Grid>{open ? CustomizedDot() : <></>}</Grid>
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
              // onClick={() => {
              //   console.log("do later");
              // }}
            >
              <Line
                name="overall"
                isAnimationActive={false}
                type="monotone"
                dataKey="ratings.overall"
                stroke="white"
                strokeWidth={2}
                dot={<CustomizedDot />}
                activeDot={{
                  onClick: () => {
                    handleOpen();
                  },
                }}
              />
              <Line
                name="anxiety"
                type="monotone"
                dataKey="ratings.anxiety"
                stroke="#ab0202"
                strokeWidth={2}
                dot={<CustomizedDot />}
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

              <Tooltip isAnimationActive={true} position={sizing().tooltip} />
            </LineChart>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
