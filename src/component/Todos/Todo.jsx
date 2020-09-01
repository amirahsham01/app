import React, { Component } from 'react';
import EditTodo from "./EditTodo"
import Axios from 'axios';
import { Container } from 'react-bootstrap';

const URL = process.env.REACT_APP_URL;

export default class Todo extends Component {
    state = {
        todo: null,
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
        let { todo } = this.state;
        return (
            <Container className="mt-4">
                <h1>Todo here</h1>
                {todo ? (
                    <div>
                        {todo.description}
                        <p>status: <span className={this.state.todo.status === "completed" ? 'green' : 'red'}>{todo.status}</span></p>
                        <EditTodo todo={todo} editTodo={this.editTodo} />
                    </div>
                ) : ("error leh")}
            </Container>
        )
    }
}