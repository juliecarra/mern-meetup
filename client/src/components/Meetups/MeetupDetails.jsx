import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ThreadCreateModal from "../Threads/ThreadCreateModal";

import * as moment from "moment";
import { MapWithAMarker } from "../GoogleMap/GoogleMap";

import {
  fetchMeetup,
  fetchThreads,
  joinMeetup,
  leaveMeetup,
  createThread,
  createPost,
} from "../../actions";
import PostCreate from "../Posts/PostCreate";

class MeetupDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirection: false,
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const meetupId = this.props.match.params.id;

    this.props.fetchMeetup(meetupId);
    this.props.fetchThreads(meetupId);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isAuthenticated = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated === true) return true;
    else return false;
  };

  isOwner = () => {
    const { user } = this.props.auth;
    const { meetup } = this.props;
    if (!user) return false;
    else if (meetup.meetupCreator) return user._id === meetup.meetupCreator._id;
  };

  isMember = () => {
    const { user } = this.props.auth;
    const { meetup } = this.props;
    return user["joinedMeetups"] && user["joinedMeetups"].includes(meetup._id);
  };

  canJoin = () => {
    return !this.isOwner() && this.isAuthenticated() && !this.isMember();
  };

  joinMeetup = () => {
    const { user } = this.props.auth;
    const { meetup } = this.props;
    const meetupId = this.props.match.params.id;
    this.props
      .joinMeetup(meetupId)
      .then(() => {
        const userMeetups = [...user["joinedMeetups"], meetupId];
        user["joinedMeetups"] = userMeetups;

        const joinedPeople = [...meetup["joinedPeople"], user];
        meetup["joinedPeople"] = joinedPeople;

        return true;
      })
      .then(() => {
        return this.props.fetchMeetup(meetupId);
      })
      .catch((error) => console.log(error));
  };

  leaveMeetup = () => {
    const { user } = this.props.auth;
    const { meetup } = this.props;
    const meetupId = this.props.match.params.id;

    this.props
      .leaveMeetup(meetupId)
      .then(() => {
        const userMeetupsIds = [...user["joinedMeetups"]];
        const index = userMeetupsIds.findIndex(
          (userMeetupId) => userMeetupId === meetupId
        );
        userMeetupsIds.splice(index, 1);
        user["joinedMeetups"] = userMeetupsIds;

        const joinedPeople = [...meetup["joinedPeople"], user];
        meetup["joinedPeople"] = joinedPeople;
      })
      .then(() => {
        return this.props.fetchMeetup(meetupId);
      })
      .catch((error) => console.log(error));
  };

  sortedThread = () => {
    const { threads } = this.props;
    return threads.sort((thread, nextThread) => {
      return new Date(nextThread.createdAt) - new Date(thread.createdAt);
    });
  };

  canMakePost = () => {
    return this.isAuthenticated() && (this.isMember() || this.isOwner());
  };

  render() {
    const { meetup, threads } = this.props;
    const { user, isAuthenticated } = this.props.auth;

    return (
      <div className="meetup-detail-page">
        <section
          className="hero"
          style={{
            borderBottom: "1px solid rgb(229, 231, 233)",
            borderTop: "1px solid rgb(229, 231, 233)",
          }}
        >
          <div className="hero-body">
            <div className="container">
              <h2
                className="subtitle"
                style={{ color: "rgba(46,62,72,.6)", fontSize: "16px" }}
              >
                {moment(meetup.startDate).format("dddd, MMMM Do YYYY")}
              </h2>
              <h1 className="title" style={{ fontWeight: 900, color: "black" }}>
                {meetup.title}
              </h1>
              <article className="media v-center">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img
                      className="is-rounded"
                      src={meetup.meetupCreator && meetup.meetupCreator.avatar}
                    />
                  </p>
                </figure>

                <div className="medias-content">
                  <div className="content">
                    <p style={{ fontWeight: 400 }}>
                      Hosted by <br />
                      <strong>
                        {meetup.meetupCreator && meetup.meetupCreator.name}
                      </strong>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="is-pulled-right">
              {this.isMember() && (
                <button
                  className="button is-danger"
                  onClick={this.leaveMeetup}
                  style={{ fontWeight: 700 }}
                >
                  Leave Group
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: "#f6f7f8" }}>
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <aside
                  className="is-medium menu"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  <div className="meetup-side-box">
                    <div className="meetup-side-box-date m-b-sm">
                      <img src={meetup.image} alt="" />
                    </div>
                    <div className="meetup-side-box-date m-b-sm">
                      <p style={{ fontWeight: 400, marginLeft: "10px" }}>
                        <i class="far fa-calendar-alt"></i>{" "}
                        {moment(meetup.startDate).format("dddd, MMMM Do YYYY")}
                      </p>
                    </div>

                    <div
                      className="meetup-side-box-date m-b-sm"
                      style={{ marginLeft: "10px", marginTop: "10px" }}
                    >
                      <i class="far fa-clock"></i>{" "}
                      <span>{meetup.timeFrom}</span> -
                      <span>{meetup.timeTo}</span>
                    </div>
                    <div className="meetup-side-box-place m-b-sm">
                      <p
                        style={{
                          marginLeft: "10px",
                          marginTop: "10px",
                          fontWeight: 400,
                        }}
                      >
                        {" "}
                        <i class="fas fa-map-marker-alt"></i> {meetup.location}
                      </p>
                    </div>
                    <div
                      className="meetup-side-box-more-info"
                      style={{ marginLeft: "10px" }}
                    >
                      <p style={{ marginTop: "10px" }}></p>

                      <p style={{ fontWeight: 400 }}>
                        <i class="fas fa-info-circle"></i> {meetup.shortInfo}
                      </p>
                    </div>
                  </div>
                  <div className="meetup-side-box-map">
                    {/* <MapWithAMarker
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCUedWvtn21AhooPEll1tYtm6F3LZzufYc&libraries=geometry,drawing,places`}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `360px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      location={meetup.location}
                    /> */}
                  </div>

                  <p className="menu-label">Threads</p>
                  <ul>
                    {this.sortedThread() &&
                      threads.map((thread) => (
                        <li key={thread._id}>{thread.title}</li>
                      ))}
                  </ul>
                  <p className="menu-label">Who is Going</p>
                  <div className="columns is-multiline is-mobile">
                    {meetup.joinedPeople &&
                      meetup.joinedPeople.map((person) => (
                        <div className="column is-3" key={person._id}>
                          <figure className="image is-64x64">
                            <img
                              className="is-rounded"
                              src={person.avatar}
                              alt="Image"
                            />
                          </figure>
                        </div>
                      ))}
                  </div>
                </aside>
              </div>
              <div className="column is-7 is-offset-1">
                {/* {meetup.image && (
                  <img
                    src={meetup.image}
                    alt=""
                    style={{ width: "600px", height: "333.33px" }}
                  />
                )}
                <br /> */}
                <div className="content is-medium">
                  <h3
                    className="title is-3"
                    style={{
                      fontSize: "2rem",
                      color: "black",
                      fontWeight: 700,
                    }}
                  >
                    Details
                  </h3>

                  <p style={{ fontWeight: 400 }}>{meetup.description}</p>

                  {this.canJoin() && (
                    <button
                      className="button is-primary"
                      onClick={this.joinMeetup}
                    >
                      Join In
                    </button>
                  )}

                  {!this.isAuthenticated() && (
                    <button disabled={true} className="button is-warning">
                      You need to be authenticated in order to join this meetup
                    </button>
                  )}
                  {!isAuthenticated || !this.isMember() || this.isOwner() || (
                    <ThreadCreateModal
                      btnTitle={`Welcome ${user.username}, start a new thread`}
                      name="Create Thread"
                    />
                  )}
                </div>

                <div className="content is-medium">
                  {threads.length > 0 && (
                    <h3
                      className="title is-3"
                      style={{
                        fontSize: "2rem",
                        color: "black",
                        fontWeight: 700,
                      }}
                    >
                      Threads
                    </h3>
                  )}
                  {this.sortedThread() &&
                    threads.map((thread) => (
                      <div className="box" key={thread._id}>
                        <h4
                          id="const"
                          className="title is-3"
                          style={{
                            fontSize: "2rem",
                            color: "black",
                            fontWeight: 700,
                          }}
                        >
                          {thread.title}
                        </h4>

                        {this.canMakePost() && (
                          <PostCreate threadId={thread._id} />
                        )}

                        {thread.posts.map((post) => (
                          <article className="media post-item" key={post._id}>
                            <figure className="media-left is-rounded user-image">
                              <p className="image is-32x32">
                                <img
                                  className="is-rounded"
                                  src={post.user.avatar}
                                />
                              </p>
                            </figure>
                            <div className="media-content">
                              <div className="content is-medium">
                                <div className="post-content">
                                  <strong
                                    className="author"
                                    style={{ color: "black" }}
                                  >
                                    {post.user.name}
                                  </strong>{" "}
                                  <small className="post-time">
                                    {moment(post.updatedAt).fromNow()}
                                  </small>
                                  <br />
                                  <p
                                    className="post-content-message"
                                    style={{ fontWeight: 400 }}
                                  >
                                    {post.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MeetupDetails.propTypes = {
  fetchMeetup: PropTypes.func.isRequired,
  joinMeetup: PropTypes.func.isRequired,
  leaveMeetup: PropTypes.func.isRequired,
  createThread: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  meetup: PropTypes.object.isRequired,
  threads: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    meetup: state.meetup.meetup,
    threads: state.threads.threads,

    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  fetchMeetup,
  fetchThreads,

  joinMeetup,
  leaveMeetup,
  createThread,
  createPost,
})(MeetupDetails);
