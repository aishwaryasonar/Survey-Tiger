import { Button } from "reactstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { surveySlice } from "./Store/surveySlice";
import { CustomInput, Form, FormGroup, Label } from "reactstrap";

function ConfirmSurvey() {
	const { surveyId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const survey = useSelector((globalStore) =>
		globalStore.surveys.find((s) => s.surveyId === surveyId)
	);
	const confirmPublished = () => {
		dispatch(surveySlice.actions.markPublished({ surveyId }));
		history.push("/");
	};
	return (
		<Form className="confirmForm">
			{survey.questions.map((q) => {
				return (
					<FormGroup className="confirmFormGroup" key={q.qId}>
						{q.type === "single" ? (
							<>
								<Label>{q.question}</Label>
								<div>
									<CustomInput
										id={`exampleCustomRadio${q.qId}`}
										name={`customRadio${q.qId}`}
										type="radio"
										label={q.options[0]}
									/>
									<CustomInput
										id={`exampleCustomRadio2${q.qId}`}
										name={`customRadio${q.qId}`}
										type="radio"
										label={q.options[1]}
									/>
								</div>
							</>
						) : (
							<>
								<Label>{q.question}</Label>
								<div>
									<CustomInput
										id={`exampleCustomCheckbox1${q.qId}`}
										type="checkbox"
										label={q.options[0]}
									/>
									<CustomInput
										id={`exampleCustomCheckbox2${q.qId}`}
										type="checkbox"
										label={q.options[1]}
									/>
									<CustomInput
										id={`exampleCustomCheckbox3${q.qId}`}
										type="checkbox"
										label={q.options[2]}
									/>
									<CustomInput
										id={`exampleCustomCheckbox4${q.qId}`}
										type="checkbox"
										label={q.options[3]}
									/>
								</div>
							</>
						)}
					</FormGroup>
				);
			})}
			<Button className="confirmBtn" onClick={confirmPublished}>
				Confirm
			</Button>
		</Form>
	);
}

export default ConfirmSurvey;
