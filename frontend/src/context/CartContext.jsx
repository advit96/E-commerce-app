import React, { createContext, useReducer, useContext } from "react";

// Create context
const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        // If item exists, update quantity
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        // Add new item with qty = 1
        return { ...state, cartItems: [...state.cartItems, { ...item, qty: 1 }] };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x._id !== action.payload),
      };

      case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map(x =>
          x._id === action.payload ? { ...x, qty: x.qty + 1 } : x
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems
          .map(x =>
            x._id === action.payload ? { ...x, qty: x.qty - 1 } : x
          )
          .filter(x => x.qty > 0), // qty 0 hone par remove
      };


    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
