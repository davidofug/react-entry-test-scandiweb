
import './App.css';
import React, { Component } from 'react'
// import styled from 'styled-components/macro'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

 class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>

        <Route path ='categorypage'        element ={<h2>Hi</h2>}/>
        <Route path ='productdisplaypage'  element ={<h3>hallo</h3>}/>
        <Route path ='cartPage'            element ={<h4>Fine</h4>}/>

      </Routes>
      </BrowserRouter>
    )
  }
}

export default App