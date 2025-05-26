const express = require('express')
const router = express.Router()
const connection = require('../config/db')

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'API Calling...' })
})


router.post("/addtocart", async (req, res) => {
    console.log('req.body:', req.body);
    const { product_id, title, price, image } = req.body;

    try {
        const [added] = await connection.execute(`select * from products where product_id = ${product_id}`);
        if (added.length > 0) {
            return res.status(409).json({ error: "Product already present in cart" });
        }

        const sql = `insert into products(product_id, title, price, image) values ('${product_id}','${title}','${price}','${image}')`;
        await connection.execute(sql);
        
        res.status(201).json({ success: true, message: "Product added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product in cart" });
    }
});

router.get('/cartproducts', async (req, res) => {
    try {
        const [result] = await connection.execute("select * from products");

        const total = result.reduce((acc, item) => acc + parseFloat(item.price), 0);

        res.json({ cartItems: result, totalPrice: total });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/deleteproduct/:id', async (req, res) => {
    const { id } = req.params;
    try {
    await connection.execute(`delete from products where product_id = ${id}`);
        res.json({ success: true, message: "Removed from cart" });
        console.log("Removed product from cart:", id);
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});


module.exports = router;
