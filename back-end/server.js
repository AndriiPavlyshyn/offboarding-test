const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
const employees = [
	{
		id: "vvv1355",
		name: "John Doe",
		department: "Engineering",
		status: "ACTIVE",
		email: "some.email@wp.pl",
		equipments: [
			{ id: "aaa123456", name: "Macbook air" },
			{ id: "aaa123457", name: "Magic Mouse" }
		]
	},
	{
		id: "vvv1323",
		name: "John Doe 2",
		department: "Marketing",
		status: "OFFBOARDED",
		email: "some.email2@wp.pl",
		equipments: [
			{ id: "aaa123456", name: "Macbook air" },
		]
	},
];

// Endpoints

// GET /employees
app.get('/employees', (req, res) => {
	res.status(200).json(employees);
});

// GET /employees/:id
app.get('/employees/:id', (req, res) => {
	const employee = employees.find(emp => emp.id === req.params.id);
	
	if (employee) {
		res.status(200).json(employee);
	} else {
		res.status(404).json({ message: "Employee not found" });
	}
});

// POST /users/:id/offboard
app.post('/users/:id/offboard', (req, res) => {
	const { id } = req.params;
	const { country, email, phone, postalCode, receiver } = req.body;
	
	if (!email || !receiver || !phone || !postalCode || !country) {
		return res.status(400).json({ message: "Invalid request body" });
	}
	
	const employeeIndex = employees.findIndex((emp) => emp.id === id);
	
	if (employeeIndex === -1) {
		return res.status(404).json({ message: "Employee not found" });
	}
	
	employees[employeeIndex] = {
		...employees[employeeIndex],
		status: 'OFFBOARDED',
	};
	
	res.status(200).json(employees);
});

// Start the server
app.listen(port, () => {
	console.log(`Mock server running at http://localhost:${port}`);
});
