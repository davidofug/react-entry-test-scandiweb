import React, { Component } from "react";
import styled from "styled-components/macro";
const Wrapper = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;
export default class Modal extends Component {
	render() {
		return (
			<Wrapper id="modal" {...this.props}>
				{this.props.children}
			</Wrapper>
		);
	}
}
