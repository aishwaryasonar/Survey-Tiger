import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//SECTION REDUX-THUNK
export const createSurvey = createAsyncThunk(
	"surveys/createSurvey", //NOTE action type string -> can give any unique name
	async (_, thunkAPI) => {
		//NOTE thunkAPI.getState() gives the state of the global store
		const newSurveyId = String(thunkAPI.getState().surveys.length + 1);
		return newSurveyId;
	}
);
export const surveySlice = createSlice({
	name: "surveys",
	initialState: [],
	reducers: {
		//NOTE if thunk wasnt used, we would've declared the reducer here. All reducers under thunk should be inside extraReducers.
		// createSurvey: (state, action) => {
		// 	state.push({ surveyId: action.payload });
		// 	return state;

		//NOTE add question reducer
		addQuestion: (state, action) => {
			//Destructuring
			const { surveyId, question, options, type } = action.payload;
			//finding the object in STATE with surveyId = payload-surveyID
			//then using .questions to point it to the questions array in that object
			const q = state.find((s) => s.surveyId === surveyId).questions;
			const qId = String(q.length + 1);
			//then pushing the new question (with other properties) into that questions array inside state
			q.push({ qId, type, question, options });
		},
		markPublished: (state, action) => {
			const { surveyId } = action.payload;
			state.find((s) => s.surveyId === surveyId).isPublished = true;
		},
	},
	extraReducers: {
		[createSurvey.fulfilled]: (state, action) => {
			state.push({
				surveyId: action.payload,
				questions: [],
				isPublished: false,
			});
		},
	},
});
