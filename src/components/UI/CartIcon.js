import React, { Component } from "react";
import CartIconPath from "../../assets/icons/Empty-Cart.png";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { COLORS } from "../constants";
const CartImage = styled.img`
	cursor: pointer;
	height: 20px;
	width: 20px;
	color: ${COLORS.EMPTY_BASKETbg.BLACK};
`;
const IconWrapper = styled.div`
	position: relative;
	> span {
		position: absolute;
		display: flex;
		background-color: ${COLORS.BLACK};
		width: 30px;
		height: 30px;
		color: ${COLORS.WHITE};
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		top: -22px;
		right: -22px;
	}
`;
class CartIcon extends Component {
	returnQuantity = () => {
		let quantity = 0;
		this.props?.items?.forEach((item) => {
			quantity += item.quantity;
		});
		return quantity;
	};
	render() {
		return (
			<IconWrapper>
				<CartImage
					src={CartIconPath}
					alt="Cart-Icon"
					onClick={() => this.props.toggleMinicart()}
				/>
				{this.returnQuantity() > 0 && (
					<span>{this.returnQuantity()}</span>
				)}
			</IconWrapper>
		);
	}
}
const mapStoreToProps = (store) => ({
	...store.cartReducer,
});

export default connect(mapStoreToProps)(CartIcon);
