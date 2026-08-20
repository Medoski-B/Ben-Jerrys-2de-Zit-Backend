const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


const Order = mongoose.model(
    'Order',
    new mongoose.Schema({
        customer: {
            name: String,
            address: String,
            email: String
        },

        iceCream: {
            flavour: String,
            topping: String,
            sauce: String
        },

        price: Number,

        status: {
            type: String,
            default: 'te verwerken'
        },

        createdAt: String
    }),
    'orders'
);


const response = (res, data, msg = 'success') =>
    res.json({
        status: 'success',
        message: msg,
        data
    });


app.get('/', (req, res) => {
    res.send("Ben & Jerry API");
});


app.get('/api/v1/orders', async (req, res) => {

    const orders = await Order.find();

    response(res, {
        orders
    });

});


app.get('/api/v1/orders/:id', async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            status: 'fail',
            message: 'Order not found'
        });
    }

    response(res, {
        order
    });

});


app.post('/api/v1/orders', async (req, res) => {


    const order =
        await Order.create(
            req.body
        );



    response(

        res,

        {

            order,

            orderId:
                order._id

        },

        'Order saved'

    );


});


app.put('/api/v1/orders/:id', async (req, res) => {

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

    response(
        res,
        {
            order
        },
        'Order updated'
    );

});


app.delete('/api/v1/orders/:id', async (req, res) => {

    await Order.findByIdAndDelete(req.params.id);

    response(
        res,
        {
            id: req.params.id
        },
        'Order deleted'
    );

});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo connected");
    })
    .catch((error) => {
        console.log("Mongo error:", error);
    });



app.listen(
    process.env.PORT || 3000,
    () => console.log("API running")
);
