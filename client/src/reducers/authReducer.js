import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_CURRENT_USER
} from "../actions/types";

import cloneDeep from "lodash/cloneDeep";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  let clone = cloneDeep(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      clone.isAuthenticated = !isEmpty(action.payload);
      clone.user = action.payload;
      return clone;
    case USER_LOADING:
      clone.loading = true;
      return clone;
    case UPDATE_CURRENT_USER:
      clone.user = action.payload;
      return clone;
    default:
      return clone;
  }
}