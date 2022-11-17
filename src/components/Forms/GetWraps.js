import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { DateTime } from "luxon";
import { LineChart, Line, Legend, XAxis, YAxis } from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Card, Box, Grid, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import circularProgressClasses from "@mui/material";

export const GetWraps = () => {
  const { DateTime } = require("luxon");
  const ONE_MONTH_AGO = new Date();
  ONE_MONTH_AGO.setMonth(ONE_MONTH_AGO.getMonth() - 1);
  const userID = localStorage.getItem("id");
  const [journals, setJournals] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [averages, setAverages] = useState({
    overall: null,
    anxiety: null,
    depression: null,
    happiness: null,
    loneliness: null,
    sadness: null,
  });

  const GetJournals = async () => {
    try {
      let res = await axios.post("https://localhost:7177/api/recap/journals", {
        startDate: ONE_MONTH_AGO,
        endDate: DateTime.now(),
        userID: userID,
      });
      setJournals(res.data);
      console.log(res);
      console.log(trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const ApiGetAverages = async () => {
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: ONE_MONTH_AGO,
        endDate: DateTime.now(),
        userID: userID,
      });
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

  console.log("journals", journals);

  useEffect(() => {
    GetJournals();
  }, []);

  useEffect(() => {
    ApiGetAverages();
  }, [journals]);

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

  return (
    <Grid>
      {averages ? (
        <Grid>
          <Grid item style={{ margin: 10 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableCell>Emotion</StyledTableCell>
                  <StyledTableCell>Average for the Month</StyledTableCell>
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
          <Grid item style={{ margin: 10 }}>
            <Box>
              <LineChart width={350} height={200} data={journals}>
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
                <XAxis dataKey="date" />
              </LineChart>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
