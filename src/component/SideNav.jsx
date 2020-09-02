import React, { Component } from 'react';

export default class SideNav extends Component {
    render() {
        return (
            <div>
                <div className="sidenav">
                    <a href="#inbox"><img src="/inbox.png" height="35px" className="pr-2" alt="inbox"/>All My To-dos</a>
                    <a href="#today"><img src="/today.png" height="32px" className="pr-2" alt="today"/>Today</a>
                    <a href="#tomorrow"><img src="/tomorrow.png" height="32px" className="pr-2" alt="tomorrow"/>Tomorrow</a>
                    <div className="projects"><strong>Projects</strong></div>
                    {/* <li><strong>Projects</strong>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ul>
                    </li> */}
                    <div className="tab mt-2"><strong>Labels</strong></div>
                </div>
            </div>
        )
    }
}
