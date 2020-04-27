import React, { Component } from "react";

import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchStats, fetchMe } from "../../actions/";

class UserUpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      redirect: false,
      user: { ...this.props.authUser },
      name: this.props.authUser.name,
      username: this.props.authUser.username,
      avatar: this.props.authUser.avatar,
      infos: this.props.authUser.infos,
    };
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleModal = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  updateUser = async () => {
    const { user, name, username, avatar, infos } = this.state;
    try {
      const userData = {
        name,
        username,
        avatar,
        infos,
      };

      await axios.patch(`/api/users/${user._id}`, userData);

      this.setState({ isOpen: false });

      try {
        await this.props.fetchMe();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isOpen, name, username, avatar, infos } = this.state;

    return (
      <div>
        <button
          style={{
            borderColor: "rgb(255, 17, 84)",
            color: "rgb(255, 17, 84)",
          }}
          onClick={this.handleModal}
          class="button  is-outlined m-t-sm"
        >
          Update Infos
        </button>
        {isOpen && (
          <div class="['modal']">
            <div
              class="modal-background"
              style={{ width: "1366px", marginLeft: "-107px" }}
            ></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title" style={{ color: "#212121" }}>
                  User Profile
                </p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={this.closeModal}
                ></button>
              </header>
              <section class="modal-card-body">
                <form>
                  <div class="field">
                    <label class="title" style={{ color: "#212121" }}>
                      Name
                    </label>
                    <input
                      name="name"
                      class="input"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="field">
                    <label class="title" style={{ color: "#212121" }}>
                      Username
                    </label>
                    <input
                      name="username"
                      class="input"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="field">
                    <label class="title" style={{ color: "#212121" }}>
                      Avatar
                    </label>
                    <input
                      name="avatar"
                      class="input"
                      value={avatar}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="field">
                    <label class="title" style={{ color: "#212121" }}>
                      Infos
                    </label>
                    <input
                      class="input"
                      name="infos"
                      value={infos}
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
              </section>
              <footer class="modal-card-foot">
                <button
                  class="button is-success"
                  onClick={this.updateUser}
                  style={{
                    backgroundColor: "#00a2c7",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Save changes
                </button>
                <button
                  class="button"
                  onClick={this.closeModal}
                  style={{
                    backgroundColor: "#ff1154",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserUpdateModal.propTypes = {
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

export default connect(mapStateToProps, { fetchStats, fetchMe })(
  UserUpdateModal
);
