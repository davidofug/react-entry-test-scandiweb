import { COLORS } from 'components/constants'
import React, { Component } from 'react'
import VectorIcon from '../../assets/icons/Vector.png'
export default class Modal extends Component {
  render() {
    const size = {
      height:3,
      width :6,
      color:COLORS.BORDERS.BLACK,

    }
    return (
        <div>
        
      <img style ={size} src = {VectorIcon} alt ='Cart-Icon'/>
      </div>
    )
  }
}
