import React, { Component } from 'react'
import styled from 'styled-components/macro'
import {COLORS} from '../../components/constants'

const CategoryLayout = styled.main`
box-sizing:border-box;
background-color: #E5E5E5;
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
      <div>Category Name</div>
      </CategoryLayout>
    )
  }
}
