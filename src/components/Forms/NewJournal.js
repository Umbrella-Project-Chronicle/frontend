import React, { useEffect } from "react";
import { Grid, Box, Card, Typography } from "@material-ui/core";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HistoryIcon from "@mui/icons-material/History";

import useStyles from "../../styles";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TimesOneMobiledataIcon from "@mui/icons-material/TimesOneMobiledata";

export const NewJournal = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems}>
            <Typography variant="h3">Full</Typography>
          </Box>

          <Box className={classes.alignItems} style={{ mt: "30px" }}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/full");
              }}
            >
              <StarBorderIcon style={{ fontSize: "200px" }} />
              <Typography variant="h3">+</Typography>
              <DriveFileRenameOutlineIcon style={{ fontSize: "200px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems}>
            <Typography variant="h3">Standard</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/standard");
              }}
            >
              <StarBorderIcon style={{ fontSize: "200px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Card
          style={{
            minHeight: "300px",
            backgroundColor: "rgba(240, 240, 240,0.8)",
            p: 3,
            borderRadius: 10,
          }}
        >
          <Box className={classes.alignItems} style={{ p: 10 }}>
            <Typography variant="h3">Brief</Typography>
          </Box>
          <Box className={classes.alignItems}>
            <IconButton
              onClick={() => {
                navigate("/newjournals/brief");
              }}
            >
              <TimesOneMobiledataIcon style={{ fontSize: "200px" }} />
              <StarBorderIcon style={{ fontSize: "200px" }} />
            </IconButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
