import React, { Component } from 'react';
import moment from 'moment';

export default class Today extends Component {

    state = {
        current: '',
    }

    componentDidMount() {
        let date = moment()
        .format('dddd, D MMM YYYY');

        this.setState({ current: date });
    }
   
    render() {
      return (
        <div>
            <h4><strong>Today</strong></h4>
            <h5>{this.state.current}</h5>
        </div>
      );
    }
}
