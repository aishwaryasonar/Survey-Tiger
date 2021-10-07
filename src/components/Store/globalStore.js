import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { surveySlice } from "./surveySlice";
// import { responseSlice } from "./responseSlice";

const rootReducer = combineReducers({
	surveys: surveySlice.reducer,
	// response: responseSlice.reducer,
});
export const store = configureStore({ reducer: rootReducer });
