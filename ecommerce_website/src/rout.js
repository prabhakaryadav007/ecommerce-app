import React from 'react'
import { Routes, Route} from 'react-router-dom'
// import Home from './home'
import Product from './product'
import Cart from './cart'
import Success from './success'
import Cancel from './cancel'

const Rout = ({product,setProduct,detail,view,close,setClose,cart,setCart,addtocart}) => {
  return (
    <Routes>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path='/' element={<Product product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
    </Routes>
  )
}

export default Rout