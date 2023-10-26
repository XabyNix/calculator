import { buttons, operations } from "./data/calulatorButtons";
import { MouseEvent, useEffect, useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
	const [expression, setExpression] = useState("");
	const [displayInput, setDisplayInput] = useState("");
	const [result, setResult] = useState("");

	const [equals, setEqual] = useState(false);
	const [degActivate, setDegActivate] = useState(false);

	useEffect(() => {
		if (equals) {
			setResult(evaluate(expression));
			setEqual(false);
		} else setDisplayInput(expression);
	}, [equals, expression]);

	function changeArgument() {
		//const findArgsRegex = /(?<=[sin|cos|tan|cot]\()\d*(?=\))/gi;

		const findArgsRegex = /\)/gi;
		setExpression(expression.replace(findArgsRegex, " deg)"));
	}

	function isLastAnOperator(stringToCheck: string) {
		const operatorsRegex = /[+-/*]$/;
		return operatorsRegex.test(stringToCheck);
	}

	const handleClick = (value: string, e?: MouseEvent<HTMLButtonElement>) => {
		switch (value) {
			case "sin":
			case "cos":
			case "tan":
			case "cot":
			case "sqrt":
			case "log":
				setExpression(expression + value + "(");

				break;
			case "AC":
				setExpression("");
				setResult("");
				break;
			case "deg":
				setDegActivate(!degActivate);
				e!.currentTarget.classList.toggle("pressed");
				break;
			case "=":
				setEqual(true);
				degActivate && changeArgument();
				break;
			case ".":
				/\d$/.test(expression)
					? setExpression(expression + value)
					: setExpression(expression + "0" + value);

				break;
			default:
				if (isLastAnOperator(expression) && isLastAnOperator(value)) {
					setExpression(expression.replace(/.$/, value));
				} else setExpression(expression + value);
				break;
		}
	};

	return (
		<div className="App">
			<div id="calculator">
				<div className="display-container">
					<p id="display">{displayInput}</p>
					<p id="resultDisplay">{result || "0"}</p>
				</div>
				<div className="boardContainer">
					<div className="numbersContainer">
						{buttons.map(({ id, value }) => (
							<button
								className="btn"
								onClick={() => handleClick(value)}
								key={value}
								type="button"
								id={id}
								style={{ gridArea: id }}
							>
								{value}
							</button>
						))}
					</div>
					{operations.map(({ id, value }) => (
						<button
							key={id}
							id={id}
							onClick={(e) => handleClick(value, e)}
							className="btn operation"
							style={{ gridArea: id }}
						>
							{value}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
