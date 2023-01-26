export const setDefaultAttributes = (product = null) => {
	if (!product) return false;

	if (product?.attributes.length > 0) {
		const { attributes } = product;
		// console.log(attributes);
		//1. Select default attributes
		//i.Loop through the attributes
		//ii.For each attribute, set the first item as selected
		// Add to cart
		//We need to find the find the attribute then set the first item to selected. */

		const modifiedAttributes = attributes.map((attribute) => {
			// const default_selected_item = {
			// 	selected: true,
			// 	...attribute.items[0],
			// };
			// attribute.items[0] = default_selected_item;
			const selectedItemsOfTheAttribute = attribute.items.filter(
				(item) => item?.selected === true
			);

			if (selectedItemsOfTheAttribute.length <= 0) {
				attribute.items[0]["selected"] = true;
			}
			return attribute;
		});
		product["attributes"] = modifiedAttributes;
		return product;
	}

	return product;
};

export const numSelectedItems = (attribute) => {
	const { items } = attribute;
	return items.filter((item) => item?.selected === true);
};
export const deselect = (attribute) => {
	const { items } = attribute;
	return items.map((item) => ({ value: item.value, selected: false }));
};
export const setAnAttribute = (product, attribute, position) => {
	return product?.attributes.map((theAttribute) => {
		if (theAttribute.name === attribute) {
			// const selectedItems = numSelectedItems(theAttribute);
			theAttribute.items = deselect(theAttribute);
			theAttribute.items[position] = {
				value: theAttribute.items[position].value,
				// selected: selectedItems.length <= 1 ? true : false,
				selected: true,
			};
			// theAttribute.items[position]?.selected
			//We can increase or decrease the product quantity
			//We can abolish diselect all the attribute items
		}
		// console.log(theAttribute.items);
		return theAttribute;
	});
};
