import React, { Component } from 'react'
import loading from '.././assets/loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className="text-center">
                <img src="https://i.stack.imgur.com/27Rnd.gif" alt="loading" />
            </div>
        )
    }
}

export default Spinner