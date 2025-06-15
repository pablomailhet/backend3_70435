import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de products", () => {

    const getProduct = (nro, category) => {
        const objProduct = {
            title: "Title producto " + nro,
            description: "Descripcion producto " + nro,
            code: "codpro" + nro,
            price: nro * 10,
            stock: nro + 10,
            category: category
        };
        return objProduct;
    }

    const testUser = {
        first_name: "FN Test Product",
        last_name: "LN Test Product",
        email: "testproduct@coder.com",
        password: "coder1234"
    };

    let cookiesAdmin;
    let cookiesUser;
    let userId;
    const productsId = [];

    // Login como admin
    before(async () => {
        const response = await requester.post("/sessions/login").send({
            email: "admin@coder.com",
            password: "coder1234",
        });
        const { headers } = response;
        cookiesAdmin = headers["set-cookie"];
    });

    it("POST /api/products status 201 al crear un producto con credenciales de tipo admin", async () => {
        const newProduct = getProduct(1, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(201);
    });

    //Sin inicio de session
    it("GET /api/products devuelve 401 al intentar leer todos los productos sin credenciales", async () => {
        const response = await requester.get("/products");
        const { status } = response;
        expect(status).to.be.equals(401);
    });

    it("GET /api/products/:pid devuelve 401 al buscar un producto por id sin credenciales", async () => {
        const response = await requester.get("/products/" + productsId[0]);
        const { status } = response;
        expect(status).to.be.equals(401);
    });

    it("POST /api/products devuelve 401 al intentar crear un producto sin credenciales", async () => {
        const newProduct = getProduct(2, "varios");
        const response = await requester.post("/products").send(newProduct);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(401);
    });

    it("PUT /api/products devuelve 401 al intentar actualizar un producto sin credenciales", async () => {
        const updatedProduct = getProduct(3, "varios_mod");
        const response = await requester.put("/products/" + productsId[0]).send(updatedProduct);
        const { status } = response;
        expect(status).to.be.equals(401);
    });

    it("DELETE /api/products/:pid devuelve 401 al intentar borrar un producto sin credenciales", async () => {
        const response = await requester.delete("/products/" + productsId[0]);
        const { status } = response;
        expect(status).to.be.equals(401);
    });






    //login con usuario de tipo user
    it("POST /api/sessions/register crea un nuevo usuario de tipo user", async () => {
        const response = await requester.post("/sessions/register").send(testUser);
        const { status, _body } = response;
        userId = _body._id;
        expect(status).to.be.equals(201);
    });

    it("POST /api/sessions/login tiene exito el inicio de sesión con un usuario de tipo user", async () => {
        const response = await requester.post("/sessions/login").send({
            email: testUser.email,
            password: testUser.password
        });
        const { status, headers } = response;
        cookiesUser = headers["set-cookie"];
        expect(status).to.be.equals(200);
    });

    it("GET /api/products devuelve 200 al intentar leer todos los productos con credenciales de tipo user", async () => {
        const response = await requester.get("/products").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/products devuelve productos en la propiedad products.docs con credenciales de tipo user", async () => {
        const response = await requester.get("/products").set("Cookie", cookiesUser);
        const { _body } = response;
        expect(_body.products).to.have.property("docs");
    });

    it("GET /api/products/:pid devuelve 200 al buscar un producto por id con credenciales de tipo user", async () => {
        const response = await requester.get("/products/" + productsId[0]).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/products/:pid devuelve un producto en la propiedad product con credenciales de tipo user", async () => {
        const response = await requester.get("/products/" + productsId[0]).set("Cookie", cookiesUser);
        const { _body } = response;
        expect(_body).to.have.property("product");
    });

    it("GET /api/products/:pid devuelve 404 al buscar un producto por id que no existe con credenciales de tipo user", async () => {
        const response = await requester.get("/products/6848918dc7a3469ce2442c6e").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("POST /api/products devuelve 403 al intentar crear un producto con credenciales de tipo user", async () => {
        const newProduct = getProduct(4, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesUser);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(403);
    });

    it("PUT /api/products devuelve 403 al intentar actualizar un producto con credenciales de tipo user", async () => {
        const updatedProduct = getProduct(5, "varios_mod");
        const response = await requester.put("/products/" + productsId[0]).send(updatedProduct).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });

    it("DELETE /api/products/:pid devuelve 403 al intentar borrar un producto con credenciales de tipo user", async () => {
        const response = await requester.delete("/products/" + productsId[0]).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });



    //login con usuario de tipo admin
    it("GET /api/products devuelve 200 al intentar leer todos los productos con credenciales de tipo user", async () => {
        const response = await requester.get("/products").set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/products devuelve productos en la propiedad products.docs con credenciales de tipo user", async () => {
        const response = await requester.get("/products").set("Cookie", cookiesAdmin);
        const { _body } = response;
        expect(_body.products).to.have.property("docs");
    });

    it("GET /api/products/:pid devuelve 200 al buscar un producto por id con credenciales de tipo user", async () => {
        const response = await requester.get("/products/" + productsId[0]).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/products/:pid devuelve un producto en la propiedad product con credenciales de tipo user", async () => {
        const response = await requester.get("/products/" + productsId[0]).set("Cookie", cookiesAdmin);
        const { _body } = response;
        expect(_body).to.have.property("product");
    });

    it("POST /api/products devuelve 'Product added' en la propiedad message con credenciales de tipo admin", async () => {
        const newProduct = getProduct(6, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(_body).to.have.property("message");
        expect(_body.message).to.be.equals("Product added");
    });

    it("POST /api/products devuelve el objeto product con credenciales de tipo admin", async () => {
        const newProduct = getProduct(7, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(_body).to.have.property("product");
        expect(_body.product).to.include({
            title: newProduct.title,
            description: newProduct.description,
            code: newProduct.code,
            price: newProduct.price,
            stock: newProduct.stock,
            category: newProduct.category
        });
    });

    it("PUT /api/products devuelve 200 al actualizar un producto con credenciales de tipo admin", async () => {
        const updatedProduct = getProduct(8, "varios_999");
        const response = await requester.put("/products/" + productsId[0]).send(updatedProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        expect(status).to.be.equals(200);
    });

    it("DELETE /api/products/:pid devuelve 200 al borrar todos los productos creados con credenciales de tipo admin", async () => {
        for (const productId of productsId) {
            const response = await requester.delete("/products/" + productId).set("Cookie", cookiesAdmin);
            const { status } = response;
            expect(status).to.be.equals(200);
        }
    });

    it("GET /api/products/:pid devuelve 404 al buscar un producto por id que no existe con credenciales de tipo admin", async () => {
        const response = await requester.get("/products/" + productsId[0]).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("DELETE /api/users/:uid status 200 al borrar un usuario con credenciales de tipo admin", async () => {
        const response = await requester.delete("/users/" + userId).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

});