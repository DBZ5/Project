import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('white');

  // This would normally come from route params and an API call
  const product = {
    id: 1,
    name: "Havic HV G-92 Gamepad",
    price: 192.00,
    description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    image: "https://picsum.photos/200/300",
    category: "Electronics",
    inStock: true,
    reviews: 150,
    rating: 4.5,
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', {
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="thumbnail-list">
          {/* Thumbnail images would go here */}
        </div>
        <div className="main-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="product-meta">
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && '½'}
            {'☆'.repeat(5 - Math.ceil(product.rating))}
            <span>({product.reviews} Reviews)</span>
          </div>
          <div className="stock-status">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>

        <div className="price">${product.price.toFixed(2)}</div>
        <p className="description">{product.description}</p>

        <div className="options">
          <div className="colors">
            <label>Colours:</label>
            <div className="color-options">
              {['white', 'red'].map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="sizes">
            <label>Size:</label>
            <div className="size-options">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="add-to-wishlist">
            ♡
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 