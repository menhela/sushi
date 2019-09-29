import React from 'react';
import { Redirect } from 'react-router-dom';
import {getWarning} from '../api';

export default class Redirector extends React.Component {
  componentDidMount() {
    getWarning(this.props.match.params.hashId).then(result => {
      const guiltArray = result.guilts.map(value => {
        return value.id
      });
      this.guilts = result.guilts;
      this.setState({
        contentArray: result.evidences,
        guiltArray,
        victimTwitterId: result.warning.victim_account_id,
        victimTwitterAccountName: result.warning.victim_name,
        assaulterTwitterId: result.warning.assaulter_account_id,
        assaulterTwitterAccountName: result.warning.assaulter_name,
        redirect: true,
      })
    });
  }

  constructor(props) {
    super(props);
    this.state = {redirect: false}
  }

  render() {
    const {redirect} = this.state
    return (
      <>
        {redirect === true && (<Redirect to={{pathname: '/sheet', state: this.state, guilts: this.guilts}} />)}
      </>
    );
  }
}
