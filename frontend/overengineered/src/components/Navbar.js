import React, { Component } from 'react'
// import '../navbarhamburger.js'

export class Navbar extends Component {
  render() {
    return (
        <nav className="navbar">
        <div className="title">Name</div>
        <a href="#" className="button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
        <div className="links">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>

    </nav>
    )
  }
}

export default Navbar;