import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white shadow-md p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Quantity: {item.qty}</p>
              </div>

                  <button
                    onClick={() =>
                      dispatch({ type: "DECREASE_QTY", payload: item._id })
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition"
                  >
                    −
                  </button>

                  <span className="text-lg font-medium">{item.qty}</span>

                  <button
                    onClick={() =>
                      dispatch({ type: "INCREASE_QTY", payload: item._id })
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
