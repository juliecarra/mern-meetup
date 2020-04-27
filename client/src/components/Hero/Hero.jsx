import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../styles/hero/_hero.scss";

class Hero extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <section className="hero is-primary is-medium">
          <div className="hero-bg">
            <div className="hero-body">
              <div
                className="container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1
                  className="title"
                  style={{
                    fontSize: "42px",
                    fontWeight: "bold",
                    fontFamily:
                      "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  The real world is calling
                </h1>

                <h2
                  className="subtitle"
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    marginTop: "0px",
                    fontFamily:
                      "Graphik Meetup,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  Join a local group to meet people, try something new, or do
                  more of what you love.
                </h2>

                {!isAuthenticated && (
                  <Link
                    to="/signup"
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      backgroundColor: "#f13a59",
                      color: "#fff",
                      width: "317.8px",
                      height: "49px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    Join Meetup
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Hero.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Hero);
