import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">MyShop</Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/cart" className="hover:text-gray-200">Cart</Link>
        {userInfo?.isAdmin && (
          <>
            <Link to="/add-product" className="hover:text-gray-200">Add Product</Link>
            <Link to="/admin/products" className="hover:text-gray-200">Manage</Link>
          </>
        )}
        {userInfo ? (
          <>
            <span className="font-semibold">{userInfo.name}</span>
            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/signup" className="hover:text-gray-200">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
