import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

// create styled-components
const Container = styled.div.attrs({
    className: 'container',
})`
    padding: 20px 0;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 5px;
`

const Wrapper = styled.div`
    padding: 40px;
    margin: auto;
    border: 1px solid black;
`

const Update = styled.input.attrs({
    type: 'checkbox'
})`
    color: #ef9b0f;
    cursor: pointer;
`
const UpdateChecked = styled.input.attrs({
    type: 'checkbox',
    checked: 'checked'
})`
    color: #ef9b0f;
    cursor: pointer;
`

const DeleteAll = styled.button.attrs({
    className: `btn btn-danger`,
})``

const Search = styled.input.attrs({
    type: 'text',
    onkeyup: 'myFunction()',
    placeholder: 'Search...',
    id: 'myInput',
})``

// update tasks from checkbox
class UpdateTask extends Component {
    updateUser = event => {
        const _id = this.props.id;
        const status = event.target.checked;
        const payload = { _id, status }
        

        api.updateTask(_id, payload);
        window.location.reload()
    }

    render() {
        const o_status = this.props.originalStatus;
        if (o_status) {
            return <UpdateChecked onChange={this.updateUser}></UpdateChecked>
        }
        return <Update onChange={this.updateUser}></Update>
    }
}

// delete all tasks with button click
class DeleteTasks extends Component {
    clearTasks = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete all the tasks permanently?`,
            )
        ) {
            api.deleteAllTasks()
            window.location.reload()
        }
    }

    render() {
        return <DeleteAll onClick={this.clearTasks}>Delete All</DeleteAll>
    }
}

// Create new task
class TasksInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            status: false,
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleIncludeTask = async () => {
        const { name, status } = this.state
        const payload = { name, status }

        await api.insertTask(payload).then(res => {
            window.alert(`Task inserted successfully`)
            this.setState({
                name: '',
                status: false,
            })
            window.location.reload()
        })
    }

    render() {
        const { name } = this.state
        return (
            <div className="row">
                <div className="col-sm-8">
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />
                </div>
                
                <div className="col-sm-4">
                    <Button onClick={this.handleIncludeTask}>Add</Button>
                </div>
            </div>
        )
    }
}

// To Do table
class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
    }

    componentDidMount = async () => {
        var n_tasks = {}
        await api.getAllTasks().then(tasks => {
            n_tasks = tasks.data.data;
        })
        var n_rows = [];
        for (var i=0; i < n_tasks.length; i++){
            if (!n_tasks[i].status){
                n_rows[i] = n_tasks[i]
            }
        }
        // table data sorting based on alphabetical order
        n_rows.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        })
        this.setState({rows: n_rows})

        // setup auto sync with backend changes
        this.interval = setInterval(() => this.autoSync(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    autoSync() {
        window.location.reload()
    }

    getTableRow(task) {
        return(
            <tr key={task._id}><td key={task._id}><UpdateTask id={task._id} originalStatus={task.status}></UpdateTask> {task.name}</td></tr>
        )
    }
    render() {
        const { rows } = this.state
        
        return rows.map(task => this.getTableRow(task))
    }
}

// Done table
class DoneList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            isChecked: true,
        }
    }

    componentDidMount = async () => {
        var n_tasks = {}
        await api.getAllTasks().then(tasks => {
            n_tasks = tasks.data.data;
        })
        var n_rows = [];
        for (var i=0; i < n_tasks.length; i++){
            if (n_tasks[i].status){
                n_rows[i] = n_tasks[i]
            }
        }
        // table data sorting based on alphabetical order
        n_rows.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        })
        this.setState({rows: n_rows})
    }

    getTableRow(task) {
        return(
            <tr key={task._id}><td key={task._id}><UpdateTask id={task._id} originalStatus={task.status}></UpdateTask> {task.name}</td></tr>
        )
    }
    render() {
        const { rows } = this.state
        return rows.map(task => this.getTableRow(task))
    }
}

// search function across two tables
class SearchTables extends Component {
    handleSearchTask() {
        var input, filter, tr, td, i,alltables;
        alltables = document.querySelectorAll("table[data-name=mytable]");
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        alltables.forEach(function(table){
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[0];
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
        });
    }
    render () {
        return(
            <Search onChange={this.handleSearchTask}></Search>
        )
    }
}

// render page with elements created above
class TasksList extends Component {
    render() {
        return (
            <Container>
                <Wrapper>
                    <div className="row">
                        <div className="col">
                            <h2>Marvelous v2.0</h2>
                        </div>
                        <div className="col">
                            <div className="red text-right"><DeleteTasks id="deleteAll"/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TasksInsert id="createTask" />
                        </div>
                        <div className="col text-right">
                            <SearchTables></SearchTables>
                        </div>
                    </div>
                    &nbsp;
                    <div className="row">
                        <div className="col">
                            <h3>To Do</h3>
                        </div>
                        <div className="col">
                            <h3>Done</h3>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col">
                            <table id="toDoTable" className="mytable" data-name="mytable">
                                <tbody>
                                    <ToDoList></ToDoList>
                                </tbody>
                                
                            </table>
                        </div>
                        <div className="col">
                            <table id="doneTable" className="mytable" data-name="mytable">
                                <tbody>
                                    <DoneList></DoneList>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </Wrapper>            
            </Container>
        )
    }
}


export default TasksList
