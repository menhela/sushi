import React from 'react'
import { withStyles } from '@material-ui/core'

const AgreementButton = withStyles((theme) => ({
  content: {
    textAlign: 'center',
    marginBottom: 100,
  },
  button: {
    borderRadius: 5,
    border: 'none',
    textAlign: 'center',
    margin: '0 auto',
    background: '#90cdc3',
    color: '#fff',
    padding: '15px 20px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
    marginTop: 50,
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
    '&:hover': {
      background: '#46709a ',
    },
  },
}))((props) => {
  const {classes, onClick} = props
  return (
    <div className={classes.content} >
      <button className={classes.button} onClick={onClick}>
        同意して作成 
      </button>
    </div>
  )
})

export default AgreementButton
