export const buttons = [
	{
		id: "zero",
		value: "0",
	},
	{
		id: "one",
		value: "1",
	},
	{
		id: "two",
		value: "2",
	},
	{
		id: "three",
		value: "3",
	},
	{
		id: "four",
		value: "4",
	},
	{
		id: "five",
		value: "5",
	},
	{
		id: "six",
		value: "6",
	},
	{
		id: "seven",
		value: "7",
	},
	{
		id: "eight",
		value: "8",
	},
	{
		id: "nine",
		value: "9",
	},
	{
		id: "decimal",
		value: ".",
	},
	{
		id: "add",
		value: "+",
		isOperation: true,
	},
	{
		id: "subtract",
		value: "-",
		isOperation: true,
	},
	{
		id: "multiply",
		value: "*",
		isOperation: true,
	},
	{
		id: "divide",
		value: "/",
		isOperation: true,
	},
	{
		id: "equals",
		value: "=",
	},
	{
		id: "clear",
		value: "AC",
	},
];

export type Tbutton = (typeof buttons)[0];
