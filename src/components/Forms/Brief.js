import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";

export const Brief = () => {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const userID = localStorage.getItem("id");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);

  const postJournal = () => {
    axios
      .post(
        "https://localhost:7177/api/journal",
        {
          JournalType: 3,
          UserId: userID,
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
        setSuccess(true);
        console.log("journal post", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {success && <Alert severity="success">Submitted Journal!</Alert>}
      <Box sx={{ mb: "75px" }} backgroundColor="gray" width="400px">
        <TextField
          autoComplete
          placeholder="Journal Here"
          multiline
          fullWidth
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </Box>
      <Button
        onClick={() => {
          postJournal();
        }}
        sx={{ mb: "50px" }}
      >
        {" "}
        Submit Journal
      </Button>
    </div>
  );
};
