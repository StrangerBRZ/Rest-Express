import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { NavBar } from '../components'
import { TasksList } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
              <Route path="/" exact component={TasksList} />
        </Router>
    )
}

export default App
