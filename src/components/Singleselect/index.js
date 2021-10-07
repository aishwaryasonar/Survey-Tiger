import React, { useState } from "react";
import "./style.css";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Button,
} from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../Store/surveySlice";

function Index() {
	const history = useHistory();
	const dispatch = useDispatch();
	//NOTE useParams returns an obj like {surveyID : "1"}
	//we only need the "1". So, we put destruct the object and store it in surveyId
	const { surveyId } = useParams();
	const [options, setOptions] = useState(["", ""]);
	const [question, setQuestion] = useState("");

	const setOptFunc = (value, optIdx) => {
		options[optIdx] = value;
		setOptions([...options]);
	};
	const btnDisable = () =>
		question.trim() === "" ||
		options.find((opt) => opt.trim() === "") !== undefined;

	//SECTION Adding questions to the global store
	const addQuestion = () => {
		const payload = {
			surveyId,
			question,
			options,
			type: "single",
		};
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push(surveyId + "?create=true");
	};
	const clickPublish = () => {
		const payload = {
			surveyId,
			question,
			options,
			type: "single",
		};
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push("/confirm/" + surveyId);
	};

	return (
		<div>
			<div className="singleQ">
				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<InputGroupText>?</InputGroupText>
					</InputGroupAddon>
					<Input
						placeholder="Enter your question"
						onChange={(e) => setQuestion(e.target.value)}
						value={question}
					/>
				</InputGroup>
				<p className="opt">Options</p>
				<Input
					className="options"
					placeholder="Option 1"
					value={options[0]}
					onChange={(e) => setOptFunc(e.target.value, 0)}
				/>
				<Input
					className="options"
					placeholder="Option 2"
					value={options[1]}
					onChange={(e) => setOptFunc(e.target.value, 1)}
				/>
				<div className="btns">
					<Button
						className="actionbtn"
						onClick={addQuestion}
						disabled={btnDisable()}
					>
						Add Question
					</Button>
					<Button
						onClick={clickPublish}
						className="actionbtn"
						disabled={btnDisable()}
					>
						Publish
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Index;
