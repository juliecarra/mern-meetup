import React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

const MeetupItem = ({ meetup }) => {
  const {
    _id,
    startDate,
    title,
    location,
    description,
    joinedPeopleCount,
  } = meetup;
  return (
    <div class="max-w-sm w-full  lg:flex MeetupItem">
      <div
        class="border-r border-b border-l  lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        style={{
          width: "inherit",
          borderRadius: "5px",
          borderLeft: "1px solid #e2e8f0",
          boxShadow:
            "0 0 2px 0 rgba(46,62,72,.12), 0 2px 4px 0 rgba(46,62,72,.12)",
        }}
      >
        <Link to={"/meetups/" + _id}>
          <div class="mb-8">
            <div class="text-sm text-gray-600 flex items-center">
              <i class="fas fa-map-marker-alt"></i>
              <p style={{ marginLeft: "5px" }}>{location}</p>
            </div>
            <div class="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p class="text-black text-base" style={{ fontWeight: 400 }}>
              {description}
            </p>
          </div>
        </Link>
        <div class="flex items-center">
          <div class="text-sm">
            <p class="text-gray-600 leading-none" style={{ fontWeight: 400 }}>
              {joinedPeopleCount} attendees
            </p>
            <p class="text-teal">
              {moment(startDate).format("dddd, MMMM Do YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupItem;
