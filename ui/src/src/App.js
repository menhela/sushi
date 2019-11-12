import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Top from './containers/Top';
import Question from './containers/Question';
import Sheet from './containers/Sheet';
import { Button, withStyles, withWidth } from '@material-ui/core';
import Redirector from './containers/Redirector';
import ReactGA from 'react-ga';

export default class App extends React.Component {
  componentDidMount() {
    // const { pathname } = this.props.location;
    const { pathname } = document.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  constructor(props) {
    super(props);
    this.state = {
      // guiltsには{title: hoge, description: hoge}みたいに入っている。
      guilts: []
    };
  }

  render() {
    const { user, message, errorMessage } = this.state;
    return (
      <div>
        <Router history={history}>
          <NavBar />
          <Switch>
            <Route exact path="/question" component={Question} />
            <Route exact path="/sheet" component={Sheet} />
            <Route exact path="/warning/:hashId" component={Redirector} />
            <Route path="/" component={Top} />
          </Switch>
        </Router>
      </div>
    );
  }
}
