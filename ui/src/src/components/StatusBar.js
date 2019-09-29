import React from 'react';
import { withStyles } from '@material-ui/core';

const StatusBar = withStyles(theme => ({
  container: {
    textAlign: 'center',
    position: 'relative',
    top: 20,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  line: {
    borderTop: 'solid 2px #5d84a9',
    position: 'absolute',
    top: 35,
    left: 10,
    width: 'calc(100% - 20px)'
  },
  step: {
    position: 'absolute',
    width: 40,
    height: 32,
    paddingTop: 8,
    background: '#ccc',
    borderRadius: '50%',
    zIndex: '10',
    color: '#fff'
  },
  first: {
    left: '0%',
    background: '#46709a'
  },
  second: {
    left: 'calc(50% - 20px)',
    background: '#46709a'
  },
  third: {
    left: 'calc(100% - 40px)',
    background: '#46709a'
  },
  current: {
    background: '#90cdc3'
  }
}))(props => {
  const {classes, stepNum} = props; 
  const firstClassName = stepNum === 1 ? classes.step + ' ' + classes.first + ' ' + classes.current : classes.step + ' ' + classes.first;
  const secondClassName = stepNum === 2 ? classes.step + ' ' + classes.second + ' ' + classes.current : classes.step + ' ' + classes.second;
  const thirdClassName = stepNum === 3 ? classes.step + ' ' + classes.third + ' ' + classes.current : classes.step + ' ' + classes.third;

  return (
    <div className={classes.container} >
      <p className={firstClassName} >1</p>
      <p className={secondClassName} >2</p>
      <p className={thirdClassName} >3</p>
      <div className={classes.line}></div>
    </div>
  );
});

export default StatusBar;