import React from 'react';
import { withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { func } from 'prop-types';
import StatusBar from '../components/StatusBar';

const GuiltForm = withStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    border: 'solid 1px #ccc',
    background: '#fff',
    alignItems: 'stretch',
    padding: '25px 20px',
    margin: '0 auto',
    marginTop: 100,
    marginBottom: 40,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 42px)',
    },
  },
  radioButton: {
    padding: '20px',
    border: 'solid 1px #ccc',
    margin: '0px 10px 20px',
    height: 250,
    [theme.breakpoints.up('sm')]: {
      width: '35%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '65%',
    },
    '&:hover' : {
      background: '#eee',
    }
  },
  radioButtonClicked: {
    transition: '0.5s',
    padding: '20px',
    border: 'solid 1px #ccc',
    background: '#ccc',
    margin: '0px 10px 20px',
    height: 250,
    [theme.breakpoints.up('sm')]: {
      width: '35%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '65%'
    }
  },
  lack: {
    padding: '20px',
    margin: '0px 10px',
    width: '35%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    width: 'calc(100% + 41px)',
    marginLeft: -21,
    paddingBottom: 30,
    borderBottom: 'solid 1px #eee',
  },
  guiltName: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 16
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  },
  description: {
    textAlign: 'left',
    margin: '0 auto'
  },
  root: {
    background: 'red'
  },
  caution: {
    fontSize: 10
  }
}))(props => {
  const { classes, onClick, guiltArray, guilts, stepNum, validateResult } = props;
  const guiltsForShow = guilts.length % 2 === 0 ? guilts : (guilts + [, '']).split(',');

  return (
    <>
      <StatusBar stepNum={stepNum} />
      <div className={classes.container}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={validateResult !== ''}
          ContentProps={{ classes: { root: classes.root } }}
          message={<span>{validateResult}</span>}
        />
        <h1 className={classes.title}>該当している罪を選択してください(複数選択可)</h1>
        {guiltsForShow.map((guilt, index) => {
          if (guilt !== '') {
            const guiltClass = !guiltArray.includes(guilt.id) ? classes.radioButton : classes.radioButtonClicked;
            return (
              <div key={guilt.id} className={guiltClass} onClick={() => onClick(guilt.id)}>
                <h2 className={classes.guiltName}>{guilt.name}</h2>
                <p className={classes.description}>{guilt.example}</p>
              </div>
            );
          } else {
            return <div key={guilt.id} className={classes.lack}></div>;
          }
        })}
        <p className={classes.caution} >※必ずしも上記の罪に該当するとは限りません</p>
      </div>
    </>
  );
});

export default GuiltForm;
