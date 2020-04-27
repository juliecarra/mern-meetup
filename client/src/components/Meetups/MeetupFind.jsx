import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as moment from "moment";

import { fetchMeetups, fetchIP } from "../../actions";
import { connect } from "react-redux";

import HeroFind from "../../components/Hero/HeroFind";
import Spinner from "../../components/Spinner/Spinner";

class MeetupFind extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedLocation: "",
      category: this.props.match.params.category,
      isDataLoaded: false,
      filter: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.location = this.location.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props
      .fetchIP()
      .then(() => {
        this.setState({ isDataLoaded: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isDataLoaded: true });
      });

    if (this.location) {
      const { country, city } = this.props.meta;

      this.setState({
        searchedLocation: city + ", " + country,
      });
    }
  }

  componentDidMount() {
    this.fetchMeetups();
  }

  location() {
    const { country, city } = this.props.meta;
    return city && country ? city + ", " + country : "";
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchMeetups() {
    if (this.state.searchedLocation) {
      this.state.filter["location"] = this.state.searchedLocation
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();
    }
    if (this.state.category) {
      this.state.filter["category"] = this.state.category;
    }
    this.props.fetchMeetups({ filter: this.state.filter });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.fetchMeetups();
    }
  };

  render() {
    const { meetups } = this.props;

    const { searchedLocation, isDataLoaded, category } = this.state;

    return (
      <div>
        {isDataLoaded && (
          <div class="lookup-prebody">
            <HeroFind categoryName={this.props.match.params.category} />
            <div class="meetup-lookup-wrap">
              <div class="meetup-lookup centered">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <input
                        onKeyPress={this.handleKeyPress}
                        name="searchedLocation"
                        value={searchedLocation}
                        type="text"
                        class="input"
                        placeholder={searchedLocation}
                        onChange={this.handleChange}
                      />
                    </div>
                    {searchedLocation && meetups && meetups.length > 0 && (
                      <div class="level-item">
                        <span>Meetups in {meetups[0].location}</span>
                      </div>
                    )}
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <button class="button is-medium m-r-sm">Meetups</button>
                      <button class="button is-medium">Calendar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isDataLoaded && searchedLocation && (
          <div class="container">
            <section class="section page-find">
              <div class="columns cover is-multiline">
                {meetups.map((meetup) => (
                  <div
                    key={meetup._id}
                    class="column is-one-third"
                    style={{ minHeight: "160px" }}
                  >
                    <Link
                      to={"/meetups/" + meetup._id}
                      class="meetup-card-find"
                      href="#"
                      style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${meetup.image})`,
                      }}
                    >
                      <div class="meetup-card-find-content">
                        <div class="meetup-card-find-content-date is-pulled-right">
                          <span class="month">
                            {moment(meetup.startDate).format("MMM")}
                          </span>
                          <span class="day">
                            {moment(meetup.startDate).format("D")}
                          </span>
                        </div>
                        <div class="meetup-card-find-content-info">
                          <p class="title is-4 no-padding is-marginless m-b-xs">
                            {meetup.title}
                          </p>
                          <span
                            class="tag  m-b-xs"
                            style={{
                              backgroundColor: "#00a2c7",
                              color: "white",
                            }}
                          >
                            {meetup.category.name}
                          </span>
                          <p class="subtitle is-7">{meetup.location}</p>
                        </div>
                        <div class="meetup-card-find-interest">
                          <p class="subtitle is-7">
                            {meetup.joinedPeopleCount}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {meetups.length === 0 && (
                <div>
                  <span class="button is-warning ">
                    No meetups found in {searchedLocation}{" "}
                    {category && (
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        for {category} category
                      </span>
                    )}
                    . You might try to change your search criteria.
                  </span>
                </div>
              )}
            </section>
          </div>
        )}

        {!isDataLoaded && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

MeetupFind.propTypes = {
  fetchMeetups: PropTypes.func.isRequired,
  fetchIP: PropTypes.func.isRequired,
  meetups: PropTypes.array.isRequired,
  meta: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    meetups: state.meetups.meetups,
    meta: state.meta.meta,
  };
};

export default connect(mapStateToProps, { fetchMeetups, fetchIP })(MeetupFind);
