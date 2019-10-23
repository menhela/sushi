import React from 'react'
import { withStyles } from '@material-ui/core'

const Footer = withStyles((theme) => ({
  footer: {
    margin: '0 auto',
    bottom: '0px',
    padding: '10px 20px',
    background: '#fff',
    border: 'solid 1px #ccc',
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 50,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 42px)',
    },
  },
  button: {
    padding: '10px 20px',
    outline: 'none',
    border: 'none',
    borderRadius: '5px',
    fontSize: 15,
    color: '#fff',
  },
  prev: {
    background: '#90cdc3',
  },
  next: {
    background: '#46709a',
  },
}))((props) => {
  const {classes, toNext, toPrev} = props
  return (
    <footer className={classes.footer}>
      {toPrev === undefined && <div></div>}
      {toPrev !== undefined && <button onClick={toPrev} className={classes.prev + ' ' + classes.button} >戻る</button>}
      {toNext !== undefined && <button onClick={toNext} className={classes.next + ' ' + classes.button} >進む</button>}
    </footer>
  )
})

export default Footer
