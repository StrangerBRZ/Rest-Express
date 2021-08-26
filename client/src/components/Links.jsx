import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    My MERN Application - By Gavin Zheng
                </Link>
            </React.Fragment>
        )
    }
}

export default Links
