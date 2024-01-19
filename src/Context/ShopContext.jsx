import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let i = 0; i < all_product.length + 1; i++) {
		cart[i] = 0;
	}
	return cart;
};

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(getDefaultCart());

	const addToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		console.log(cartItems);
	};
	const removeToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) 
    {
			if (cartItems[item] > 0) 
      {
				let itemInfo = all_product.find((product) => product.id === Number(item))
				totalAmount += itemInfo.new_price * cartItems[item];
			}
      console.log(totalAmount)
			return totalAmount;
		}
	};
  
  const getTotalCartItems = () => {
    let totalItem = 0;
    for(const item in cartItems)
    {
      if(cartItems[item] > 0)
      {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }

	const contexValue = {
    getTotalCartItems,
		getTotalCartAmount,
		all_product,
		cartItems,
		addToCart,
		removeToCart,
	};

	return (
		<ShopContext.Provider value={contexValue}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
