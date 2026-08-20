const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();



app.use(
    cors({
        origin: "*"
    })
);


app.use(
    express.json()
);



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




const response = (
    res,
    data,
    msg = 'success'
) => {


    res.json({

        status: 'success',

        message: msg,

        data

    });


};




app.get(
    '/',
    (req, res) => {


        res.send(
            "Ben & Jerry API"
        );


    }
);





app.get(
    '/api/v1/orders',

    async (req, res) => {


        try {


            const orders =
                await Order.find();



            response(

                res,

                {
                    orders
                }

            );


        }


        catch (error) {


            res.status(500).json({

                status: "error",

                message: error.message

            });


        }


    }

);





app.get(

    '/api/v1/orders/:id',

    async (req, res) => {


        try {


            const order =
                await Order.findById(
                    req.params.id
                );



            if (!order) {


                return res.status(404).json({

                    status: "fail",

                    message:
                        "Order not found"

                });


            }



            response(

                res,

                {
                    order
                }

            );


        }


        catch (error) {


            res.status(500).json({

                status: "error",

                message: error.message

            });


        }


    }

);





app.post(

    '/api/v1/orders',

    async (req, res) => {


        try {


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

                "Order saved"

            );


        }


        catch (error) {


            res.status(500).json({

                status: "error",

                message: error.message

            });


        }


    }

);






app.put(

    '/api/v1/orders/:id',

    async (req, res) => {


        try {


            const order =
                await Order.findByIdAndUpdate(

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

                "Order updated"

            );


        }


        catch (error) {


            res.status(500).json({

                status: "error",

                message: error.message

            });


        }


    }

);






app.delete(

    '/api/v1/orders/:id',

    async (req, res) => {


        try {


            await Order.findByIdAndDelete(

                req.params.id

            );



            response(

                res,

                {
                    id: req.params.id
                },

                "Order deleted"

            );


        }


        catch (error) {


            res.status(500).json({

                status: "error",

                message: error.message

            });


        }


    }

);





async function startServer() {


    try {


        await mongoose.connect(

            process.env.MONGO_URI

        );


        console.log(
            "Mongo connected"
        );



        app.listen(

            process.env.PORT || 3000,

            () => {


                console.log(
                    "API running"
                );


            }

        );


    }


    catch (error) {


        console.log(

            "Mongo error:",

            error

        );


    }


}



startServer();