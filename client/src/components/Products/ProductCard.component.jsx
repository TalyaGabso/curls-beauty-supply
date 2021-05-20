import React from 'react'
import { Link } from 'react-router-dom'
// Pages

// Components
import Rating from '../Rating/Rating.component'
// CSS


const ProductCard = ({ product }) => {
   console.log('PRODUCT CARD Component: ', product);

   return (
      <div className="product-card-container">
         <div className="product-card-body">
            <Link to={`shop/product/${product._id}`}><p>THIS IS A TEMP IMAGE OF THE PRODUCT</p></Link>
            <Link to={`shop/${product.category}`}><p>{product.category}</p></Link>
            <Link to={`shop/${product.brand}`}><p>{product.brand}</p></Link>
            <Link to={`shop/product/${product._id}`}><p>{product.productName}</p></Link>
            <div><Rating value={product.rating} number={product.totalRating} /></div>
            <div>${product.price}</div>
         </div>
         <Link className="product-card-cart-btn" to={`/cart/${product._id}`}>add to cart</Link>
      </div>
   );
};

export default ProductCard;
