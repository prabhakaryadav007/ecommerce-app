import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'

const Nav = () => {
  return (
     <>
       
        <div className='main_header'>
            <div className='container'>
                <div className='logo'>
                    <img src='./img/logo.svg' alt='logo'></img>
                </div>
             
                <div className='icon'>
                   <div className='second_icon'>
                    <Link to="/cart" className='link'><img src='./img/cart.svg' alt='cart'></img></Link>
                   </div>
                </div>
            </div>
        </div>
        <div className='header'>
          <div className='container'>
            <div className='nav'>
            <ul>
                <li>
                    <Link to='/' className='link'>All Product</Link>
                </li>
             </ul>
            </div>
          </div>
             
        </div>

     </>
  )
}

export default Nav