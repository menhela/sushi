import React from "react";
import { withStyles } from "@material-ui/core";
import Step from "../components/Step";
import Agreement from "../components/Agreement";
import AgreementButton from "../components/AgreementButton";
import { Redirect } from "react-router-dom";
import { flexbox } from "@material-ui/system";
import background from "../../static/background.png";

@withStyles(theme => ({
  container: {
  },
  top: {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    [theme.breakpoints.up("sm")]: {
      paddingTop: 80,
      paddingBottom: 80,
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: 30,
      paddingBottom: 30,
    }
  },
  border: {
    borderTop: 'solid 1px #000',
    margin: '0 auto',
    height: 2,
    [theme.breakpoints.up("sm")]: {
      width: '25%',
    },
    [theme.breakpoints.down("xs")]: {
      width: '80%',
    }
  },
  title: {
    fontFamily: "'Noto Serif JP', serif",
    margin: 0,
    paddingBottom: 13,
    margin: '0 auto',
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      fontSize: 65
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 45
    }
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: 30
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25
    }
  },
  description: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
      marginTop: 35,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginTop: 0
    }
  },
  detail: {
    padding: '60px 0px',
    borderBottom: 'solid 1px #ccc',
    marginBottom: 50,
    margin: '0 auto',
    width: '90%'
  }
}))
export default class Top extends React.Component {
  constructor(props) {
    super(props);
    this.stepArray = [
      "加害者のアカウント情報を入力",
      "証拠となる投稿等の情報を入力",
      "違反している法律を選択"
    ];
    this.state = {
      redirect: false
    };
  }

  onClick = () => {
    this.props.history.push("/");
    this.setState({ redirect: true });
  };

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    return (
      <div className={classes.container}>
        {redirect === true && <Redirect to={"/question"} />}
        <div className={classes.top} >
          <h1 className={classes.title}>スマート通告</h1>
          <div className={classes.border} ></div>
          <p className={classes.description}>簡単 3STEP で通告書作成</p>
        </div>
        <div className={classes.detail}>
          <h1　className={classes.subtitle} >仕組み</h1>
          {this.stepArray.map((text, index) => {
            return <Step text={text} index={index + 1} key={index} />
          })}
        </div>
        <Agreement />
        <AgreementButton onClick={this.onClick} />
      </div>
    );
  }
}