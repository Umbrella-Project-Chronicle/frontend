import React, { useState } from "react";
import axios from "axios";
import { Card, Box, CardContent, Typography, CardHeader, Divider, Link, List, ListItem, Grid } from "@mui/material";

export const PostJournal = (text) => {
  // console.log("called postJournal", "tokemn", token, "userID", user.id, "firstName", user.firstName, "text", text);
  const token = JSON.parse(localStorage.getItem("userToken"));
  const [firstJournal, setFirstJournal] = useState(false);
  const [secondJournal, setSecondJournal] = useState(false);
  const [thirdJournal, setThirdJournal] = useState(false);
  const [initial, setInitial] = useState(true);

  const postJournal = () => {
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 3,
          // UserId: user.id,
          Ratings: {
            Overall: 1,
            Happiness: 1,
            Depression: 1,
            Anxiety: 1,
            Sadness: 1,
            Loneliness: 1,
          },
          Response: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("journal post", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid item>
      <Card item xs={12} sm={6} md={3} sx={{ backgroundColor: "#2E3B55", m: 4 }}>
        <CardContent align="center">
          <CardHeader title="Choose Journal Type" sx={{ mb: "-10px" }} />
          <Divider color="white" sx={{ borderBottomWidth: "5px" }} />
          <List>
            <ListItem>
              <Typography
                component="a"
                href="/newjournals/brief"
                sx={{ mt: "10px", fontSize: 20 }}
                color="white"
                gutterBottom
              >
                Brief Journal
              </Typography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Typography component="a" href="/newjournals/standard" sx={{ fontSize: 20 }} color="white" gutterBottom>
                Standard Journal
              </Typography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Typography component="a" href="/newjournals/full" sx={{ fontSize: 20 }} color="white" gutterBottom>
                Full Journal
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};
