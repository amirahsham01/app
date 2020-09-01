import React, { Component } from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';
import "./main.css";

class Main extends Component {
    render() {
        return (
            <div id="first-section">
                    <svg id="svg" viewBox="-300 0 950 270" >
                        <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" stroke-width="120" stroke-linecap="round"/>
                    </svg>
                    <Container id="main-content">
                        <Row>
                            <Col>
                                <Image src="quill-texting.png" height="95px"/>
                                <span className="logo">TODO.IT</span>
                            </Col>
                        </Row>
                        <h1>Section Content</h1>
                    </Container>
            </div>
        )
    }
}

export default Main;
