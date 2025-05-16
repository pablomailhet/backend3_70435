import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }],
        default: []
    }
});

cartSchema.pre("findOne", function () {
    this.populate("products.product");
});

const cartsModel = model(cartCollection, cartSchema);

export default cartsModel;