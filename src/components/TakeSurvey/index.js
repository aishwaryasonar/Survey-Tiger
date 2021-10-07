import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

function Index() {
	const surveyIDs = useSelector((globalStore) =>
		globalStore.surveys.filter((s) => s.isPublished).map((s) => s.surveyId)
	);
	//NOTE gives an array with surveyIDs inside it
	// console.log("surveyIDs", surveyIDs);
	return (
		<div className="take">
			{surveyIDs.map((surveyid) => (
				<Button
					className="btn2"
					key={surveyid}
				>{`Take Survey ${surveyid}`}</Button>
			))}
		</div>
	);
}

export default Index;
