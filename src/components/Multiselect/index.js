import React, { useState } from "react";
import "./style.css";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Button,
} from "reactstrap";
import { surveySlice } from "../Store/surveySlice";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function Index() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { surveyId } = useParams();

	const [options, setOptions] = useState([""]);
	const [question, setQuestion] = useState("");
	const addOption = (optIdx) => {
		// console.log("add ", optIdx);
		if (options.length < 4) {
			options.splice(optIdx + 1, 0, "");
			setOptions([...options]);
		}
	};
	const removeOption = (optIdx) => {
		// console.log("remove ", optIdx);
		if (options.length > 1) {
			options.splice(optIdx, 1);
			setOptions([...options]);
		}
	};
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
			type: "multiple",
		};
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push(surveyId + "?create=true");
	};
	const clickPublish = () => {
		const payload = {
			surveyId,
			question,
			options,
			type: "multi",
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
				{options.map((option, optIdx) => (
					<InputGroup className="options" key={optIdx}>
						<Input
							placeholder={`option ${optIdx + 1}`}
							value={option}
							onChange={(e) => setOptFunc(e.target.value, optIdx)}
						/>
						<InputGroupAddon addonType="append">
							<Button
								className="addRemove"
								onClick={() => addOption(optIdx)}
								disabled={options.length === 4}
							>
								+
							</Button>
							<Button
								className="addRemove"
								onClick={() => removeOption(optIdx)}
								disabled={options.length === 1}
							>
								-
							</Button>
						</InputGroupAddon>
					</InputGroup>
				))}
				{options.length === 4 ? (
					<div className="btns">
						<Button
							onClick={addQuestion}
							className="actionbtn"
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
				) : null}
			</div>
		</div>
	);
}

export default Index;
