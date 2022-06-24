import React from 'react'
import './Home.scss'
import shopPic from "../../Assets/shop.png"
import { NavLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  return (
    <div className='Home'>
        <div className="leftContainer">
            <div className="heading">
                <h1>Anytime</h1>
                <h1>Anyplace.</h1>
            </div>
            <div className="para">We work with global brands and have created an application for you to do your shopping</div>
            <div className="button">
                <button> <NavLink to="/shop">Shop Now</NavLink> <div className="next"> <ArrowForwardIcon /> </div> </button>
            </div>
        </div>
        <div className="rightContainer">
            <img src={shopPic} alt="" />
        </div>
    </div>
  )
}

export default Home