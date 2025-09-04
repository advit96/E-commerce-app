import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);
        setFormData({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          stock: data.stock || "",
          imageUrl: data.image || "",
          image: null,
        });
        setLoading(false);
      } catch (e) {
        setError("Failed to load product");
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
      await axios.put(`${API_BASE}/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert("Product updated");
      navigate("/admin/products");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Error updating";
      alert(msg);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
      <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} />
      <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} />
      <input type="number" name="stock" value={formData.stock} placeholder="Stock" onChange={handleChange} />
      <input type="url" name="imageUrl" value={formData.imageUrl} placeholder="Image URL (optional)" onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProduct;


