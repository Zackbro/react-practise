console.log('test');

import React from 'react'
import ReactDOM from 'react-dom'
import TodoHandler from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			todos: [],
			isAllChecked: false
		}
	}

	addTodo(item) {
		this.state.todos.push(item);
		this.setState({todos: this.state.todos});
	}
	// 改变todo状态，传给item和footer组件，es6初始化参数
	changeTodoState(index, isDone, isChangeAll=false) {
		if (isChangeAll) {
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			})
		}else{
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}
	}
	// 判断是否所有todo都完成
	allChecked() {
		let isAllChecked = false;
		if (this.state.todos.every(todo => todo.isDone)) {
			isAllChecked = true;
		}
		this.setState({
			todos: this.state.todos,
			isAllChecked: isAllChecked
		});
	}

	clearDone() {
		let todos = this.state.todos.filter(todo => !todo.isDone)
		this.setState({
			todos: todos
		})
	}

	deleteTodo(index) {
		this.state.todos.splice(index, 1)
		this.setState({todos: this.state.todos})
	}

	render() {
		// 变量放在里面？
		let info = {
			isAllChecked: this.state.isAllChecked,
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
		}
		return (
			<div className='todo-wrapper'>
				<TodoHandler addTodo={this.addTodo.bind(this)}/>
				<TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
				<TodoFooter {...info} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)}/>
			</div>
		)
	}
}


ReactDOM.render(<App/>,document.getElementById('app'))