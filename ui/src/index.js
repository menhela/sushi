import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import ReactGA from "react-ga";
import createBrowserHistory from "history/createBrowserHistory";

ReactGA.initialize("UA-128421111-1");
const history = createBrowserHistory();
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

ReactDOM.render(<App />, document.getElementById("root"));
