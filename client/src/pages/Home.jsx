import React, { Component } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import Meetups from "../components/Meetups/Meetups";

class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <div class="container">
          <Meetups />
        </div>
        <div class="container">
          <Categories />
        </div>
      </div>
    );
  }
}

export default Home;
