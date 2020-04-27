import axios from "axios";
import { applyFilters } from "../helpers/";

import {
  FETCH_CATEGORIES,
  FETCH_MEETUPS,
  FETCH_MEETUP,
  FETCH_THREADS,
  FETCH_THREAD,
  FETCH_POSTS,
  SET_CURRENT_USER,
  FETCH_STATS,
  FETCH_IP,
} from "./types";

//categories actions
export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");
    // debugger;
    dispatch({ type: FETCH_CATEGORIES, payload: res.data });
  } catch (error) {
    console.log(error.response.data);
  }
};

//meetups actions
export const fetchMeetups = (options = {}) => async (dispatch) => {
  try {
    const url = applyFilters("/api/meetups", options.filter);

    const res = await axios.get(url);

    dispatch({ type: FETCH_MEETUPS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMeetup = (meetupId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/meetups/${meetupId}`);
    // debugger;
    dispatch({ type: FETCH_MEETUP, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createMeetup = (meetup, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/meetups", meetup);
    history.push("/");

    dispatch({ payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const joinMeetup = (meetupId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/meetups/${meetupId}/join`, meetupId);

    // debugger;
    dispatch({ payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const leaveMeetup = (meetupId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/meetups/${meetupId}/leave`, meetupId);

    // debugger;
    dispatch({ type: FETCH_MEETUP, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//threads actions
export const fetchThreads = (meetupId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/threads?meetupId=${meetupId}`);
    // debugger;
    dispatch({ type: FETCH_THREADS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchThread = (threadId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/threads/${threadId}`);
    // debugger;
    dispatch({ type: FETCH_THREAD, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createThread = (thread) => async (dispatch) => {
  try {
    const res = await axios.post("/api/threads", thread);

    dispatch({ payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//auth actions
export const signup = (userData, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/signup", userData);

    history.push("/login");
  } catch (error) {
    console.log(error.response.data);
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", userData);

    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post("/api/users/logout");

    dispatch(setCurrentUser({}));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

//posts action
export const fetchPosts = (threadId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts?threadId=${threadId}`);
    // debugger;
    dispatch({ type: FETCH_POSTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", post);

    dispatch({ payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//stats action
export const fetchStats = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/me/activity");
    // debugger;
    dispatch({ type: FETCH_STATS, payload: res.data });
  } catch (error) {
    console.log(error.response.data);
  }
};

//metas action
export const fetchIP = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/ip");
    // debugger;
    dispatch({ type: FETCH_IP, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//profile actions
export const fetchMe = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/me");
    // debugger;
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
