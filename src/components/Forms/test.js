import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Input from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageList from "@material-ui/core/ImageList";
import { CardActionArea, CardMedia } from "@material-ui/core";
import { ImageListItem } from "@mui/material";
import Container from "@mui/material/Container";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Journals" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SignalCellularAltIcon />
          </ListItemIcon>
          <ListItemText primary="Wraps" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <InsertEmoticonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    gridList: {
      width: "100%",
      height: "auto",
    },
    card: {
      maxWidth: "auto",
      height: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TEst TEst
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Container>
        <ImageList
          rowHeight={"auto"}
          gap={12}
          sx={{ mb: 8, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))!important" }}
        >
          <Card>
            <ImageListItem sx={{ height: "100% !important" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="body2" component="h2">
                    The unanimous Declaration of the thirteen united States of America, When in the Course of human
                    events, it becomes necessary for one people to dissolve the political bands which have connected
                    them with another, and to assume among the powers of the earth, the separate and equal station to
                    which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of
                    mankind requires that they should declare the causes which impel them to the separation. We hold
                    these truths to be self-evident, that all men are created equal, that they are endowed by their
                    Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of
                    Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just
                    powers from the consent of the governed, --That whenever any Form of Government becomes destructive
                    of these ends, it is the Right of the People to alter or to abolish it, and to institute new
                    Government, laying its foundation on such principles and organizing its powers in such form, as to
                    them shall seem most likely to effect their Saf
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ImageListItem>
          </Card>
          <Card>
            <ImageListItem sx={{ height: "100% !important" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="body2" component="h2">
                    The unanimous Declaration of the thirteen united States of America, When in the Course of human
                    events, it becomes necessary for one people to dissolve the political bands which have connected
                    them with another, and to assume among the powers of the earth, the separate and equal station to
                    which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of
                    mankind requires that they should declare the causes which impel them to the separation. We hold
                    these truths to be self-evident, that all men are created equal, that they are endowed by their
                    Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of
                    Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just
                    powers from the consent of the governed, --That whenever any Form of Government becomes destructive
                    of these ends, it is the Right of the People to alter or to abolish it, and to institute new
                    Government, laying its foundation on such principles and organizing its powers in such form, as to
                    them shall seem most likely to effect their Saf
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ImageListItem>
          </Card>
          <Card>
            <ImageListItem sx={{ height: "100% !important" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="body2" component="h2">
                    The unanimous Declaration of the thirteen united States of America, When in the Course of human
                    events, it becomes necessary for one people to dissolve the political bands which have connected
                    them with another, and to assume among the powers of the earth, the separate and equal station to
                    which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of
                    mankind requires that they should declare the causes which impel them to the separation. We hold
                    these truths to be self-evident, that all men are created equal, that they are endowed by their
                    Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of
                    Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just
                    powers from the consent of the governed, --That whenever any Form of Government becomes destructive
                    of these ends, it is the Right of the People to alter or to abolish it, and to institute new
                    Government, laying its foundation on such principles and organizing its powers in such form, as to
                    them shall seem most likely to effect their Saf
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ImageListItem>
          </Card>
          <Card>
            <ImageListItem sx={{ height: "100% !important" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="body2" component="h2">
                    The unanimous Declaration of the thirteen united States of America, When in the Course of human
                    events, it becomes necessary for one people to dissolve the political bands which have connected
                    them with another, and to assume among the powers of the earth, the separate and equal station to
                    which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of
                    mankind requires that they should declare the causes which impel them to the separation. We hold
                    these truths to be self-evident, that all men are created equal, that they are endowed by their
                    Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of
                    Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just
                    powers from the consent of the governed, --That whenever any Form of Government becomes destructive
                    of these ends, it is the Right of the People to alter or to abolish it, and to institute new
                    Government, laying its foundation on such principles and organizing its powers in such form, as to
                    them shall seem most likely to effect their Saf
                  </Typography>
                </CardContent>
              </CardActionArea>
            </ImageListItem>
          </Card>
        </ImageList>
      </Container>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
