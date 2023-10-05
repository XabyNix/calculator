import { buttons } from "./data/calulatorButtons";
import "./App.css";
import { useState } from "react";
import { evaluate } from "mathjs";

const OPERATIONS = ["/", "*", "+", "."];

function App() {
	const [expression, setExpression] = useState("");

	const handleClick = (id: string, value: string) => {
		if (id === "equals") setExpression(evaluate(expression).toString());
		else if (id === "clear") {
			setExpression("");
		} else handleDisplayChange(value);
	};

	const handleDisplayChange = (value: string) => {
		if (
			(OPERATIONS.includes(value) && expression === "") ||
			(OPERATIONS.includes(value) && OPERATIONS.includes(expression.slice(-1))) ||
			(value === "0" && expression === "")
		)
			return;

		setExpression(expression + value);
	};

	return (
		<div className="App">
			<div id="calculator">
				<div id="display">{expression || "0"}</div>
				<div className="boardContainer">
					{buttons.map(({ id, value }) => (
						<button
							className="button"
							onClick={() => handleClick(id, value)}
							key={id}
							type="button"
							id={id}
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
