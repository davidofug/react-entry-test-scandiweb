import React, { Component } from 'react'
import styled from 'styled-components/macro'
import {COLORS} from '../../components/constants'
import IMAGE from '../../assets/imgs/dress2.jpg'



const CategoryLayout = styled.main`
  box-sizing:border-box;
  color:${COLORS.BLACK};
  max-height:1513px;
  max-width:1440px;
  padding-left:100px;
  padding-right:102px;
`


export default class Category extends Component {
    render() {
    return (
      <CategoryLayout>
       <h3>Category name</h3>
      </CategoryLayout>
    )
  }
}
