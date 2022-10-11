import React from 'react'
import './Cart.scss'
import { useSelector, useDispatch } from 'react-redux'
import { cartSlice } from '../../slices/cartSlice'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const d = useSelector(state => state.cart)
  const dispatch = useDispatch()
  console.log(d.cartItems)

  const handleCheckout = async() => {
    let res = await axios.post('/checkout/create-checkout-session', {cartItems: d.cartItems})
    .then((res) => {console.log(res.data); window.location.href = res.data.url})
    .catch(err => console.log(err))
    return false
  }


  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

  return (
    <div className='cartContainer'>
      <h1 style={{ marginBottom: "30px", textAlign: "center", fontWeight: "900", fontSize: "40px" }}>Shopping Cart</h1>

      {d.cartItems.length === 0 ? <div className='cartEmpty' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img style={{ width: "25rem", margin: "auto" }} src="https://visualpharm.com/assets/63/Clear%20Shopping%20Cart-595b40b65ba036ed117d4376.svg" alt="" />
        <div style={{ fontSize: "30px", fontWeight: "900", textAlign: "center" }}>Uh Oh ! Your Cart is Empty </div>
      </div> : <div className="cartItems">
        {d.cartItems.map((item) => {
          return (
            <>
              <div className="cartItem">
                <div className="cartItemImg">
                  <img src={item.img} alt="" />
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <Desktop>
                    <div className="cartItemDetails">
                      <div className="cartItemName">{item.name}</div>
                      <div className="cartItemPrice">₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(parseInt(item.price))}</div>
                      <div className="cartItemQuantity">Quantity: {item.quantity}</div>
                    </div>
                    <div className="cartItemDelete">
                      <button onClick={() => { dispatch(cartSlice.actions.deleteFromCart({ item: item, quantity: 1 })); toast.success("Deleted Successfully") }}>Delete</button>
                    </div>
                  </Desktop>
                  <Mobile>
                    <div className="mobileFlex">
                      <div className="cartItemDetails">
                        <div className="cartItemName">{item.name}</div>
                        <div className="cartItemPrice">Rs. {item.price}</div>
                        <div className="cartItemQuantity"><b>Quantity:</b> {item.quantity}</div>
                      </div>
                      <div className="cartItemDelete">
                        <DeleteIcon className='delete' onClick={() => { dispatch(cartSlice.actions.deleteFromCart({ item: item, quantity: 1 })); toast.success("Deleted Successfully") }}>Delete</DeleteIcon>
                      </div>
                    </div>
                  </Mobile>
                </div>
              </div>
              <hr />
            </>
          )
        })}
      </div>}
      <div className="cartCheckout">
        <div className='checkoutBox'>
          <div style={{ fontSize: "1.4rem", marginBottom: "0.9rem" }}>Subtotal ({d.cartTotalQuantity} items) : <b>₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(parseInt(d.cartTotalPrice))}</b></div>
          <button className='checkoutButton' onClick={handleCheckout} >Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart