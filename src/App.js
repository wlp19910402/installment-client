import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Routers from "@/plugins/libs/routerMap";
import { connect } from "react-redux";
import { SET_USER_INFO, SET_REDIRECT } from "@/store/actions";
import { fetchCheckLogin } from "@/store/actions/user";
import Main from "@/views/Main";
import Login from "@/views/Login";
import PropTypes from "prop-types";
import store from "@/store";
class App extends React.Component {
  async componentDidMount() {
    store.dispatch(await fetchCheckLogin());
  }
  render() {
    const loginFlag = this.props.user.accountId.trim() !== "";
    return (
      <Router>
        {Routers.map((item, index) => {
          if (item.path !== "/login") {
            return (
              <Route
                path={item.path}
                key={index}
                exact
                component={item.loginFlag && !loginFlag ? Login : item.component}
              />
            );
          }
          return <Route path={item.path} key={index} exact component={loginFlag ? Main : item.component} />;
        })}
      </Router>
    );
  }
}
App.propTypes = {
  user: PropTypes.object,
  setUserInfo: PropTypes.func,
  setRedirectPath: PropTypes.func,
};
export default connect(
  (state, props) => ({
    ...props,
    ...state,
  }),
  {
    setUserInfo(data) {
      return {
        type: SET_USER_INFO,
        data,
      };
    },
    setRedirectPath(data) {
      return {
        type: SET_REDIRECT,
        data,
      };
    },
  }
)(App);
