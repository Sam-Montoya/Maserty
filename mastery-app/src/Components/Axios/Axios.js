import React from 'react';
import './Axios.css';
import axios from 'axios';

export default class Axios extends React.Component {
	constructor() {
		super();

		this.state = {
			allTasks: [],
			headerText: 'Add a task!',
			titleText: '',
			descrText: '',
			timeText: '',
			id: null
		};

		this.submitTask = this.submitTask.bind(this);
	}

	componentDidMount() {
		axios.get('/api/getAllTasks').then((tasks) => {
			this.setState({
				allTasks: tasks.data
			});
		});
	}

	submitTask () {
		let taskInfo = {
			titleText: this.state.titleText,
			descrText: this.state.descrText,
			timeText: this.state.timeText,
			id: this.state.id
		};
		if (this.state.headerText === 'Add a task!' && this.state.id === null) {
			axios.post('/api/addTask', taskInfo).then((tasks) => {
				this.setState({
					allTasks: tasks.data
				});
			});
		} else {
			axios.put('/api/updateTask', taskInfo).then((tasks) => {
				this.setState({
					allTasks: tasks.data
				});
			});
		}
	};

	deleteTask = (id) => {
		axios.delete('/api/deleteTask/' + id).then((tasks) => {
			this.setState({
				allTasks: tasks.data
			});
		});
	};

	updateTicket = (id) => {
		if (this.state.headerText === 'Edit Info!') {
			this.setState({
				headerText: 'Add a task!',
				id: null
			});
		} else {
			this.setState({
				headerText: 'Edit Info!',
				id: id
			});
		}
	};

	render() {
		return (
			<div className='axios_container'>
				<section className='axios_addtask_container'>
					{this.state.headerText}
					<input onChange={(text) => this.setState({ titleText: text.target.value })} placeholder='title' />
					<input
						onChange={(text) => this.setState({ descrText: text.target.value })}
						placeholder='description'
					/>
					<input onChange={(text) => this.setState({ timeText: text.target.value })} placeholder='time' />
					<button onClick={() => this.submitTask()}>Submit</button>
				</section>
				<section className='axios_alltasks_container'>{this.mapThroughTasks()}</section>
			</div>
		);
	}

	mapThroughTasks = () => {
		return this.state.allTasks.map((task, index) => {
			return (
				<section className='task_container' key={index}>
					<div style={{ fontWeight: 'bold' }}>{task.title}</div>
					<div>{task.descr}</div>
					<h1>{task.time}</h1>
					<button onClick={() => this.deleteTask(task.id)}>Delete</button>
					<button onClick={() => this.updateTicket(task.id)}>Edit</button>
				</section>
			);
		});
	};
}
