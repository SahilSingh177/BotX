import React, { Component } from 'react'

import '../container.css'

export class Container extends Component {
  render() {
    return (
      <div className="main">
        <div className="inputfield">
          <p>Bot Name:</p>
          <input type="text" />
        </div>
        <div className="inputfield">
          <p>Bot Description:</p>
          <input type="text" className='desc'/>
        </div>
        <button>Go!</button>
      </div>
    )
  }
}

export default Container;

