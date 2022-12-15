import React, { useEffect } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";

import useStyles from "../../styles";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TimesOneMobiledataIcon from "@mui/icons-material/TimesOneMobiledata";
import { useMediaQuery } from "react-responsive";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export const NewJournal = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  const iconSize = () => {
    const mobile = {
      typography: "h5",
      icon: "100px",
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
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">Full</Typography>
          </Box>

          <Box className={classes.alignItems} style={{ marginBottom: "50px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/full");
              }}
            >
              <StarBorderIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
              <Typography variant="h3" style={{ color: "black" }}>
                +
              </Typography>
              <DriveFileRenameOutlineIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">Standard</Typography>
          </Box>
          <Box className={classes.alignItems} style={{ marginBottom: "50px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/standard");
              }}
            >
              <StarBorderIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems} style={{ marginTop: "75px" }}>
            <Typography variant="h3">Brief</Typography>
          </Box>
          <Box className={classes.alignItems} style={{ marginBottom: "50px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/brief");
              }}
            >
              <StarHalfIcon
                style={{ fontSize: iconSize().icon, color: "black" }}
              />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
