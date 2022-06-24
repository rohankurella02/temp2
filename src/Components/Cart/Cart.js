import React from 'react'
import './Cart.scss'
import { useSelector, useDispatch } from 'react-redux'
import { cartSlice } from '../../slices/cartSlice'

function Cart() {
  const d = useSelector(state => state.cart)
  const dispatch = useDispatch()
  console.log(d.cartItems)

  return (
    <div className='cart'>Cart </div>
  )
}

export default Cart