import React, { Component } from 'react'
import LogoIcon from '../../assets/icons/a-logo.png'
export default class Logo extends Component {
  render() {
    const size = {
      height: 41,
      width:  41,
  }

    return (
      <img style={size} src = {LogoIcon} alt ='Brand-Icon'/>
    )
  }
}
