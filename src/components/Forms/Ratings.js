import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

function Ratings({ emotion }) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: "the worst",
    1: "terrible",
    1.5: "bad",
    2: "okay",
    2.5: "little better than okay",
    3: "average",
    3.5: "pretty good",
    4: "great",
    5: "amazing!",
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        MarginTop: "100px",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
}

export default Ratings;
