import { combineReducers } from "redux";

import { categories } from "./categories";
import { meetups, meetup } from "./meetups";
import { threads, thread } from "./threads";
import { auth } from "./auth";
import { posts } from "./posts";
import { stats } from "./stats";
import { meta } from "./meta";

export default combineReducers({
  categories,
  meetups,
  meetup,
  threads,
  thread,
  posts,
  stats,
  auth,
  meta,
});
