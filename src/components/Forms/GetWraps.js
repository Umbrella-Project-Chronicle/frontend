import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { DateTime } from "luxon";
import { LineChart, Line, Legend } from "recharts";

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
  const [ratingsArray, setRatingsArray] = useState(null);

  const GetJournals = async () => {
    console.log("hello");
    try {
      let res = await axios.post("https://localhost:7177/api/recap", {
        startDate: ONE_MONTH_AGO,
        endDate: DateTime.now(),
        userID: userID,
      });
      setJournals(res.data);
      setTrigger(!trigger);
      console.log(res);
      console.log(trigger);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetJournals();
  }, []);

  useEffect(() => {
    GetAverages();
  }, [trigger]);

  function Sum(array) {
    var sum = array.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  }

  const GetAverages = () => {
    if (journals) {
      let overallAverage = [];
      let anxietyAverage = [];
      let depressionAverage = [];
      let happinessAverage = [];
      let lonelinessAverage = [];
      let sadnessAverage = [];
      let data = [];

      journals.map((journal, i) => {
        overallAverage.push(journal.ratings.overall);
        anxietyAverage.push(journal.ratings.anxiety);
        depressionAverage.push(journal.ratings.depression);
        happinessAverage.push(journal.ratings.happiness);
        lonelinessAverage.push(journal.ratings.loneliness);
        sadnessAverage.push(journal.ratings.sadness);
        data.push(journal.ratings);
      });
      let overall = (Sum(overallAverage) / journals.length).toFixed(1);
      let anxiety = (Sum(anxietyAverage) / journals.length).toFixed(1);
      let depression = (Sum(depressionAverage) / journals.length).toFixed(1);
      let happiness = (Sum(happinessAverage) / journals.length).toFixed(1);
      let loneliness = (Sum(lonelinessAverage) / journals.length).toFixed(1);
      let sadness = (Sum(sadnessAverage) / journals.length).toFixed(1);
      setAverages({
        overall: overall,
        anxiety: anxiety,
        depression: depression,
        happiness: happiness,
        loneliness: loneliness,
        sadness: sadness,
      });
      setRatingsArray(data);

      // console.log(averages);
    } else {
      return "no data";
    }
  };
  console.log("ratings array", ratingsArray);
  return (
    <>
      <div>
        <button
          onClick={() => {
            setTrigger(!trigger);
            console.log(trigger);
          }}
        >
          Refresh Averages
        </button>
        {averages ? (
          <>
            <ul>
              <li>Overall: {averages.overall}</li>
              <li>Anxiety: {averages.anxiety}</li>
              <li>Depression: {averages.depression}</li>
              <li>Happiness: {averages.happiness}</li>
              <li>Lonliness: {averages.loneliness}</li>
              <li>Sadness: {averages.sadness}</li>
            </ul>

            <LineChart width={300} height={100} data={ratingsArray}>
              <Line isAnimationActive={false} type="monotone" dataKey="overall" stroke="white" strokeWidth={2} />
              <Line type="monotone" dataKey="anxiety" stroke="#ab0202" strokeWidth={2} />
              <Line type="monotone" dataKey="loneliness" stroke="#038007" strokeWidth={2} />
              <Line type="monotone" dataKey="depression" stroke="#026969" strokeWidth={2} />
              <Line type="monotone" dataKey="happiness" stroke="#f5c402" strokeWidth={2} />
              <Line type="monotone" dataKey="sadness" stroke="#020ff5" strokeWidth={2} />
              <Legend verticalAlign="bottom" height={36} />
            </LineChart>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
