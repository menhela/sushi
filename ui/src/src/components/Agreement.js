import React from 'react'
import { withStyles } from '@material-ui/core'

const Agreement = withStyles((theme) => ({
  container: {
    color: '#333333',
    padding: 20,
    overflow: 'scroll',
    border: '1px solid #ccc',
    background: '#fff',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: 560,
      height: 200,
    },
    [theme.breakpoints.down('xs')]: {
      width: '70%',
      height: 150,
    },
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  content: {
    fontSize: 12,
  },
}))((props) => {
  const {classes, index, text} = props
  return (
    <div className={classes.container}>
      <p className={classes.title}>
       同意書
      </p>
      <div className={classes.content}>
        <p>第一条(免責)</p>
        本サービスに関連して生じた利用者及び第三者の結果的損害、付随的損害、逸失利益等の間接損害について、それらの予見または予見可能性の有無にかかわらず、当社は一切の責任を負いません。また、本サービスを利用し、通告書の作成を行った場合、利用者の意志で通告書の作成を行ったものとみなし、当社は一切の責任を負いません。
      </div>
    </div>
  )
})

export default Agreement
