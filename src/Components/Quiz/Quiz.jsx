import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
	// create state variables
	let [index, setIndex] = useState(0); // default value - index of Questions
	const [question, setQuestion] = useState(data[index]); // default value - index of data set
	const [lock, setLock] = useState(false); // assure click only one option
	const [score, setScore] = useState(0); // store the score
	const [result, setResult] = useState(false); // state the result

	// Display the correct answer
	const Option1 = useRef(null);
	const Option2 = useRef(null);
	const Option3 = useRef(null);
	const Option4 = useRef(null);

	const option_array = [Option1, Option2, Option3, Option4];
	const checkAns = (e, ans) => {
		if (lock === false) {
			if (question.ans == ans) {
				e.target.classList.add("Correct");
				setLock(true);
				setScore((prev) => prev + 1);
			} else {
				e.target.classList.add("Wrong");
				setLock(true);
				option_array[question.ans - 1].current.classList.add("Correct"); // Hypothesis
			}
		}
	};

	const next = () => {
		if (lock === true) {
			if (index === data.length - 1) {
				setResult(true);
				return 0;
			}
			setIndex(++index);
			setQuestion(data[index]);
			setLock(false);
			option_array.map((option) => {
				option.current.classList.remove("Wrong");
				option.current.classList.remove("Correct");
				return null;
			});
		}
	};

	const reset = () => {
		// reset all states
		setIndex(0);
		setQuestion(data[0]);
		setScore(0);
		setLock(false);
		setResult(false);
	};
	return (
		<div className="container">
			<h1>Quiz App</h1>
			<hr />
			{/* use ternary operator */}
			{result ? (
				<></>
			) : (
				<>
					<h2>
						{index + 1} . {question.question}
					</h2>
					<ul>
						<li
							ref={Option1}
							onClick={(e) => {
								checkAns(e, 1);
							}}
						>
							{question.option1}
						</li>
						<li
							ref={Option2}
							onClick={(e) => {
								checkAns(e, 2);
							}}
						>
							{question.option2}
						</li>
						<li
							ref={Option3}
							onClick={(e) => {
								checkAns(e, 3);
							}}
						>
							{question.option3}
						</li>
						<li
							ref={Option4}
							onClick={(e) => {
								checkAns(e, 4);
							}}
						>
							{question.option4}
						</li>
					</ul>
					<button onClick={next}>Next</button>
					<div className="index">
						{index + 1} of {data.length} questions
					</div>
				</>
			)}
			{result ? (
				<>
					<h2>
						You Scored {score} out of {data.length}
					</h2>
					<button onClick={reset}>Reset</button>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Quiz;
