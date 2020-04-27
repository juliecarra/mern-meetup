import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { createThread, fetchThreads } from "../../actions/";

class ThreadCreateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      title: "",
    };
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createThread = this.createThread.bind(this);
  }

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

  createThread = async (e) => {
    const { meetup } = this.props;
    e.preventDefault();
    try {
      const { title } = this.state;

      const threadData = {
        title,
        meetup: meetup._id,
      };

      await this.props.createThread(threadData);
      this.setState({ isOpen: false, title: "" });

      try {
        await this.props.fetchThreads(meetup._id);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { btnTitle, name } = this.props;
    const { isOpen, title } = this.state;

    return (
      <div>
        <button class="button is-success" onClick={this.handleModal}>
          {btnTitle}
        </button>

        {isOpen && (
          <div class="['modal', {'is-active': isOpen}]">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">{name}</p>

                <button
                  class="delete"
                  aria-label="close"
                  onClick={this.closeModal}
                ></button>
              </header>
              <section class="modal-card-body">
                <form>
                  <div class="field">
                    <label class="title">What would you like to ask?</label>

                    <textarea
                      value={title}
                      name="title"
                      class="textarea"
                      placeholder="Just write something that you are interested in"
                      rows="10"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                </form>
              </section>
              <footer class="modal-card-foot">
                <button
                  class="button is-success"
                  style={{
                    backgroundColor: "#00a2c7",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                  onClick={this.createThread}
                >
                  Save changes
                </button>

                <button
                  style={{
                    backgroundColor: "#ff1154",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                  class="button"
                  onClick={this.closeModal}
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

ThreadCreateModal.propTypes = {
  createThread: PropTypes.func.isRequired,
  meetup: PropTypes.object.isRequired,
  threads: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    threads: state.threads.threads,
    meetup: state.meetup.meetup,
  };
};

export default connect(mapStateToProps, { createThread, fetchThreads })(
  ThreadCreateModal
);
