import "./App.css";
import { Switch, Link, Route, useHistory } from "react-router-dom";
import Create from "./components/Create";
import TakeSurvey from "./components/TakeSurvey";
import logo from "./surveytiger.png";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { createSurvey } from "./components/Store/surveySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmSurvey from "./components/confirmSurvey";

function App() {
	const dispatch = useDispatch();
	const history = useHistory();
	const newSurvey = () => {
		// console.log("Action", surveySlice.actions.createSurvey("payload"));
		// const newsurveyId = Math.floor(Math.random() * 100);
		// dispatch(surveySlice.actions.createSurvey(newsurveyId));
		// history.push("/create/" + newsurveyId);

		//SECTION dispatching thunk
		dispatch(createSurvey())
			.then(unwrapResult)
			.then((newSurveyID) => history.push("/create/" + newSurveyID));
	};
	return (
		<div className="App">
			<div className="header">
				<img src={logo} alt="" />
			</div>
			<Switch>
				<Route path="/create/:surveyId">
					<Create />
				</Route>
				<Route path="/confirm/:surveyId">
					<ConfirmSurvey />
				</Route>
				<Route path="/take">
					<TakeSurvey />
				</Route>
				<Route path="/">
					<div className="body">
						{/* <Link to="/create"> */}
						<div>
							<Button className="btn" onClick={newSurvey}>
								Create Survey
							</Button>
						</div>

						{/* </Link> */}
						<Link to="take">
							<Button className="btn">Take Survey</Button>
						</Link>
					</div>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
