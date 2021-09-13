import express from "express"
import mongoose from "mongoose"
import "./db-connect.js" // connect to database
import Customer from "./models/Costumer.js"
import Order from "./models/Order.js"

const app = express()

// ROUTES
app.get('/', (req, res) => {
    res.send(`<h1>Hello from Pizza API</h1>
    <p><a href="/customers">/customers</a></p>
    <p><a href="/orders">/orders</a></p>`);
});

app.get('/customers', async (req, res, next) => {
    try {
        const customers = await Customer.find() // please fetch the customers from your database here, por favor!
        if (!customers) throw new Error(400, "No customers found");
        res.json(customers)
    } catch (error) {
        next(error)
    }
})

app.get('/orders', async (req, res, next) => {
    try {
        const orders = await Order.find() // please fetch the customers from your database here, por favor!
        if (!orders) throw new Error(400, "No orders found");
        res.json(orders)
    } catch (error) {
        next(error)
    }
})

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message
        }
    })
})

// STARTP API
const port = 5000
app.listen(port, () => {
    console.log('Server started on port ' + port + " 💪");
    console.log(`http://localhost:${port}`);
});