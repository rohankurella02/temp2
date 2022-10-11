const { request } = require('express');
const exp = require('express');
const stripe = require("stripe")("sk_test_51Kw3dBSEuke3pX52hPFvT5xS8I150EQSMuLxe6WNQzbvWmfdLgnSAJMDhUWboKQgGqwkHCJ89j6UWyXuei2YXLPS007vhkDcJA")

const expressAsyncHandler = require('express-async-handler');
const checkoutApp = exp.Router();

checkoutApp.use(exp.json());

checkoutApp.get('', (req, res) => {
    res.send({message: "Checkout API"});
})

checkoutApp.post('/create-checkout-session', expressAsyncHandler(async (req, res) => {
    let cartItems = req.body.cartItems;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartItems.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        
                        name: item.name,
                        images: [item.img]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        }),
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    try {
        res.send({ id: session.id, url: session.url });
    }
    catch (err) {
        res.send({err});
    }
    // res.send({message: "Checkout API", payload: req.body});

}))



module.exports = checkoutApp;