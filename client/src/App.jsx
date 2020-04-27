import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import MeetupDetails from "./components/Meetups/MeetupDetails";
import MeetupFind from "./components/Meetups/MeetupFind";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MeetupCreate from "./pages/MeetupCreate/MeetupCreate";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchIP } from "./actions/";

class App extends Component {
  componentWillMount() {
    this.props.fetchIP();
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meetups/:id" component={MeetupDetails} />
          <Route exact path="/find/:category" component={MeetupFind} />
          <Route exact path="/find" component={MeetupFind} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/me" component={Profile} />
          <PrivateRoute exact path="/meetup/create" component={MeetupCreate} />
        </Switch>
        {location.pathname !== "/meetup/create" && <Footer />}
      </div>
    );
  }
}

App.propTypes = {
  fetchIP: PropTypes.func.isRequired,
  meta: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    meta: state.meta.meta,
  };
};

export default connect(mapStateToProps, { fetchIP })(withRouter(App));
