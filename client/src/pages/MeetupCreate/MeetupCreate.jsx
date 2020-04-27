import React, { Component } from "react";
import MeetupCreateWizard from "../../components/Meetups/MeetupCreateWizard";

class MeetupCreate extends Component {
  render() {
    return (
      <div class="meetup-create-page" style={{ minHeight: "100vh" }}>
        <section class="section">
          <div class="container">
            <MeetupCreateWizard />
          </div>
        </section>
      </div>
    );
  }
}

export default MeetupCreate;
