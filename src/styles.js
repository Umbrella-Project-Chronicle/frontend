import { makeStyles } from "@material-ui/core/styles";
import chronicleLogo from "../src/logo.ico";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(20, 0, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // backgroundImage: `url(${chronicleLogo})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "50% 100%",
    // backgroundAttachment: "fixed",
    // backgroundColor: "#282c34",
    // backgroundSize: "450px 500px",
  },
  component: {
    // padding: theme.spacing(20),
    // marginTop: "400px",
  },
  alignItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alignCarItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  aboutModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "background.paper",
    p: 4,
  },
  journalModal: {
    // display: "none" /* Hidden by default */,
    position: "fixed" /* Stay in place */,
    zIndex: "1" /* Sit on top */,
    left: "25%",
    top: "25%",
    width: "50%" /* Full width */,
    height: "50%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgb(0,0,0)" /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
  },
  mobileJournalModal: {
    // display: "none" /* Hidden by default */,
    position: "fixed" /* Stay in place */,
    zIndex: "1" /* Sit on top */,
    left: "15%",
    top: "20%",
    width: "75%" /* Full width */,
    height: "75%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgb(0,0,0)" /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
  },
}));

export default useStyles;
