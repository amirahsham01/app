import React, { Component } from 'react';
import EditTodo from "./EditTodo";
import Comment from "./Comment";
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import SideNav from '../SideNav';

const URL = process.env.REACT_APP_URL;

export default class Todo extends Component {
    state = {
        todo: null,
        edit: false,
    };

    showEdit = () => {
        this.setState((prevState) => ({ edit: !prevState.edit }));
    };

    editTodo = (obj, id) => {
        Axios.put(`${URL}/todos/${id}`, obj)
            .then((res) => {
                console.log("done edit")
                // call method for re render
                this.getTodo();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getTodo = () => {
        Axios.get(`${URL}/todos/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({ todo: res.data.todo });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getTodo();
    }

    render() {
        let { todo, edit } = this.state;
        return (
            <div className="mt-4">
                <SideNav/>
                <div className="main">
                    <h4>Todo here</h4>
                    {todo ? (
                        <div>
                            <div>
                                {todo.description}
                                <p>status: 
                                    <span className={this.state.todo.completed === "true" ? 'green' : 'red'}>
                                    {this.state.todo.completed === "true" ? " completed" : " incompleted"}
                                    </span>
                                </p>
                            </div>
                            <Button onClick={this.showEdit}>Edit Todo</Button>
                            {edit && <EditTodo todo={todo} editTodo={this.editTodo} />}
                            <Comment/>
                        </div>
                    ) : ("error leh")}
                </div>
            </div>
        )
    }
}