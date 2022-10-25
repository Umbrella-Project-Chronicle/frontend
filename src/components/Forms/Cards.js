import { Grid, CardHeader, Paper, Typography } from "@mui/material";

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    height: "100%",
    width: "100%",
  },
};

export const wrapCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="Wraps" />
      <Paper style={classes.paper}>
        <Typography variant="h4">Wraps go here</Typography>
      </Paper>
    </Grid>
  </div>
);

export const statCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="stats" />
      <Paper style={classes.paper}>
        <Typography variant="h4">stats go here</Typography>
      </Paper>
    </Grid>
  </div>
);

export const profileCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="profiles" />
      <Paper style={classes.paper}>
        <Typography variant="h4">profiles go here</Typography>
      </Paper>
    </Grid>
  </div>
);
export const aboutCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="abouts" />
      <Paper style={classes.paper}>
        <Typography variant="h4">abouts go here</Typography>
      </Paper>
    </Grid>
  </div>
);
export const helpCards = (
  <div>
    <Grid item xs={12} sm={6} md={3} sx={{ m: 4 }}>
      <CardHeader title="helps" />
      <Paper style={classes.paper}>
        <Typography variant="h4">helps go here</Typography>
      </Paper>
    </Grid>
  </div>
);


