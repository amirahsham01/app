import React, { Component } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import Axios from "axios";

const URL = process.env.REACT_APP_URL;

export default class AddTodo extends Component {
  state = {
    description: "",
    completed: false,
    scheduled: "",
    priority: "",
    labels: [],
    label: "",
  };

  changeHandler = (e) => {
    //allow a re render in todo.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  addLabel = async (e) => {
    let token = localStorage.getItem("token");
    let label = this.state.label;
    let result = await Axios.get(`${URL}/todos`, {headers: {"x-auth-token": token}})
    let array = result.data.todos;

    for (let index = 0; index < array.length; index++) {
      const todo = array[index];
      for (let index = 0; index < todo.labels.length; index++) {
        const element = todo.labels[index];
        
        if(element === label) {
          console.log("label exists!");
          break;
        } else {
          console.log("label saved");
          this.setState({ label: '' , labels: [...this.state.labels, this.state.label] });
        }
      }
    }
  }

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
    let { description, scheduled, priority, label } = this.state;
    return (
        <Container className="mt-4">
            <h4>Add Todo</h4>
            <Row>
              <Col md="7">
                <Form.Control
                className="my-2"
                name="description"
                placeholder="description of todo"
                value={description}
                onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col md="7">
                <Form.Control
                className="mb-2"
                name="scheduled"
                type="date"
                placeholder="schedule a date"
                value={scheduled}
                onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row>
              {this.state.labels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </Row>
            <Row>
              <Col md="3">
                <label>
                  Set a priority:
                  <select name="priority" value={priority} onChange={this.changeHandler}>
                  <option>Priority 1</option>
                  <option>Priority 2</option>
                  <option>Priority 3</option>
                  </select>
                </label>
              </Col>
              <Col md="2">
                <Form.Control
                  className="mb-2"
                  name="label"
                  placeholder="Add a Label"
                  value={this.state.label}
                  onChange={this.changeHandler}
                />
              </Col>
              <Button onClick={this.addLabel}>Add Label</Button>
            </Row>
            <Button onClick={this.submitHandler}>Submit</Button>
        </Container>
    );
  }
}