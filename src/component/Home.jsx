import React, { Component } from 'react';
import AddTodo from "./Todos/AddTodo";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

export default class Home extends Component {
    state = {
        todos: [],
    };

    fetchTodos = () => {
        let token = localStorage.getItem("token");

        Axios.get(`${URL}/todos`, {
            headers: {
                "x-auth-token": token,
            },
        })
          .then((res) => {
            // console.log(res.data);
            this.setState({ todos: res.data.todos });
          })
          .catch((err) => {
            console.log(err);
          });
    };

    componentDidMount() {
        this.fetchTodos();
    }
    
    render() {
        return (
            <div>
                <Container className="mt-4">
                    <h3>Todos</h3>
                    <Row className="mt-4">
                        {this.state.todos.map((todo) => (
                            <Col key={todo._id} md="4">
                                <Card>
                                    <Card.Body>
                                        {todo.description}
                                        <div>
                                            <Link to={`/todo/${todo._id}`}>See Todo</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <AddTodo/>
                    </Row>
                </Container>
            </div>
        )
    }
}