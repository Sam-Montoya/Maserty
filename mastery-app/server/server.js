const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive('postgres://@localhost:5432/Mastery')
	.then((db) => {
		app.set('db', db);
		console.log('Connected!');
	})
	.catch((err) => {
		console.log('Something happened... ' + err);
	});

app.get('/api/getAllTasks', (request, response) => {
	let DB = app.get('db');
	DB.get_all_tasks().then((tasks) => {
		response.status(200).send(tasks);
	});
});
app.post('/api/addTask', (request, response) => {
	let DB = app.get('db');
	let { titleText, descrText, timeText } = request.body;
	DB.add_task([ titleText, descrText, timeText ]).then((_) => {
		DB.get_all_tasks().then((tasks) => {
			response.status(200).send(tasks);
		});
	});
});
app.put('/api/updateTask', (request, response) => {
	let DB = app.get('db');
	DB.update_task([
		request.body.titleText,
		request.body.descrText,
		request.body.timeText,
		request.body.id
	]).then((_) => {
		DB.get_all_tasks().then((tasks) => {
			response.status(200).send(tasks);
		});
	});
});
app.delete('/api/deleteTask/:id', (request, response) => {
	let DB = app.get('db');
	DB.delete_task(request.params.id).then((_) => {
		DB.get_all_tasks().then((tasks) => {
			response.status(200).send(tasks);
		});
	});
});

app.listen(3030, () => console.log('Server being slapped on port 3030'));
