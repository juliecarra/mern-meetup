import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

import { signup } from "../../actions";

import "../../styles/login/_login.scss";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
      };

      this.props.signup(newUser, this.props.history);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      username,
      name,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    return (
      <section class="hero is-success is-fullheight">
        <div class="hero-body" style={{ backgroundColor: "white" }}>
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <h3
                class="title has-text-black"
                style={{
                  color: "#212121",
                  fontSize: "34px",
                  fontWeight: "bolder",
                }}
              >
                Sign up
              </h3>

              <p class="subtitle has-text-black" style={{ color: "#212121" }}>
                Please sign up to proceed.
              </p>
              <div class="box">
                <figure class="avatar">
                  <img
                    src="https://placehold.it/128x128"
                    style={{ display: "initial" }}
                  />
                </figure>
                <form>
                  <div class="field">
                    <div class="control">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder="Your Username"
                        autofocus=""
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder="Your Name"
                        autofocus=""
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input
                        class="input is-large"
                        type="email"
                        placeholder="Your Email"
                        autofocus=""
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input
                        class="input is-large"
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input
                        class="input is-large"
                        type="password"
                        placeholder="Confirm Your Password"
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#ff1154",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                    class="button is-block is-info is-large is-fullwidth"
                    onClick={this.handleSubmit}
                  >
                    Sign up <i class="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>

              <p style={{ color: "#212121", fontWeight: 400 }}>
                Already a member?{" "}
                <Link
                  to="/login"
                  style={{ color: "#ff1154", fontWeight: "bold" }}
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(withRouter(Signup));
