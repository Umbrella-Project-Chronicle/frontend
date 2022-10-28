import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

import { useNavigate } from "react-router-dom";
import Logo from "/Users/eliotpitman/Desktop/umbrella-project/frontend/src/logo.ico";

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ResponsiveAppBar(props) {
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    "@media all": {
      minHeight: 128,
    },
  }));

  // clears user storage and navigates to login
  const SignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (x) => {
    setAnchorElNav(null);
    navigate(x);
  };

  const handleCloseUserMenu = (x) => {
    setAnchorElUser(null);
    navigate(x);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar position="fixed" style={{ background: "#2E3B55" }}>
          <StyledToolbar>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <img src={Logo} alt="logo" style={{ maxWidth: 60, maxHeight: 60 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/journals"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  CHRONICLE
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={() => {
                      handleCloseNavMenu("");
                    }}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseNavMenu("/journals");
                      }}
                    >
                      <Typography textAlign="center">Past Journals</Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleCloseNavMenu("/wraps");
                      }}
                    >
                      <Typography textAlign="center">Wraps</Typography>
                    </MenuItem>
                    {/* <MenuItem
                      onClick={() => {
                        handleCloseNavMenu("/stats");
                      }}
                    >
                      <Typography textAlign="center">stats</Typography>
                    </MenuItem> */}
                  </Menu>
                </Box>
                {/* <img src={Logo} alt="logo" style={{ maxWidth: 60, maxHeight: 60 }} /> */}
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  CHRONICLE
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    onClick={() => {
                      handleCloseNavMenu("/journals");
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Past Journals
                  </Button>

                  <Button
                    onClick={() => {
                      handleCloseNavMenu("/wraps");
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Wrap
                  </Button>
                  {/* <Button
                    onClick={() => {
                      handleCloseNavMenu("/stats");
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    stats
                  </Button> */}
                </Box>

                <Button
                  onClick={() => {
                    handleCloseNavMenu("/newjournals");
                  }}
                  sx={{ align: "right", my: 2, mr: 2, mb: 3, color: "white", display: "block" }}
                >
                  <Typography variant="h3" name="New Journal">
                    +
                  </Typography>
                </Button>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={() => {
                      handleCloseUserMenu("");
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu("/profile");
                      }}
                    >
                      <Typography textAlign="center">profile</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu("/about");
                      }}
                    >
                      <Typography textAlign="center">about</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu("/help");
                      }}
                    >
                      <Typography textAlign="center">help</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        SignOut();
                      }}
                    >
                      <Typography sx={{ color: "red" }} textAlign="center">
                        sign out
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </StyledToolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}
export default ResponsiveAppBar;
