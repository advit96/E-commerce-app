import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    try {
  const storedUser = localStorage.getItem("userInfo");
  const parsed = storedUser ? JSON.parse(storedUser) : null;
  const token = parsed?.token || localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in as an admin to add products.");
    return;
  }


      await axios.post(`${API_BASE}/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" ,
                  Authorization: `Bearer ${token}`, // 👈 send token

        },

      });
      alert("Product added!");
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || "Error adding product";
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
      <input type="url" name="imageUrl" placeholder="Image URL (optional)" onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
