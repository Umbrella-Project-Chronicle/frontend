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
    marginTop: "100px",
    justifyContent: "space-between",
    minHeight: 500,
    minWidth: 500,
  },
}));

export default useStyles;
