import "dotenv/config.js";
import assert from "assert";

import { connectDB } from "../../src/helpers/db.helper.js";
import productModel from "../../src/models/products.model.js";

describe("TESTING: Products", () => {

    let productsId = [];

    before(async () => {
        await connectDB();
    });

    it("No debe crear un producto cuando faltan datos", async () => {
        try {
            const product = await productModel.create({
                title: "Producto de prueba"
            });
        }
        catch (error) {
            assert.ok(error.message);
        }
    });

    it("Se debe crear un producto correctamente", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 01",
            description: "Descripcion del producto de prueba 01",
            code: "CodProdPrueba01",
            price: 1111.11,
            stock: 11,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(product._id);
    });

    it("Se debe crear un producto correctamente con un title de tipo string", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 02",
            description: "Descripcion del producto de prueba 02",
            code: "CodProdPrueba02",
            price: 2222.22,
            stock: 12,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.title === "string", "Title no es de tipo string");
    });

    it("Se debe crear un producto correctamente con una description de tipo string", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 03",
            description: "Descripcion del producto de prueba 03",
            code: "CodProdPrueba03",
            price: 3333.33,
            stock: 13,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.description === "string", "Description no es de tipo string");
    });

    it("Se debe crear un producto correctamente con un code de tipo string", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 04",
            description: "Descripcion del producto de prueba 04",
            code: "CodProdPrueba04",
            price: 4444.44,
            stock: 14,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.code === "string", "Code no es de tipo string");
    });

    it("Se debe crear un producto correctamente con un price de tipo number", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 05",
            description: "Descripcion del producto de prueba 05",
            code: "CodProdPrueba05",
            price: 5555.55,
            stock: 15,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.price === "number", "Price no es de tipo number");
    });

    it("Se debe crear un producto correctamente con un stock de tipo number entero", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 06",
            description: "Descripcion del producto de prueba 06",
            code: "CodProdPrueba06",
            price: 6666.66,
            stock: 16,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(Number.isInteger(product.stock), "Stock no es un número entero");
    });

    it("Se debe crear un producto correctamente con una category de tipo string", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 07",
            description: "Descripcion del producto de prueba 07",
            code: "CodProdPrueba07",
            price: 7777.77,
            stock: 17,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.category === "string", "Category no es un string");
    });

    it("Se debe crear un producto correctamente con status de tipo boolean", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 08",
            description: "Descripcion del producto de prueba 08",
            code: "CodProdPrueba08",
            price: 8888.88,
            stock: 18,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(typeof product.status === "boolean", "Status no es un boolean");
    });

    it("Se debe crear un producto correctamente con status por defecto en true", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 09",
            description: "Descripcion del producto de prueba 09",
            code: "CodProdPrueba09",
            price: 9999.99,
            stock: 19,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(product.status === true, "Status por defecto no es true");
    });

    it("Se debe crear un producto correctamente con thumbnails por defecto array vacio", async () => {
        const product = await productModel.create({
            title: "Producto de prueba 10",
            description: "Descripcion del producto de prueba 10",
            code: "CodProdPrueba10",
            price: 101010.10,
            stock: 100,
            category: "Varios"
        });
        productsId.push(product._id);
        assert.ok(Array.isArray(product.thumbnails),"thumbnails no es un array");
        assert.ok(product.thumbnails.length === 0, "thumbnails no está vacio");
    });

    it("Se debe buscar un producto por id en la base de datos", async () => {
        const product = await productModel.findById(productsId[8]);
        assert.ok(product, "El producto no fue encontrado");
    });

    it("Debe actualizar correctamente el campo price de un producto", async () => {
        const newPrice = 9090.90;
        const updated = await productModel.findByIdAndUpdate(
            productsId[8],
            { price: newPrice },
            { new: true }
        );
        assert.ok(updated, "No se encontró el producto para actualizar");
        assert.strictEqual(updated.price, newPrice, "El precio no fue actualizado correctamente");
    });

    it("Debe actualizar múltiples campos de un producto", async () => {
        const updatedData = {
            title: "Producto de prueba 09 - actualizado",
            stock: 90,
            category: "Actualizados"
        };

        const updated = await productModel.findByIdAndUpdate(
            productsId[8],
            updatedData,
            { new: true }
        );

        assert.ok(updated, "No se encontró el producto para actualizar");
        assert.strictEqual(updated.title, updatedData.title);
        assert.strictEqual(updated.stock, updatedData.stock);
        assert.strictEqual(updated.category, updatedData.category);
    });

    it("Se debe buscar un producto por title en la base de datos", async () => {
        const product = await productModel.findOne({ title: "Producto de prueba 05" });
        assert.ok(product, "El producto no fue encontrado por el título: Producto de prueba 05");
    });

    it("No debe encontrar un producto que no existe", async () => {
        const product = await productModel.findOne({ title: "Producto de prueba 09" });
        assert.strictEqual(product, null, "El producto fue encontrado, pero no debería existir");
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[0]);
        const product = await productModel.findById(productsId[0]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[1]);
        const product = await productModel.findById(productsId[1]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[2]);
        const product = await productModel.findById(productsId[2]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[3]);
        const product = await productModel.findById(productsId[3]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[4]);
        const product = await productModel.findById(productsId[4]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[5]);
        const product = await productModel.findById(productsId[5]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[6]);
        const product = await productModel.findById(productsId[6]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[7]);
        const product = await productModel.findById(productsId[7]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[8]);
        const product = await productModel.findById(productsId[8]);
        assert.strictEqual(product, null)
    });

    it("Se debe eliminar un producto de la base de datos", async () => {
        await productModel.findByIdAndDelete(productsId[9]);
        const product = await productModel.findById(productsId[9]);
        assert.strictEqual(product, null)
    });

});