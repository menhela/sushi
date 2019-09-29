import React from 'react'
import {withStyles} from '@material-ui/core'

@withStyles(theme => ({
  container: {
    margin: '0 auto',
    padding: 20,
    background: '#fff',
    border: 'solid 1px #ccc',
    marginBottom: 50,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 40px)',
    },
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 25
  },
  guilt: {
    fontWeight: 'bold',
    marginBottom: -10
  },
  description: {
    marginBottom: 25,
  },
}))
export default class GuiltDescription extends React.Component {
  render() {
    const {guilts, classes} = this.props
    return (
      <div className={classes.container} >
        <p className={classes.title} >罪の説明</p>
        {guilts.map((guilt, index) => {
          return (
            <div key={index}>
              <p className={classes.guilt} >{guilt.name}</p>
              <p className={classes.description} >{guilt.description}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
