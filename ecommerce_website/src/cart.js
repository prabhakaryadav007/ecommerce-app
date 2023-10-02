import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import './cart.css'

const Cart = ({cart,setCart}) => {
//   console.log(cart)
  // increase qty
  const incqty=(product)=>{
     const exist=cart.find((x)=>{
        return x.id===product.id
     })
     setCart(cart.map((curElm)=>{
        return curElm.id===product.id?{...exist,qty:exist.qty+1}:curElm
     }))
  }

  const decqty=(product)=>{
    const exist=cart.find((x)=>{
        return x.id===product.id
     })
     if(exist.qty>1){setCart(cart.map((curElm)=>{
        return curElm.id===product.id?{...exist,qty:exist.qty-1}:curElm
     }))
    }
  }

  //Remove
  const removeproduct=(product)=>{
      const exist=cart.find((x)=>{
        return x.id===product.id
      })
      if(exist.qty>0){
          setCart(cart.filter((x)=>{
            return x.id !== product.id
          }))
      }
  }

  // total price
  const Totalprice=cart.reduce((price,item)=>price+item.qty*item.Price,0)

  // payment integration

  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51NwTdgSCs3atpUEv8qB8kU1lpyxgaBOaGt74OUTyzWKkcvZpViy2SaDyXwFIXMRpNCtaUV10xGilAGXgJzjgN3zu00kPHjNS0i");
    const body = {
        products:cart
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:7000/create-checkout-session",{
        method:"post",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}


  return (
    <>
     <div className='cartcontainer'>
        {cart.length===0 &&
         <div className='emptycart'>
         <h2 className='empty'>Cart is Empty</h2>
         <Link to='/' className='emptycartbtn'>Shop Now</Link>
         </div>
         }
        <div className='contant'>
            {
                cart.map((curElm)=>{
                    return (
                        <div className='cart_item' key={curElm.id}>
                            <div className='img_box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                                <div className='info'>
                                <h4>{curElm.Cat}</h4>
                                <h3>{curElm.Title}</h3>
                                <p>${curElm.Price}</p>
                                <div className='qty'>
                                    <button className='incqty' onClick={()=>incqty(curElm)}>+</button>
                                    <input type='text' value={curElm.qty}></input>
                                    <button className='decqty' onClick={()=>decqty(curElm)}>-</button>
                                </div>
                                <h4>sub total:{curElm.Price*curElm.qty}</h4>
                                </div>
                                <div className='close'>
                                <button onClick={()=>removeproduct(curElm)}><AiOutlineClose/></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div>
                {
                    cart.length>0 && 
                    <>
                     <h2 className='totalprice'>Total cost:${Totalprice}</h2>
                     <button className='checkout' onClick={makePayment}>Payment</button>
                    </>
                }
            </div>
        </div>
     </div>

    </>
  )
}

export default Cart