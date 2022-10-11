import React, { useEffect } from 'react'
import { useState } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';

import { padding } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {

    const [isScrolled, setScrolled] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const d = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    console.log({ qty: cart.cartTotalQuantity })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartObject = useSelector(state => state.cart)
    const [hamOpen, setHamOpen] = useState(false)

    console.log(window.location.pathname);

    useEffect(() => {
        if (isOpen == true) {
            if (isOpen2 == true) {
                setOpen(false)
                setOpen2(true)
            }
        }
        if (isOpen2 == true) {
            if (isOpen == true) {
                setOpen2(false)
                setOpen(true)
            }
        }

    }, [isOpen, isOpen2])

    const signout = () => {
        localStorage.clear()
        dispatch(logOut())
        navigate('/login')
    }

    const scrolled = () => {
        // console.log(window.scrollY)
        if (window.scrollY > 30) {
            setScrolled(true)
        }
        else {
            setScrolled(false)
        }
    }


    let activeStyle = {
        textDecoration: "underline"
    };

    const handleOpen = () => {
        setHamOpen(!hamOpen)
    }

    window.addEventListener('scroll', scrolled)

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
        <div className={isScrolled ? "Nav active" : "Nav"} >
            <Desktop>
                <div className="navName">Shop</div>
                <div className="list">
                    <div className="item"> <NavLink to='/'  >Home</NavLink> </div>
                    <div className="item"> <NavLink to='/shop' >Shop</NavLink> </div>
                    <div className="item"> <NavLink to='/contact'>Contact</NavLink> </div>
                    <div className="item"  ><NavLink to='/cart'>
                        <Badge badgeContent={cartObject.cartTotalQuantity} color="error">
                            <ShoppingBagIcon className='cartIcon' />
                        </Badge>
                    </NavLink>
                    </div>
                    {d.isLoggedIn ?
                        <div className="item"  >
                            <AccountCircleIcon onClick={() => setOpen2(!isOpen2)} />
                            {isOpen2 &&
                                <div style={{ transition: "0.5s" }} className="account">
                                    <p>Hi, {d.userObject.firstName}</p>
                                    <hr />
                                    <NavLink to='/profile'>My Profile</NavLink>
                                    <hr />
                                    <div className="signOut">
                                        <p onClick={signout} >Sign Out  </p>
                                        <LogoutIcon className='logoutIcon' />
                                    </div>
                                </div>
                            }
                        </div>
                        : <div className="item"> <NavLink to='/login'>Login</NavLink> </div>

                    }
                </div>
            </Desktop>
            <Mobile className="mobile">
                <div className="navName">Shop</div>
                { hamOpen && <div className="backdrop"  ></div>}
                <a onClick={handleOpen}>{hamOpen ? <></>: <MenuIcon />}</a>
                <div className={hamOpen ? "menuContainer-active" : "menuContainer"} >
                    <div className="menu">
                        <div className="close" onClick={handleOpen}><CloseIcon /></div>
                        <div className="item"  > <NavLink to='/'  >Home</NavLink> </div>
                        <div className="item"> <NavLink to='/shop' >Shop</NavLink> </div>
                        <div className="item"> <NavLink to='/contact'>Contact</NavLink> </div>
                        <div className="item"  ><NavLink to='/cart'>
                            <Badge badgeContent={cartObject.cartTotalQuantity} color="error">
                                <ShoppingBagIcon className='cartIcon' />
                            </Badge>
                        </NavLink>
                        </div>
                    </div>
                    
                </div>
                { window.location.pathname == '/shop' && <div className="mobileCart">
                    <NavLink to='/cart'>
                        <Badge badgeContent={cartObject.cartTotalQuantity} color="error">
                            <ShoppingBagIcon className='cartIcon' />
                        </Badge>
                    </NavLink>
                </div>}
            </Mobile>
        </div>
    )
}

export default Navbar