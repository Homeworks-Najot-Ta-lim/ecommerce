import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();



function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.payload, count: 1 }];
    case "INCREASE_ITEM_COUNT": {
      const updatedCart = state.map((item) => {
        return item.id === action.id
          ? { ...item, count: item.count + 1 }
          : item;
      });
      return updatedCart;
    }
    case "DECREASE_ITEM_COUNT": {
      const updatedCart = state.map((item) => {
        return item.id === action.id
          ? { ...item, count: item.count - 1 }
          : item;
      });

      return updatedCart;
    }
    default:
      return state;
  }
}


const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);

  const totalCount = cart.reduce((total, currentProduct) => {
    return (total += currentProduct.count);
  }, 0);

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, totalCount, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be inside CartProvider!");
  }

  return context;
}

export default CartProvider;
