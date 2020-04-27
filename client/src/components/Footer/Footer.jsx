import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer/_footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="inner-footer">
        <div className="footer-items">
          <h3 className="footer-h3">Your Account</h3>
          <div className="border1"></div>

          <ul>
            <Link to="/signup">
              <li>Sign up</li>
            </Link>
            <Link to="/login">
              <li>Log in</li>
            </Link>
            <a href="#">
              <li>Help</li>
            </a>
          </ul>
        </div>

        <div className="footer-items">
          <h3 className="footer-h3">Discover</h3>
          <div className="border1"></div>

          <ul>
            <a href="#">
              <li>Groups</li>
            </a>
            <a href="#">
              <li>Calendar</li>
            </a>
            <a href="#">
              <li>Topics</li>
            </a>
            <a href="#">
              <li>Cities</li>
            </a>
          </ul>
        </div>

        <div className="footer-items">
          <h3 className="footer-h3">Meetup</h3>
          <div className="border1"></div>
          <ul>
            <a href="#">
              <li>About</li>
            </a>
            <a href="#">
              <li>Meetup Pro</li>
            </a>
            <a href="#">
              <li>Careers</li>
            </a>
            <a href="#">
              <li>Apps</li>
            </a>
            <a href="#">
              <li>Blogs</li>
            </a>
            <a href="#">
              <li>Accessibility</li>
            </a>
          </ul>

          <div className="social-media">
            <h3 className="footer-h3">Follow Us</h3>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">Copyright &copy; 2020 Meetup LLC.</div>
    </div>
  );
};

export default Footer;
