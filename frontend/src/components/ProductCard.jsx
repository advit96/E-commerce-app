import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { buildImageUrl } from "../config";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 hover:shadow-lg transition">
        {product.image ? (
          <img
            src={buildImageUrl(product.image)}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = "block";
            }}
          />
        ) : null}
        <div
          className="w-full h-40 rounded mb-3 bg-gray-200"
          style={{ display: product.image ? "none" : "block" }}
        />
        
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="mt-3 flex justify-between">
        <button
          onClick={addToCart}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
