import React from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import StatusBar from '../components/StatusBar';

const VictimForm = withStyles(theme => ({
  container: {
    border: 'solid 1px #ccc',
    background: '#fff',
    alignItems: 'center',
    padding: '25px 20px',
    margin: '0 auto',
    marginTop: 100,
    marginBottom: 40,
    [theme.breakpoints.up('sm')]: {
      width: 600
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 42px)'
    }
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    width: 'calc(100% + 41px)',
    marginLeft: -21,
    paddingBottom: 30,
    borderBottom: 'solid 1px #eee'
  },
  form: {
    marginBottom: 10
  },
  victimForm: {
    marginBottom: 30
  }
}))(props => {
  const {
    classes,
    stepNum,
    onChange,
    assaulterTwitterAccountName,
    assaulterTwitterId,
    victimTwitterAccountName,
    victimTwitterId,
    validateResult
  } = props;
  return (
    <>
      <StatusBar stepNum={stepNum} />
      <div className={classes.container}>
        <h1 className={classes.title}>あなたと加害者の情報を入力してください</h1>
        <div className={classes.victimForm}>
          <div className={classes.form}>
            <label className={classes.label}>あなたのSNSアカウント名</label>
            <TextField
              error={validateResult[0] !== ''}
              helperText={validateResult[0]}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              autoFocus
              fullWidth
              onChange={e => onChange(e, 'victimTwitterAccountName')}
              placeholder="例) ツムラ"
              defaultValue={victimTwitterAccountName}
            />
          </div>
          <div className={classes.form}>
            <label className={classes.label}>あなたのSNSのID</label>
            <TextField
              error={validateResult[1] !== ''}
              helperText={validateResult[1]}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => onChange(e, 'victimTwitterId')}
              placeholder="例) tsmrkk(アカウントIDは@以降です)"
              defaultValue={victimTwitterId}
            />
          </div>
        </div>
        <div className={classes.assaulterForm}>
          <div className={classes.form}>
            <label className={classes.label}>加害者のSNSアカウント名</label>
            <TextField
              error={validateResult[2] !== ''}
              helperText={validateResult[2]}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => onChange(e, 'assaulterTwitterAccountName')}
              placeholder="例) まえちゃん"
              defaultValue={assaulterTwitterAccountName}
            />
          </div>
          <div className={classes.form}>
            <label className={classes.label}>加害者のSNSのID</label>
            <TextField
              error={validateResult[3] !== ''}
              helperText={validateResult[3]}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => onChange(e, 'assaulterTwitterId')}
              placeholder="例) maeeeeeeeeeeee(アカウントIDは@以降です)"
              defaultValue={assaulterTwitterId}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default VictimForm;
