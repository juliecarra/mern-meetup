import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPost, fetchPosts } from "../../actions";

class PostCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      newPost: [],
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = async (e) => {
    const { threadId } = this.props;

    e.preventDefault();

    try {
      const { text } = this.state;

      const postData = {
        text,
        thread: threadId,
      };

      await this.props.createPost(postData);
      this.setState({ text: "" });

      try {
        //  await this.props.fetchPosts(threadId);
        this.setState({ redirect: true });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { text, redirect } = this.state;

    if (redirect) {
      return <Redirect to={`/`} />;
    }

    return (
      <form className="post-create">
        <div className="field">
          <textarea
            className="textarea textarea-post"
            name="text"
            placeholder="Write a post"
            rows="1"
            value={text}
            onChange={this.handleChange}
          ></textarea>
          <button
            disabled={!text}
            className="button is-primary m-t-sm"
            onClick={this.createPost}
          >
            Send
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meetup: state.meetup.meetup,
    posts: state.posts.posts,
  };
};

export default connect(mapStateToProps, {
  createPost,
  fetchPosts,
})(PostCreate);
