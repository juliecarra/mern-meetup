import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchStats } from "../actions/";
import UserUpdateModal from "../components/User/UserUpdateModal";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "meetups",
    };
    this.handleActiveTab = this.handleActiveTab.bind(this);
    this.handleThreadsActiveTab = this.handleThreadsActiveTab.bind(this);
    this.handlePostsActiveTab = this.handlePostsActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.fetchStats();
  }

  handleActiveTab = () => {
    this.setState({ activeTab: "meetups" });
  };

  handleThreadsActiveTab = () => {
    this.setState({ activeTab: "threads" });
  };

  handlePostsActiveTab = () => {
    this.setState({ activeTab: "posts" });
  };

  render() {
    const { activeTab } = this.state;
    const { stats } = this.props;
    const { user } = this.props.auth;
    const { meetups, threads, posts } = this.props.stats;

    return (
      <div class="columns">
        <div class="container profile">
          <div class="section profile-heading">
            <div class="columns is-mobile is-multiline">
              <div class="column is-2">
                <figure class="image  header-icon user-profile-image">
                  <img class="is-rounded" src={user.avatar} />
                </figure>
              </div>
              <div class="column is-4-tablet is-10-mobile name">
                <div>
                  {user && (
                    <span class="title is-bold" style={{ color: "#212121" }}>
                      {user && user.name}
                    </span>
                  )}
                  <br />

                  <br />
                  <UserUpdateModal authUser={user} />
                  <br />
                </div>

                <p class="tagline">{user.infos}</p>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={this.handleActiveTab}
                class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
              >
                <p class="stat-val" style={{ color: "#212121" }}>
                  {stats.meetups && stats.meetups.count}
                </p>
                <p class="stat-key" style={{ color: "#212121" }}>
                  Meetups
                </p>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={this.handleThreadsActiveTab}
                class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
              >
                <p class="stat-val" style={{ color: "#212121" }}>
                  {stats.threads && stats.threads.count}
                </p>
                <p class="stat-key" style={{ color: "#212121" }}>
                  Threads
                </p>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={this.handlePostsActiveTab}
                class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
              >
                <p class="stat-val" style={{ color: "#212121" }}>
                  {stats.posts && stats.posts.count}
                </p>
                <p class="stat-key" style={{ color: "#212121" }}>
                  Posts
                </p>
              </div>
            </div>
          </div>

          {activeTab === "meetups" && (
            <div class="columns is-mobile is-multiline">
              {meetups &&
                meetups.data.map((meetup) => (
                  <div class="column is-3-tablet is-6-mobile" key={meetup._id}>
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-4by3">
                          <img src={meetup.image} />
                        </figure>
                      </div>
                      <div class="card-content">
                        <div class="media">
                          <div
                            class="media-content"
                            style={{ backgroundColor: "white" }}
                          >
                            <p
                              class="title is-4"
                              style={{ fontSize: "20px", color: "#212121" }}
                            >
                              {meetup.title}
                            </p>

                            <p class="subtitle is-6">
                              <span
                                class="tag subtitle"
                                style={{
                                  backgroundColor: "rgb(0, 162, 199)",
                                  color: "white",
                                }}
                              >
                                {meetup.category.name}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="content">
                          <p style={{ fontWeight: 400, color: "#212121" }}>
                            {meetup.shortInfo}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
            </div>
          )}

          {activeTab === "threads" && (
            <div class="columns is-mobile is-multiline">
              {threads &&
                threads.data.map((thread) => (
                  <div class="column is-3-tablet is-6-mobile" key={thread._id}>
                    <div class="card">
                      <div class="card-content">
                        <div class="media">
                          <div
                            class="media-content"
                            style={{ backgroundColor: "white" }}
                          >
                            <p
                              class="title is-4"
                              style={{ fontSize: "20px", color: "#212121" }}
                            >
                              {thread.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
            </div>
          )}

          {activeTab === "posts" && (
            <div class="columns is-mobile is-multiline">
              {posts &&
                posts.data.map((post) => (
                  <div class="column is-3-tablet is-6-mobile" key={post._id}>
                    <div class="card">
                      <div class="card-content">
                        <div class="media">
                          <div
                            class="media-content"
                            style={{ backgroundColor: "white" }}
                          >
                            <p
                              class="title is-4"
                              style={{
                                fontSize: "20px",
                                color: "#212121",
                              }}
                            >
                              {post.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    stats: state.stats.stats,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchStats })(Profile);
