import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de sessions", () => {

    const admin = {
        first_name: "admin",
        last_name: "admin",
        email: "admin@coder.com",
        password: "coder1234",
    };

    let cookiesAdmin;
    let cookiesUser;
    let userId;

    // Login como admin
    before(async () => {
        const response = await requester.post("/sessions/login").send({
            email: "admin@coder.com",
            password: "coder1234",
        });
        const { headers } = response;
        cookiesAdmin = headers["set-cookie"];
    });

    //----    /sessions/register
    it("POST /api/sessions/register status 400 al registrar un usuario con datos faltantes.", async () => {
        const response = await requester.post("/sessions/register").send({
            email: "usuario1@prueba1.com",
            password: "pass_01",
        });
        const { status } = response;
        expect(status).to.be.equals(400);
    });

    it("POST /api/sessions/register devuelve el mensaje: 'Bad Request' en la propiedad message al registrar un usuario con datos faltantes.", async () => {
        const response = await requester.post("/sessions/register").send({
            email: "usuario2@prueba2.com",
            password: "pass_02",
        });
        const { _body } = response;
        expect(_body.message).to.be.equals("Bad Request");
    });

    it("POST /api/sessions/register status 409 al registrar un usuario existente.", async () => {
        const response = await requester.post("/sessions/register").send(admin);
        const { status } = response;
        expect(status).to.be.equals(409);
    });

    it("POST /api/sessions/register devuelve el mensaje: \"El valor del campo 'email' ya existe\" en la propiedad message.", async () => {
        const response = await requester.post("/sessions/register").send(admin);
        const { _body } = response;
        expect(_body.message).to.be.equals("El valor del campo 'email' ya existe.");
    });

    it("POST /api/sessions/register crea un nuevo usuario.", async () => {
        const data = {
            first_name: "First Name 01",
            last_name: "Last Name 01",
            email: "flast01@coder.com",
            password: "coder1234",
        };
        const response = await requester.post("/sessions/register").send(data);
        const { status, _body } = response;
        userId = _body._id;
        expect(status).to.be.equals(201);
    });

    //----    /sessions/login
    it("POST /api/sessions/login status 400 al intentar hacer un login con datos faltantes.", async () => {
        const response = await requester.post("/sessions/login").send({
            email: "qwerty@coder.com"
        });
        const { status } = response;
        expect(status).to.be.equals(400);
    });

    it("POST /api/sessions/login status 401 cuando los datos son incorrectos.", async () => {
        const response = await requester.post("/sessions/login").send({
            email: "qwerty@coder.com",
            password: "ytrewq1234"
        });
        const { status } = response;
        expect(status).to.be.equals(401);
    });

    it("POST /api/sessions/login tiene exito el inicio de sesión.", async () => {
        const response = await requester.post("/sessions/login").send({
            email: "flast01@coder.com",
            password: "coder1234",
        });
        const { status, headers } = response;
        cookiesUser = headers["set-cookie"];
        expect(status).to.be.equals(200);
    });

    it("POST /api/sessions/login devuelve el mensaje: 'Usuario logueado correctamente' en la propiedad message.", async () => {
        const response = await requester.post("/sessions/login").send({
            email: "flast01@coder.com",
            password: "coder1234",
        });
        const { _body, headers } = response;
        cookiesUser = headers["set-cookie"];
        expect(_body.message).to.be.equals("Usuario logueado correctamente");
    });

    //----    /sessions/current
    it("GET /api/sessions/current tiene exito el current.", async () => {
        const response = await requester.get("/sessions/current").set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

    it("GET /api/sessions/current devuelve el mismo _id que el del usuario registrado anteriormente.", async () => {
        const response = await requester.get("/sessions/current").set("Cookie", cookiesUser);
        const { _body } = response;
        expect(_body.user._id).to.be.equals(userId);
    });

    //----    /api/users
    it("DELETE /api/users/:uid status 403 cuando intento borrar un usuario estando logueado como user.", async () => {
        const response = await requester.delete("/users/" + userId).set("Cookie", cookiesUser);
        const { status } = response;
        expect(status).to.be.equals(403);
    });

    it("DELETE /api/users/:uid status 200 al borrar un usuario estando logueado como admin.", async () => {
        const response = await requester.delete("/users/" + userId).set("Cookie", cookiesAdmin);
        const { status } = response;
        expect(status).to.be.equals(200);
    });

});