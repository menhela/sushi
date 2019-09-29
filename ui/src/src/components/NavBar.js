import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import logo from "../../static/logo.png";

@withStyles(theme => ({
  header: {
    background: "#90cdc3",
    color: "white",
    fontWeight: "bold"
  },
  wrapper: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "70%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%"
    }
  },
  title: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
      marginRight: 20
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
      marginRight: 10
    }
  },
  image: {
    width: 60,
    marginRight: 20
  },
  logoside: {
    fontFamily: "'Noto Serif JP', serif"
  }
}))
export default class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <header className={classes.header}>
        <div className={classes.wrapper}>
          <Link className={classes.title} to="/">
            <img className={classes.image} src={logo} />
            <p className={classes.logoside}>スマート通告</p>
          </Link>
        </div>
      </header>
    );
  }
}
