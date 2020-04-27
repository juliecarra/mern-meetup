import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { fetchMeetups } from "../../actions";
import { connect } from "react-redux";

import MeetupItem from "./MeetupItem";

class Meetups extends Component {
  componentDidMount() {
    this.props.fetchMeetups();
  }

  render() {
    const { meetups } = this.props;

    return (
      <div class="m-b-lg">
        <br />
        <Link
          to="/find"
          class="button  is-pulled-right m-r-sm"
          style={{ color: "#00a2c7", fontWeight: 700, borderColor: "#00a2c7" }}
        >
          See all
        </Link>
        <br />

        <br />
        <h1
          style={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#212121",
            fontFamily:
              "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
          }}
        >
          Events near you
        </h1>
        <p
          style={{
            fontWeight: 500,
            color: "#212121",
            fontFamily:
              "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
            fontSize: "16px",
          }}
        >
          See what's happening soon in your area.
        </p>
        <br />
        <div class="grid grid-cols-3 gap-4 Meetups">
          {meetups.map((meetup, i) => (
            <MeetupItem meetup={meetup} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

Meetups.propTypes = {
  fetchMeetups: PropTypes.func.isRequired,
  meetups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    meetups: state.meetups.meetups,
  };
};

export default connect(mapStateToProps, { fetchMeetups })(Meetups);
