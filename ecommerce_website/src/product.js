import React from 'react'
import {AiOutlineCloseCircle, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsEye} from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import ProductDetail from './productdetail'
import './product.css' 


const Product = ({product,setProduct,detail,view,close,setClose,addtocart}) => {
    
    const filterproduct=(product)=>{
        const update=ProductDetail.filter((x)=>{
            return x.Cat===product;
        })
        setProduct(update)
    }

    const AllProducts=()=>{
        setProduct(ProductDetail)
    }


  return (
         <>
          { close?
           <div className='product_detail'>
              <div className='container'>
                <button onClick={()=>setClose(false)}><AiOutlineCloseCircle/></button>
                {
                    detail.map((curElm)=>{
                        return (
                            <div className='productbox'>
                                <div className='img-box'>
                                    <img src={curElm.Img} alt={curElm.Title}></img>
                                </div>
                                <div className='detail'>
                                    <h4>{curElm.Cat}</h4>
                                    <h2>{curElm.Title}</h2>
                                    <p>A Screen Everyone will love</p>
                                    <h3>${curElm.Price}</h3>
                                    <button onClick={()=>addtocart(curElm)}>Add to Cart</button>
                                </div>
                            </div>

                        )
                    })
                }
                <div className='productbox'>

                </div>
              </div>
           </div>:null
     } 
           <div className='products'>
           <h2># Products</h2>
            <div className='container'>
                <div className='filter'>
                    <div className='categories'>
                        <h3>Categories</h3>
                        <ul>
                            <li onClick={()=>AllProducts()}>All Products</li>
                            <li onClick={()=>filterproduct("Tablet")}>Tablet</li>
                            <li onClick={()=>filterproduct("Smart Watch")}>Smart Watch</li>
                            <li onClick={()=>filterproduct("Headphone")}>Headphone</li>
                            <li onClick={()=>filterproduct("Camera")}>Camera</li>
                            <li onClick={()=>filterproduct("Gaming")}>Gaming</li>
                            <li onClick={()=>filterproduct("Electronics")}>Electronics</li>
                        </ul>
                    </div>
                </div>
                <div className='productbox'>
                        <div className='contant'>
                            {
                                product.map((curElm)=>{
                                    return(
                                        <>
                                        <div className='box' key={curElm.id}>
                                            <div className='img_box'>
                                                <img src={curElm.Img} alt={curElm.Title}></img>
                                                <div className='icon'>
                                                    <li onClick={()=>addtocart(curElm)}><AiOutlineShoppingCart/></li>
                                                    <li onClick={()=>view(curElm)}><BsEye/></li>
                                                    <li><AiOutlineHeart/></li>
                                                </div>
                                            </div>
                                            <div className='detail'>
                                                <p>{curElm.Cat}</p>
                                                <h3>{curElm.Title}</h3>
                                                <h4>${curElm.Price}</h4>
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
           </div>

         </>
  )
}

export default Product