import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './sellerpage.css'; // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productSlice';

const SellerPage = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
    });
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setProductData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product`, productData);
            dispatch(addProduct(response.data));
            setProducts([...products, response.data]);
            setProductData({ name: '', price: '', description: '', image: null });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="seller-page">
            <Navbar />
            <h1>Seller Dashboard</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                />
                <button type="submit">Add Product</button>
            </form>
            <h2>My Products</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerPage;
