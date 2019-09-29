import React from "react";
import { withStyles } from "@material-ui/core";
import { flexbox } from "@material-ui/system";

const Step = withStyles(theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "0 auto 20px",
    borderRadius: 10,
    border: "2px solid rgba(255, 255, 255, 0.3)",
    background: "#FFFFFF",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
    padding: 20,
    width: 400,
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
      width: 'calc(90% - 40px)',
    }
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10,
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
      marginLeft: 20
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 16
    }
  }
}))(props => {
  const { classes, index, text } = props;
  return (
    <div className={classes.container}>
      <div className={classes.title}>{index}</div>
      <div className={classes.content}>{text}</div>
    </div>
  );
});

export default Step;
