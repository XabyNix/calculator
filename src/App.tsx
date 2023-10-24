import { buttons, operations } from "./data/calulatorButtons";
import { MouseEvent, useEffect, useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

/* const OPERATIONS = ["/", "*", "+", "-", "^", "%"];
 */
function App() {
	const [expression, setExpression] = useState("");
	const [display, setDisplay] = useState("");
	const [equals, setEqual] = useState(false);
	const [degActivate, setDegActivate] = useState(false);

	useEffect(() => {
		equals && setDisplay(evaluate(expression));
		setEqual(false);
	}, [equals]);

	function changeArgument() {
		const findArgsRegex = /(?<=[sin|cos|tan|cot]\()\d*(?=\))/gi;

		setExpression(expression.replace(findArgsRegex, "$& deg"));
		setEqual(true);
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
				setDisplay("");
				break;
			case "deg":
				setDegActivate(!degActivate);
				e.currentTarget.classList.toggle("pressed");
				break;
			case "=":
				degActivate ? changeArgument() : setEqual(true);
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
					<p id="display">{expression || "0"}</p>
					<p id="resultDisplay">{display || "0"}</p>
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

						//ora ho base e
						//cotangente tangente radice quadrata radice ennesima log base n
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
