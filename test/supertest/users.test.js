import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de users", () => {

    let cookiesAdmin;
    let cookiesUser;
    let testUserId;

    const testUser = {
        first_name: "FN Test User",
        last_name: "LN Test User",
        email: "testuser@coder.com",
        password: "coder1234"
    };

    // Login como admin
    before(async () => {
        const response = await requester.post("/sessions/login").send({
            email: "admin@coder.com",
            password: "coder1234",
        });
        const { headers } = response;
        cookiesAdmin = headers["set-cookie"];
    });

    it("POST /api/users crea un nuevo usuario de tipo user con credenciales de tipo admin", async () => {
        const response = await requester.post("/users").send(testUser).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        expect(status).to.be.equals(201);
        expect(_body).to.have.property("message").that.equals("User added");
        expect(_body).to.have.property("user");
        testUserId = _body.user._id;
    });    

    //Sin inicio de session
    it("GET /api/users devuelve 401 al consultar todos los usuarios sin credenciales", async () => {
        const response = await requester.get("/users");
        const { status } = response;
        expect(status).to.be.equals(401);
    });

    it("GET /api/users/:uid devuelve 401 al consultar un usuario sin credenciales", async () => {
        const response = await requester.get("/users/" + testUserId);
        const { status } = response;
        expect(status).to.be.equals(401);
    });    

    it("POST /api/users devuelve 401 al intentar crear un usuario sin credenciales", async () => {
        const response = await requester.post("/users").send(testUser);
        const { status } = response;
        expect(status).to.be.equals(401);
    });     

    it("PUT /api/users/:uid devuelve 401 al intentar actualizar un usuario sin credenciales", async () => {
        const updatedUser = {
            first_name: "Updated",
            last_name: "User",
            email: "updateduser@coder.com",
            password: "NewPass_1234"
        };
        const response = await requester.put("/users/" + testUserId).send(updatedUser);
        const { status } = response;
        expect(status).to.be.equals(401);

    });

    it("DELETE /api/users/:uid devuelve 401 al intentar eliminar un usuario sin credenciales", async () => {
        const response = await requester.delete("/users/" + testUserId);
        const { status } = response;
        expect(status).to.be.equals(401);
    });
    


    //login como user
    it("POST /api/sessions/login devuelve 200 al ingresar con un usuario de tipo user", async () => {
        const response = await requester.post("/sessions/login").send({
            email: testUser.email,
            password: testUser.password
        });        
        const {status, headers } = response;
        cookiesUser = headers["set-cookie"];
        expect(status).to.be.equals(200);
    }); 

    it("GET /api/users devuelve 403 al consultar todos los usuarios con credenciales de tipo user", async () => {
        const response = await requester.get("/users").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });

    it("GET /api/users/:uid devuelve 403 al consultar un usuario con credenciales de tipo user", async () => {
        const response = await requester.get("/users/" + testUserId).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });    

    it("POST /api/users devuelve 403 al intentar crear un usuario con credenciales de tipo user", async () => {
        const response = await requester.post("/users").send(testUser).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });     

    it("PUT /api/users/:uid devuelve 403 al intentar actualizar un usuario con credenciales de tipo user", async () => {
        const updatedUser = {
            first_name: "Updated",
            last_name: "User",
            email: "updateduser@coder.com",
            password: "NewPass_1234"
        };
        const response = await requester.put("/users/" + testUserId).send(updatedUser).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);

    });

    it("DELETE /api/users/:uid devuelve 403 al intentar eliminar un usuario con credenciales de tipo user", async () => {
        const response = await requester.delete("/users/" + testUserId).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });


    //login como admin
    it("GET /api/users devuelve 200 al consultar todos los usuarios con credenciales de tipo admin", async () => {
        const response = await requester.get("/users").set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/users devuelve un array de usuarios en la propiedad users con credenciales de tipo admin", async () => {
        const response = await requester.get("/users").set("Cookie", cookiesAdmin);
        const { _body } = response;
        expect(_body).to.have.property("users");
    });

    it("GET /api/users/:uid devuelve el usuario creado con credenciales de tipo admin", async () => {
        const response = await requester.get("/users/" + testUserId).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        expect(status).to.be.equals(200);
        expect(_body).to.have.property("user");
        expect(_body.user).to.include({ email: testUser.email });
    });

    it("PUT /api/users/:uid actualiza datos del usuario con credenciales de tipo admin", async () => {
        const updatedUser = {
            first_name: "Updated",
            last_name: "User",
            email: "updateduser@coder.com",
            password: "NewPass_1234"
        };
        const response = await requester.put("/users/" + testUserId).send(updatedUser).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        expect(status).to.be.equals(200);
        expect(_body).to.have.property("message").that.equals("User updated");
    });

    it("DELETE /api/users/:uid elimina el usuario con credenciales de tipo admin", async () => {
        const response = await requester.delete("/users/" + testUserId).set("Cookie", cookiesAdmin);
        const { status, _body } = response;
        expect(status).to.be.equals(200);
        expect(_body).to.have.property("message").that.equals("User deleted");
    });

    it("GET /api/users/:uid devuelve 404 si el usuario no existe con credenciales de tipo admin", async () => {
        const response = await requester.get("/users/" + testUserId).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(404);
    });

});
