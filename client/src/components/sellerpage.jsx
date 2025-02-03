import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sellerpage.css'; // Import your CSS file
import { useSelector } from 'react-redux';

const SellerPage = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: ''
    });
    const [products, setProducts] = useState([]);
    const token = useSelector((state) => state.auth.token); // Get the token from Redux state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/seller/products', productData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            });
            console.log('Product added:', response.data);
            // Optionally, fetch products again to update the list
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/seller/products`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            });
            setProducts(response.data || []); // Ensure response.data is an array
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="seller-page">
            <h1>Seller Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>
            <h2>Your Products</h2>
            <ul>
                {Array.isArray(products) && products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img src={product.image} alt={product.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerPage;
