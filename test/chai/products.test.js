import "dotenv/config.js";
import { expect } from "chai";

import { connectDB } from "../../src/helpers/db.helper.js";
import productModel from "../../src/models/products.model.js";

describe("TESTING: Products", () => {

    let productsId = [];

    before(async () => {
        await connectDB();
    });

    const createMockProduct = (nro) => ({
        title: "Producto de prueba " + nro,
        description: "Descripción del producto " + nro,
        code: "Code_" + nro,
        price: 100 * nro,
        stock: 10 + nro,
        category: "Varios"
    });

    //---------------Create-------------------------------------------------------------------------------------------
    it("Debe fallar al crear un producto cuando faltan campos obligatorios", async () => {
        try {
            const product = await productModel.create({
                title: "Producto de prueba"
            });
        }
        catch (error) {
            expect(error).to.have.property("message");
        }
    });

    it("Debe crear un producto y devolver su _id", async () => {
        const response = await productModel.create(createMockProduct(1));
        productsId.push(response._id);
        expect(response).to.have.property("_id");
    });

    it("Debe devolver un _id del tipo object al crear un producto", async () => {
        const response = await productModel.create(createMockProduct(2));
        productsId.push(response._id);
        expect(response._id).to.be.a("object");
    });

    it("Debe incluir la propiedad 'stock' en el producto creado", async () => {
        const response = await productModel.create(createMockProduct(3));
        productsId.push(response._id);
        expect(response).to.have.property("stock");
    });

    it("Debe contener un campo 'stock' del tipo number", async () => {
        const response = await productModel.create(createMockProduct(4));
        productsId.push(response._id);
        expect(response.stock).to.be.a("number");
    });

    it("Debe incluir la propiedad 'price' en el producto creado", async () => {
        const response = await productModel.create(createMockProduct(5));
        productsId.push(response._id);
        expect(response).to.have.property("price");
    });

    it("Debe contener un campo 'price' del tipo number", async () => {
        const response = await productModel.create(createMockProduct(6));
        productsId.push(response._id);
        expect(response.price).to.be.a("number");
    });

    it("Debe incluir la propiedad 'status' en el producto creado", async () => {
        const response = await productModel.create(createMockProduct(7));
        productsId.push(response._id);
        expect(response).to.have.property("status");
    });

    it("Debe contener un campo 'status' del tipo boolean", async () => {
        const response = await productModel.create(createMockProduct(8));
        productsId.push(response._id);
        expect(response.status).to.be.a("boolean");
    });

    //---------------Find-------------------------------------------------------------------------------------------
    it("Debe recuperar todos los productos de la base de datos como un array", async () => {
        const products = await productModel.find();
        expect(Array.isArray(products)).to.be.true;
    });

    it("Debe devolver un array vacío si no encuentra coincidencias", async () => {
        const product = await productModel.find({ title: "QWERTY" });
        expect(product).to.have.lengthOf(0);
    });

    it("Debe recuperar un producto existente por su ID", async () => {
        const product = await productModel.findById(productsId[0]);
        expect(product).to.not.be.null;
        expect(product).to.have.property("title");
        expect(product).to.have.property("price");
    });

    it("Debe recuperar un producto existente por su título", async () => {
        const title = "Producto de prueba 1";
        const products = await productModel.find({ title });
        expect(products).to.be.an("array").that.is.not.empty;
        expect(products[0]).to.have.property("title", title);
    });

    //---------------Update-------------------------------------------------------------------------------------------
    it("Debe actualizar correctamente el campo 'price' de un producto", async () => {
        const newPrice = 9090.90;
        const updated = await productModel.findByIdAndUpdate(
            productsId[0],
            { price: newPrice },
            { new: true }
        );
        expect(updated.price).to.be.equals(newPrice);
    });

    //---------------Delete-------------------------------------------------------------------------------------------
    it("Debe eliminar correctamente el producto 1 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[0]);
        const product = await productModel.findById(productsId[0]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 2 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[1]);
        const product = await productModel.findById(productsId[1]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 3 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[2]);
        const product = await productModel.findById(productsId[2]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 4 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[3]);
        const product = await productModel.findById(productsId[3]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 5 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[4]);
        const product = await productModel.findById(productsId[4]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 6 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[5]);
        const product = await productModel.findById(productsId[5]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 7 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[6]);
        const product = await productModel.findById(productsId[6]);
        expect(product).to.be.a("null");
    });

    it("Debe eliminar correctamente el producto 8 de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[7]);
        const product = await productModel.findById(productsId[7]);
        expect(product).to.be.a("null");
    });

});