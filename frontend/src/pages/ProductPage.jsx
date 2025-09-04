import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE, buildImageUrl } from "../config";



const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dispatch } = useCart();

    const addToCartHandler = () => {
              
  dispatch({ type: "ADD_TO_CART", payload: product });
};



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);
        console.log("fetched data", data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {product.image ? (
          <img
            src={buildImageUrl(product.image)}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 rounded" />
        )}

        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">₹{product.price}</p>
          <p
            className={`${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            } font-medium`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={addToCartHandler}
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition 
              ${
                product.stock > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
