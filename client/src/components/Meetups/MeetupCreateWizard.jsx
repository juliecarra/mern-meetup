import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { createMeetup, fetchCategories, fetchIP } from "../../actions/";

class MeetupCreateWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      totalSteps: 4,
      changeLocation: false,
      location: "",
      title: "",
      startDate: new Date(),
      category: "",
      image: "",
      shortInfo: "",
      description: "",
      timeTo: "",
      timeFrom: "",
      redirect: false,
    };
    this.moveToNextStep = this.moveToNextStep.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchIP();

    if (this.location) {
      const { country, city } = this.props.meta;

      this.setState({ location: city + ", " + country });
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  moveToNextStep = () => {
    this.setState((prevState) => {
      return {
        currentStep: prevState.currentStep + 1,
      };
    });
  };

  moveToPreviousStep = () => {
    this.setState((prevState) => {
      return {
        currentStep: prevState.currentStep - 1,
      };
    });
  };

  progressBar = () => {
    return (100 / this.state.totalSteps) * this.state.currentStep;
  };

  handleStartDate = (date) => {
    this.setState({ startDate: date });
  };

  handleTimeFrom = (value) => {
    const format = "h:mm";
    this.setState({ timeFrom: value && value.format(format) });
  };

  handleTimeTo = (value) => {
    const format = "h:mm";
    this.setState({ timeTo: value && value.format(format) });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        location,
        title,
        startDate,
        category,
        image,
        shortInfo,
        description,
        timeTo,
        timeFrom,
      } = this.state;

      const meetupData = {
        location,
        title,
        startDate,
        category,
        image,
        shortInfo,
        description,
        timeTo,
        timeFrom,
        meetupCreator: this.props.auth.user,
        processedLocation: location
          .toLowerCase()
          .replace(/[\s,]+/g, "")
          .trim(),
      };
      await this.props.createMeetup(meetupData, this.props.history);
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  location = () => {
    const { country, city } = this.props.meta;
    return city && country ? city + ", " + country : "";
  };

  toggleLocation = () => {
    this.setState({ changeLocation: !this.state.changeLocation });
  };

  render() {
    const { currentStep, totalSteps, redirect } = this.state;
    const { categories } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div class="meetup-create-form">
        <progress
          class="progress is-primary"
          value={this.progressBar()}
          max="100"
        >
          {this.progressBar()}
        </progress>
        <div
          class="current-step"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            color: "#9b9b9b",
          }}
        >
          STEP {currentStep} OF {totalSteps}
        </div>
        <br />

        <MeetupLocation
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          location={this.state.location}
          ipLocation={this.location()}
          changeLocation={this.state.changeLocation}
          toggleLocation={this.toggleLocation}
          onClick={this.moveToNextStep}
        />
        <MeetupCreateDetail
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          title={this.state.title}
          startDate={this.state.startDate}
          timeFrom={this.state.timeFrom}
          timeTo={this.state.timeTo}
          onClick={this.moveToNextStep}
          handleStartDate={this.handleStartDate}
          handleTimeFrom={this.handleTimeFrom}
          handleTimeTo={this.handleTimeTo}
          category={this.state.category}
          categories={categories}
        />
        <MeetupDescription
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          image={this.state.image}
          shortInfo={this.state.shortInfo}
          description={this.state.description}
        />
        <MeetupConfirmation
          currentStep={this.state.currentStep}
          location={this.state.location}
          title={this.state.title}
          startDate={this.state.startDate}
          timeFrom={this.state.timeFrom}
          timeTo={this.state.timeTo}
          category={this.state.category}
          image={this.state.image}
          shortInfo={this.state.shortInfo}
          description={this.state.description}
          onClick={this.moveToPreviousStep}
        />

        <div
          class="controll-btns m-b-md"
          style={{
            marginTop: "-40px",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {currentStep !== 1 && (
            <button
              style={{
                backgroundColor: "#00a2c7",
                color: "#fff",
                fontWeight: 600,
              }}
              class="button  m-r-sm"
              onClick={this.moveToPreviousStep}
            >
              Back
            </button>
          )}

          {currentStep === 3 && (
            <button
              style={{
                backgroundColor: "#00a2c7",
                color: "#fff",
                fontWeight: 600,
              }}
              class="button  m-r-sm"
              onClick={this.moveToNextStep}
              disabled={
                !this.state.image ||
                !this.state.shortInfo ||
                !this.state.description
              }
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              style={{
                backgroundColor: "#00a2c7",
                color: "#fff",
                fontWeight: 600,
              }}
              class="button "
              onClick={this.onSubmit}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    );
  }
}

function MeetupLocation(props) {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div>
      <h1 class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
        First, set your group’s location.
      </h1>
      <p style={{ fontWeight: 400, color: "black" }}>
        Meetup groups meet locally and in person. We’ll connect you with people
        who live in and around your area.
      </p>
      <br />
      <div class="m-b-lg">
        {props.ipLocation && !props.changeLocation && (
          <span
            class="subtitle"
            style={{ fontWeight: 400, color: "black", fontSize: "30px" }}
          >
            {props.ipLocation}
          </span>
        )}

        {props.ipLocation && !props.changeLocation && (
          <a onClick={props.toggleLocation}>(Change location)</a>
        )}
        {props.ipLocation && props.changeLocation && (
          <a onClick={props.toggleLocation}>(Set default location)</a>
        )}
        <br />
        <br />
        {!props.ipLocation ||
          (props.changeLocation && (
            <input
              name="location"
              value={props.location}
              type="text"
              class="input"
              onChange={props.handleChange}
            />
          ))}

        {props.currentStep === 1 && (
          <div
            className="container-button"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: "10px",
            }}
          >
            <button
              class="button"
              style={{
                backgroundColor: "#00a2c7",
                color: "#fff",
                fontWeight: 600,
              }}
              disabled={!props.ipLocation || !props.location}
              onClick={props.onClick}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MeetupCreateDetail(props) {
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <form>
      <div class="field">
        <label class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
          What will your group’s name be?
        </label>
        <br />
        <br />
        <p style={{ fontWeight: 400, color: "black" }}>
          Choose a name that will give people a clear idea of what the group is
          about. Feel free to get creative!
        </p>
        <br />
        <input
          name="title"
          value={props.title}
          class="input"
          type="text"
          placeholder="Enter Title"
          onChange={props.handleChange}
        />
      </div>
      <div class="field">
        <br />
        <label class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
          Start Date
        </label>
        <br />
        <br />
        <DatePicker
          className="input"
          value={moment(props.startDate).format("dddd, MMMM Do YYYY")}
          onChange={props.handleStartDate}
          minDate={new Date()}
          showDisabledMonthNavigation
        />
      </div>
      <div class="field">
        <br />
        <label class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
          From
        </label>
        <br />
        <br />
        <TimePicker showSecond={false} onChange={props.handleTimeFrom} />
      </div>
      <div class="field">
        <br />
        <label class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
          To
        </label>
        <br />
        <br />
        <TimePicker showSecond={false} onChange={props.handleTimeTo} />
      </div>
      <div class="field">
        <br />
        <label class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
          Choose a category that describe your group's interests.
        </label>
        <br />
        <br />
        <p style={{ fontWeight: 400, color: "black" }}>
          {" "}
          Be specific! This will help us promote your group to the right people.
          You can choose up to 8 topics.
        </p>
        <br />
        <div class="m-b-lg">
          <div class="select">
            <select name="category" onChange={props.handleChange}>
              {props.categories.map((category) => (
                <option name="category" value={category._id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {props.currentStep === 2 && (
        <div
          className="container-button"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <button
            style={{
              backgroundColor: "#00a2c7",
              color: "#fff",
              fontWeight: 600,
            }}
            class="button "
            disabled={
              !props.title ||
              !props.startDate ||
              !props.timeFrom ||
              !props.timeTo
            }
            onClick={props.onClick}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
}

function MeetupDescription(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <form class="m-b-md">
      <div class="field">
        <br />
        <label class="title" style={{ color: "black", fontWeight: 900 }}>
          Image
        </label>
        <br />
        <br />
        <input
          name="image"
          value={props.image}
          class="input"
          type="text"
          placeholder="Image URL"
          onChange={props.handleChange}
        />
      </div>
      <div class="field">
        <br />
        <label class="title" style={{ color: "black", fontWeight: 900 }}>
          Now describe what your group will be about
        </label>
        <br />
        <br />
        <p style={{ fontWeight: 400, color: "black" }}>
          People will see this when we promote your group.
        </p>
        <br />

        <textarea
          name="shortInfo"
          value={props.shortInfo}
          class="textarea"
          placeholder="Write Short Info"
          rows="3"
          onChange={props.handleChange}
        ></textarea>
      </div>
      <div class="field">
        <br />
        <label class="title" style={{ color: "black", fontWeight: 900 }}>
          Long Description
        </label>
        <br />
        <br />
        <textarea
          name="description"
          value={props.description}
          class="textarea"
          placeholder="Write description"
          onChange={props.handleChange}
        ></textarea>
        <br />
      </div>
      <br />
    </form>
  );
}

function MeetupConfirmation(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <div>
      <h1 class="title m-b-sm" style={{ color: "black", fontWeight: 900 }}>
        Almost done! Just take a minute to review your data.
      </h1>

      <div class="content">
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Location
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.location}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Title
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.title}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Start Date
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>
            {moment(props.startDate).format("dddd, MMMM Do YYYY")}
          </p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            From
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.timeFrom}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            To
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.timeTo}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Category
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.category}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Image
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.image}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Short Info
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>{props.shortInfo}</p>
        </div>
        <div>
          <span
            class="result-title"
            style={{ color: "black", fontWeight: 900 }}
          >
            Description
          </span>
          <p style={{ color: "#212121", fontWeight: 400 }}>
            {props.description}
          </p>
        </div>
        <button
          style={{
            backgroundColor: "#00a2c7",
            color: "#fff",
            fontWeight: 600,
            marginTop: "50px",
          }}
          class="button  m-r-sm"
          onClick={props.onClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}

MeetupCreateWizard.propTypes = {
  createMeetup: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchIP: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  meta: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categories: state.categories.categories,
    meta: state.meta.meta,
  };
};

export default connect(mapStateToProps, {
  createMeetup,
  fetchCategories,
  fetchIP,
})(MeetupCreateWizard);
