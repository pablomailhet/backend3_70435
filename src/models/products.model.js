import { Schema, model } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: [true, "Código repetido"]
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: value => value > 0,
            message: 'Debe ingresar un número mayor a 0'
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: value => value > 0,
            message: 'Debe ingresar un número mayor a 0'
        }
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [String],
        default: []
    }
});

productSchema.plugin(mongoosePaginate);

const productModel = model(productCollection, productSchema);

export default productModel;