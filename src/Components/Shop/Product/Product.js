import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, deleteFromCart } from '../../../slices/cartSlice'
import './Product.scss';
import {FaExpand} from 'react-icons/fa';
import {FiShoppingCart} from 'react-icons/fi';
import {RiShoppingCartFill} from 'react-icons/ri';
import ProductPage from './ProductPage/ProductPage';
import { NavLink } from 'react-router-dom';

function Product(props) {

  const dispatch = useDispatch()
  const cartObject = useSelector(state => state.cart)

  const cart = () => {
    alert('added to cart')
    //console.log(props.object)
    dispatch(addToCart(props.object))
    console.log(cartObject)
  }

  return (
    <div className='outerBox'>
        <div className="imageBox">
            <img src={props.image} alt="itemImage" />
        </div>
        <div className="detailsBox">
            <div className="title">{props.name}</div>
            <div className="price">$ { props.price }</div>
            <div className="icons">
                <NavLink style={{color: "black"}} to={`/product/${props.object._id}`}><FaExpand className='iconOne' /></NavLink>
                <RiShoppingCartFill onClick={cart} className="iconOne" />
            </div>
        </div>
    </div>
  )
}

export default Product