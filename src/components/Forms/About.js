import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Grid, Card } from "@mui/material";
import useStyles from "../../styles";
import { CardContent, Typography, IconButton } from "@material-ui/core";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TimesOneMobiledataIcon from "@mui/icons-material/TimesOneMobiledata";
import CancelIcon from "@mui/icons-material/Cancel";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { OverlayTrigger } from "react-bootstrap";

export const AboutCards = () => {
  const [trigger, setTrigger] = useState(true);
  const classes = useStyles();
  const items = [
    {
      title: "Welcome to Chronicle!",
      subtitle: "What We're About",
      body: "we simply want to provide a simple, easy to use tool that will track your emotional history and lend a helping hand in you becoming a more emotioanlly mature person.",
      icon: "",
    },
    {
      title: "How It Works",
      subtitle: "It's So Simple",
      body: "Every Day, We'll send you a reminder to journal and you can choose from 3 types that suits your needs",
      icon: "",
    },
    {
      title: "Option 1 - 'Full'",
      subtitle: "Best Option (in our opinion)",
      body: "This provides the most data and gets you the most out of our app. You provide a 0-10 rating on 6 emotions as well as a journal on how your day went.",
      icon: <StarBorderIcon style={{ fontSize: "100px" }} />,
      icon2: <DriveFileRenameOutlineIcon style={{ fontSize: "100px" }} />,
    },
    {
      title: "Option 2 - Standard",
      subtitle: "Still Privides Data If You're In a Hurry",
      body: "You just provide your ratings for 6 emotions",
      icon: <StarBorderIcon style={{ fontSize: "100px" }} />,
    },
    {
      title: "Option 3 - Brief",
      subtitle: "If you're really in a hurry",
      body: "If you're super busy but still want to track your data, you can provide a brief 1 rating on your overall day.",
      icon: <StarBorderIcon style={{ fontSize: "100px" }} />,
      icon2: <TimesOneMobiledataIcon style={{ fontSize: "100px" }} />,
    },
    {
      title: "Wrap",
      subtitle: "The Power of Our App",
      body: "After 1 month of tracking you emotions, Chronicle will provide you a simple but effective 'Wrap' on your emotional history. As long as you stayed consistent with your daily inputs, this will provide you a clear picture of where you've been, and where you're going.",
      icon: "",
    },
    {
      title: "Summary",
      subtitle: "It's as powerful as you want it to be",
      body: "While we did try to alleviate barriers that prevent people from journalling, unltimately it's up to you how consistent you want to be with your progress. Happy Chronicling! ",
      icon: "",
      link: "",
    },
  ];

  return (
    <Grid minWidth={300} sx={{ position: "fixed" }}>
      {trigger ? (
        <Carousel height="1000px" navButtonsAlwaysVisible="true">
          {items.map((item, i) => (
            <Grid>
              <Card
                sx={{
                  background: "rgba(240, 240, 240,1.0)",
                  maxWidth: 300,
                }}
                className={classes.alignCarItems}
              >
                <CardContent>
                  <Box
                    onClick={() => {
                      setTrigger(false);
                      localStorage.removeItem("firstTime");
                    }}
                  >
                    <CancelIcon />
                  </Box>
                  <Typography sx={{ fontSize: 14 }}>{item.title}</Typography>
                  <Typography variant="h4"> {item.subtitle}</Typography>
                  <Typography>{item.body}</Typography>
                  <Grid>{item.icon}</Grid>
                  <Grid>{item.icon2}</Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Carousel>
      ) : (
        <></>
      )}
    </Grid>
  );
};
