import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de carts", () => {

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

    let cookiesAdmin;
    let cookiesUser;
    let userId;
    let cartId;
    let ticket;
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

    //register user
    it("POST /api/sessions/register crea un nuevo usuario de tipo user.", async () => {
        const data = {
            first_name: "First Name 03",
            last_name: "Last Name 03",
            email: "flast03@coder.com",
            password: "coder1234",
        };
        const response = await requester.post("/sessions/register").send(data);
        const { status, _body } = response;
        userId = _body._id;
        expect(status).to.be.equals(201);
    });

    //login user
    it("POST /api/sessions/login tiene exito el inicio de sesión con un usuario de tipo user.", async () => {
        const response = await requester.post("/sessions/login").send({
            email: "flast03@coder.com",
            password: "coder1234",
        });
        const { status, headers } = response;
        cookiesUser = headers["set-cookie"];
        expect(status).to.be.equals(200);
    });

    it("POST /api/products status 201 al crear productos desde un usuario de tipo admin.", async () => {
        const newProduct = getProduct(10, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(201);
    });

    it("POST /api/products status 201 al crear productos desde un usuario de tipo admin.", async () => {
        const newProduct = getProduct(20, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(201);
    });

    it("POST /api/products status 201 al crear productos desde un usuario de tipo admin.", async () => {
        const newProduct = getProduct(30, "varios");
        const response = await requester.post("/products").send(newProduct).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        if (status === 201) {
            productsId.push(_body.product._id);
        }
        expect(status).to.be.equals(201);
    });

    it("GET /api/carts/:cid status 404 al buscar una cart por id que no existe.", async () => {
        const response = await requester.get("/carts/6848918dc7a3469ce2442c4e").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("GET /api/carts/:cid status 200 al buscar el cart del usuario logueado.", async () => {
        const responseUser = await requester.get("/users/" + userId).set("Cookie", cookiesAdmin);
        const { _body: bodyUser } = responseUser;
        cartId = bodyUser?.user?.cart;
        const responseCart = await requester.get("/carts/" + cartId).set("Cookie", cookiesUser);
        const { status: statusCart } = responseCart;
        expect(statusCart).to.be.equals(200);
    });

    it("GET /api/carts/:cid cart tiene la propiedad products.", async () => {
        const response = await requester.get("/carts/" + cartId).set("Cookie", cookiesUser);
        const { _body } = response;
        expect(_body.cart).to.have.property("products");
    });

    it("POST /api/carts/:cid/products/:pid status 404 al intentar agregar un producto a un carrito que no existe.", async () => {
        const cid = "6848918dc7a3469ce2442c4e";
        const pid = productsId[0];
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 2 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("POST /api/carts/:cid/products/:pid status 404 al intentar agregar al carrito un producto que no existe.", async () => {
        const cid = cartId;
        const pid = "5848918dc7a3469ce2442c4e";
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 2 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("POST /api/carts/:cid/products/:pid status 201 al agregar el producto 1 al carrito.", async () => {
        const cid = cartId;
        const pid = productsId[0];
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 1 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(201);
    });

    it("POST /api/carts/:cid/products/:pid status 201 al agregar el producto 2 al carrito.", async () => {
        const cid = cartId;
        const pid = productsId[1];
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 1 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(201);
    });

    it("POST /api/carts/:cid/products/:pid status 201 al agregar el producto 2 al carrito.", async () => {
        const cid = cartId;
        const pid = productsId[2];
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 1 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(201);
    });

    it("DELETE /api/carts/:cid/products/:pid status 404 al intentar quitar un producto de un carrito que no existe.", async () => {
        const cid = "6848918dc7a3469ce2442c4e";
        const pid = productsId[2];
        const response = await requester.delete("/carts/" + cid + "/products/" + pid).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("DELETE /api/carts/:cid/products/:pid status 200 al quitar un producto del carrito.", async () => {
        const cid = cartId;
        const pid = productsId[2];
        const response = await requester.delete("/carts/" + cid + "/products/" + pid).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/carts/:cid devuelve los 2 productos que están en el carrito.", async () => {
        const response = await requester.get("/carts/" + cartId).set("Cookie", cookiesUser);
        const { _body } = response;
        const productsInCart = _body.cart.products
        expect(productsInCart.length).to.be.equals(2);
    });

    it("DELETE /api/carts/:cid status 404 al vaciar un carrito que no existe.", async () => {
        const cid = "6848918dc7a3469ce2442c4e";
        const response = await requester.delete("/carts/" + cid).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("DELETE /api/carts/:cid status 200 al vaciar el carrito.", async () => {
        const cid = cartId;
        const response = await requester.delete("/carts/" + cid).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("POST /api/carts/:cid/products/:pid status 201 al agregar cantidad 2 del producto 2 al carrito.", async () => {
        const cid = cartId;
        const pid = productsId[1];
        const response = await requester.post("/carts/" + cid + "/products/" + pid).send({ quantity: 2 }).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(201);
    });


    it("POST /api/carts/:cid/purchase status 404 al intentar comprar un carrito que no existe.", async () => {
        const cid = "6848918dc7a3469ce2442c4e";
        const response = await requester.post("/carts/" + cid + "/purchase").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

    it("POST /api/carts/:cid/purchase status 200 al intentar comprar un carrito.", async () => {
        const cid = cartId;
        const response = await requester.post("/carts/" + cid + "/purchase").set("Cookie", cookiesUser);
        const { status, _body } = response;
        ticket = _body.ticket;
        expect(status).to.be.equals(200);
    });    

    it("DELETE /api/users/:uid status 200 al borrar un usuario estando logueado como admin.", async () => {
        const response = await requester.delete("/users/" + userId).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("DELETE /api/products/:pid status 200 al borrar todos los productos creados estando logueado como admin.", async () => {
        for (const productId of productsId) {
            const response = await requester.delete("/products/" + productId).set("Cookie", cookiesAdmin);
            const { status } = response;
            expect(status).to.be.equals(200);
        }
    });

});