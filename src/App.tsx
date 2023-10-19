import { buttons, operations } from "./data/calulatorButtons";
import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

const OPERATIONS = ["/", "*", "+", "-"];

function App() {
	const [expression, setExpression] = useState("");

	const handleClick = (value: string) => {
		const splittedExp = expression.split(/([-+*/])/);
		const lastFromSplitted = splittedExp[splittedExp.length - 1];
		const lastLetter = expression.slice(-1);

		switch (value) {
			case "=":
				setExpression(evaluate(expression).toString());
				break;
			case "AC":
				setExpression("");
				break;

			case ".":
				if (!lastFromSplitted.includes(".")) {
					if (Number.isNaN(Number(lastLetter)) || expression.length === 0) {
						setExpression(expression + "0" + value);
					} else setExpression(expression + value);
				}
				break;
			case "cos":
			case "sin":
			case "log":
				setExpression(expression + value + "(");
				break;
			default:
				if (OPERATIONS.includes(value) && OPERATIONS.includes(lastLetter)) {
					setExpression(expression.slice(0, -1) + value);
					return;
				} else if (
					(OPERATIONS.includes(value) && expression === "") ||
					(value === "0" && expression === "")
				) {
					return;
				}
				setExpression(expression + value);
		}
	};

	return (
		<div className="App">
			<div id="calculator">
				<div className="display-container">
					<p id="display">{expression || "0"}</p>
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
							id={id}
							onClick={() => handleClick(value)}
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
