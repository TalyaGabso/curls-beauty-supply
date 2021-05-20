import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { infoProduct } from '../redux/actions/product.action';
// Pages

// Components
import Rating from '../components/Rating/Rating.component'
// CSS
import Loader from '../UI/Loader/Loader.component';
import AlertMessage from '../UI/Alert/Alert.component';
import { Image } from 'react-bootstrap';


const Product = ({ history, match }) => {

   const [qty, setQty] = useState(1)
   const dispatch = useDispatch();

   const productInfo = useSelector(state => state.productInfo)
   const { loading, error, product } = productInfo;
   console.log('PRODUCT PAGE INFO: ', productInfo);

   useEffect(() => {

      dispatch(infoProduct(match.params.id));
   }, [dispatch, match]);

   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
   };

   return (
      <>
         {loading ? <Loader />
            : error ? <AlertMessage>{error}</AlertMessage>
               : <div>
                  <div>
                     {/* image */}
                     <Image src={product.image} alt={product.productName} fluid />
                  </div>
                  <div>
                     <div variant='flush'>
                        <div>{product.productName}</div>
                        <div><Rating value={product.rating} number={product.totalRating} /></div>
                        <div>${product.price}</div>

                        {/* select quantity */}
                        {product.availableQty > 0 && (
                           <form>
                              <label htmlFor="selectQty">Select</label>
                              <select id="selectQty" name="qty" value={qty} onChange={(e) => setQty(e.target.value)}>
                                 {[...Array(product.availableQty).keys()].map((num) =>
                                    (<option key={num + 1} value={num + 1}> {num + 1} </option>))}
                              </select>
                           </form>
                        )}
                        {/* add to cart */}
                        <div>
                           <div>
                              <div>
                                 <button
                                    onClick={addToCartHandler}
                                    className="AddToCart-btn"
                                    type='button'
                                    disable={(product.availableQty === 0).toString()}>
                                    Add To Cart
                                 </button>
                              </div>
                              {product.availableQty > 0 ? '' : <div>Currently Out Of Stock</div>}
                           </div>
                        </div>
                        <div>
                           <strong>Details</strong>
                        </div>
                        <div>
                           {product.description}
                        </div>
                     </div>
                     <Link className='goBack-btn' to='/'>Go Back</Link>
                  </div>
               </div>
         }
      </>
   )
};

export default Product;