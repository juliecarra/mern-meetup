import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions";

import "../../styles/login/_login.scss";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

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
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };

      const res = this.props.login(userData);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <section class="hero is-success is-fullheight">
        <div class="hero-body" style={{ backgroundColor: "white" }}>
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <h3 class="title has-text-black">Log in</h3>

              <p class="subtitle has-text-black" style={{ color: "#212121" }}>
                Please log in to proceed.
              </p>
              <div class="box">
                <figure class="avatar">
                  <img
                    style={{ display: "initial" }}
                    src="https://placehold.it/128x128"
                  />
                </figure>
                <form>
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
                  <button
                    style={{
                      backgroundColor: "#ff1154",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                    class="button is-block is-info is-large is-fullwidth"
                    onClick={this.handleSubmit}
                  >
                    Log in <i class="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
              <p style={{ color: "#212121", fontWeight: 400 }}>
                Not registered with us yet?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#ff1154", fontWeight: "bold" }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { login })(Login);
