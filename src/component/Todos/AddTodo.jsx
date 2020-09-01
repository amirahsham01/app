import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";

const URL = process.env.REACT_APP_URL;

export default class AddTodo extends Component {
  state = {
    description: "",
    completed: false,
    scheduled: '',
  };

  changeHandler = (e) => {
    //allow a re render in todo.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    console.log(this.state);
    let token = localStorage.getItem("token");

    Axios.post(`${URL}/todos`, this.state, {"headers" : {"x-auth-token": token}})
        .then((res) => {
            console.log("done");
        })
        .catch((err) => {
            console.log(err);
        });
  };

  render() {
    let { description, scheduled } = this.state;
    return (
        <Container className="mt-4">
            <h2>Add Todo</h2>
            <Row>
                <Form.Control
                className="my-2"
                name="description"
                placeholder="description of todo"
                value={description}
                onChange={this.changeHandler}
                />
            </Row>
            <Row>
                <Form.Control
                className="mb-2"
                name="scheduled"
                type="date"
                placeholder="schedule a date"
                value={scheduled}
                onChange={this.changeHandler}
                />
            </Row>
            <Button onClick={this.submitHandler}>Submit</Button>
        </Container>
    );
  }
}