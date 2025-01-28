import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get("http://localhost:5000/api/products");
            setProduct(response.data[0]); 
        };
        fetchProduct();
    }, []);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductPage; 