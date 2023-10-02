const express=require("express")
const app=express()
const cors=require("cors")
const stripe=require("stripe")("sk_test_51NwTdgSCs3atpUEveWA4h59trClaC6p5xKYg4iOIePZDMhKZLpwUeUUASTF7wvBjZkeqvboxLdREirN624LKrTWj00El1seVmm")

app.use(express.json())
app.use(cors())

//checkput api
app.post('/create-checkout-session',async(req,res)=>{
    // console.log(req)
    const {products}=req.body
    // console.log(products)
    const lineItems=products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.Title
            },
            unit_amount:product.Price*100,   
        },
        quantity:product.qty
    }))

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    })

    res.json({id:session.id})
    
})


app.listen(7000,()=>{
    console.log("server start")
})
