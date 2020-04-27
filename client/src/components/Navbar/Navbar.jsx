import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleSubmit = async () => {
    try {
      this.props.logout(this.props.history);
    } catch (error) {
      console.log(error);
    }
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
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isOpen } = this.state;
    return (
      <nav class="flex items-center justify-between flex-wrap bg-white-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <img
              src="https://secure.meetupstatic.com/s/img/286374644891845767035/logo/meetup-logo-script-1200x630.png"
              width="123.2px"
              height="44px"
              alt="meetup"
            />
          </Link>
        </div>
        <div class="block lg:hidden"></div>
        {!isAuthenticated ? (
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto naviflex">
            <div class="text-sm lg:flex-grow"></div>

            <div>
              <Link
                to="/meetup/create"
                class="inline-block text-sm px-4 py-2 leading-none   hover:border-transparent  hover:bg-white  mt-4 lg:mt-0 a-none"
                style={{
                  color: "#00a2c7",
                  fontWeight: 600,
                  borderRight: "1px solid #E5E7E9",
                }}
              >
                Start a new group
              </Link>
            </div>

            <div>
              <Link
                to="/login"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0 nav-link"
              >
                Log in
              </Link>
            </div>
            <div>
              <Link
                to="/signup"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0 nav-link"
              >
                Sign up
              </Link>
            </div>
          </div>
        ) : (
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto naviflex">
            <div class="text-sm lg:flex-grow"></div>
            <div>
              <Link
                to="/meetup/create"
                class="inline-block text-sm px-4 py-2 leading-none   hover:border-transparent  hover:bg-white mt-4 lg:mt-0 "
                style={{
                  color: "#00a2c7",
                  fontWeight: 600,
                  borderRight: "1px solid #E5E7E9",
                }}
              >
                Start a new group
              </Link>
            </div>

            <div>
              <Link
                to="/me"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0 nav-link"
              >
                Profile
              </Link>
            </div>
            <div>
              <Link
                to=""
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0 nav-link"
                onClick={this.handleSubmit.bind(this)}
              >
                <i class="fas fa-sign-out-alt"></i>
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
