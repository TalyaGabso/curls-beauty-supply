import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/product.action';
import Loader from '../UI/Loader/Loader.component';
import AlertMessage from '../UI/Alert/Alert.component';
// import {} from '';
// Pages

// Components
import Product from '../components/Products/ProductCard.component'
// CSS

const Shop = () => {

   const dispatch = useDispatch()
   const productList = useSelector(state => state.productList)
   console.log('SHOP PAGE PRODUCT LIST: ', productList);
   const { loading, error, products } = productList;

   useEffect(() => {
      dispatch(listProducts())
   }, [dispatch]);

   return (
      <>
         <h2>SHOP ALL</h2>
         {loading
            ? <Loader />
            : error ? <AlertMessage>{error}</AlertMessage>
               : <div>
                  <span>FILTER </span>
                  {/* 
         FILTER:
         category: Shampoo, Conditioner, Leave-In, Moisturizer, Styler, Oil, Hair Accessories
         brand: array of brands
         price: range
         */}
                  <span> SORT</span>
                  {/* SORT:price,name */}
                  <div className="products-container">
                     {products.map(product => (
                        <div key={product._id}>
                           <Product product={product} />
                        </div>
                     ))}
                  </div>
               </div>
         }
      </>
   );
};

export default Shop;