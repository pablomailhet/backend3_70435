import cartModel from "../models/carts.model.js";
import ticketModel from "../models/tickets.model.js";
import productModel from "../models/products.model.js";

export const getCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        res.status(200).json({ status: "success", cart });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const insertProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        let quantity = parseInt(req.body.quantity) || 1;
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error("Invalid quantity");
        }

        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        if (!await productModel.findById(pid)) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        const products = cart.products;

        const product = products.find(item => item.product.id === pid);

        if (product) {
            product.quantity += quantity;
        }
        else {
            const product = {
                product: pid,
                quantity
            };
            products.push(product);
        }

        await cart.save();

        res.status(201).json({ status: "success", message: "Product added in cart" });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteProductCart = async (req, res) => {

    try {

        const { cid, pid } = req.params;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { "product": pid } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        res.status(200).json({ status: "success", message: "Product deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).json({ status: "error", message: error.message });

    }
}

export const deleteCart = async (req, res) => {
    try {

        const { cid } = req.params;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        res.status(200).json({ status: "success", message: "All products deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).json({ status: "error", message: error.message });

    }
}

export const checkout = async (req, res) => {
    try {

        const prodSinStock = [];
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        if (cart.products.length === 0) {
            return res.status(404).json({ status: "error", message: "Products is empty" });
        }

        //Verificar que todos los productos tengan stock suficiente
        for (const prod of cart.products) {
            let producto = await productModel.findById(prod.product);
            if (producto) {
                if (producto.stock - prod.quantity < 0) {
                    prodSinStock.push(producto.id);
                }
            }
        }

        if (prodSinStock.length === 0) { //Si todos los productos pueden comprarse continuo con la compra
            let totalAmount = 0;

            //Descuento el stock de cada producto y voy calculando el total de compra
            for (const prod of cart.products) {
                const producto = await productModel.findById(prod.product);
                if (producto) {
                    producto.stock -= prod.quantity;
                    totalAmount += producto.price * prod.quantity;
                    await producto.save();
                }
            }

            const newTicket = await ticketModel.create({
                code: crypto.randomUUID(),
                amount: totalAmount,
                purchaser: req.user.email,
                products: cart.products
            });

            await cartModel.findByIdAndUpdate(cid, { products: [] });
            res.status(200).json({ status: "success", ticket: newTicket });
        }
        else {
            //Saco los productos sin stock del carrito
            prodSinStock.forEach((prodId) => {
                let indice = cart.products.findIndex(prod => prod.id == prodId);
                cart.products.splice(indice, 1);
            })
            //Actualizo mi carrito en la BDD
            await cartModel.findByIdAndUpdate(cid, {
                products: cart.products
            });
            res.status(400).json({ status: "error", message: "Productos sin stock", prodSinStock: prodSinStock });
        }

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}