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
		attribute.items[0]["selected"] = true;
		return attribute;
	});
	product["attributes"] = modifiedAttributes;
	console.log(product);
}
