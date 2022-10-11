import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, deleteFromCart } from '../../../slices/cartSlice'
import './Product.scss';
import {FaExpand} from 'react-icons/fa';
import {FiShoppingCart} from 'react-icons/fi';
import {RiShoppingCartFill} from 'react-icons/ri';
import ProductPage from './ProductPage/ProductPage';
import { NavLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';


function Product(props) {

  const dispatch = useDispatch()
  const cartObject = useSelector(state => state.cart)
  // const alert = useAlert()

  const cart = () => {
    // <Alert severity="success">Product Added to Cart Successfully</Alert>
    //console.log(props.object)
    toast.success('Product Added to Cart Successfully', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
    dispatch(addToCart(props.object))
    console.log(cartObject)
  }
  return (
    <>
      
      <div className='outerBox'>

        <div className="imageBox">
          <img src={props.image} alt="itemImage" />
        </div>
        <div className="detailsBox">
          <div className="title">{props.name}</div>
          <div className="price">₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(parseInt(props.price))}</div>
          <div className="icons">
            <NavLink style={{ color: "black" }} to={`/product/${props.object._id}`}><FaExpand className='iconOne' /></NavLink>
            <RiShoppingCartFill onClick={cart} className="iconOne" />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Product