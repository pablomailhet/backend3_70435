import "dotenv/config.js";
import { expect } from "chai";

import { connectDB } from "../../src/helpers/db.helper.js";
import userModel from "../../src/models/users.model.js";

describe("TESTING: Users", () => {

    let usersId = [];

    before(async () => {
        await connectDB();
    });

    const createMockUser = (nro) => ({
        first_name: "first_name " + nro,
        last_name: "last_name " + nro,
        email: "email" + nro + "@dom.com",
        password: "coder1234"
    });

    //---------------Create-------------------------------------------------------------------------------------------
    it("Debe fallar al crear un usuario cuando faltan campos obligatorios", async () => {
        try {
            await userModel.create({
                first_name: "Solo nombre"
                // falta last_name, email, password
            });
        } catch (error) {
            expect(error).to.have.property("message");
        }
    });

    it("Debe crear un usuario y devolver su _id", async () => {
        const user = await userModel.create(createMockUser(1));
        usersId.push(user._id);
        expect(user).to.have.property("_id");
    });

    it("Debe tener un _id del tipo object al crear un usuario", async () => {
        const user = await userModel.create(createMockUser(2));
        usersId.push(user._id);
        expect(user._id).to.be.a("object");
    });

    it("Debe incluir la propiedad 'first_name' en el usuario creado", async () => {
        const user = await userModel.create(createMockUser(3));
        usersId.push(user._id);
        expect(user).to.have.property("first_name");
    });

    it("La propiedad 'email' debe ser una cadena válida", async () => {
        const user = await userModel.create(createMockUser(4));
        usersId.push(user._id);
        expect(user.email).to.be.a("string");
        expect(user.email).to.include("@");
    });

    it("La propiedad 'rol' por defecto debe ser 'user'", async () => {
        const user = await userModel.create(createMockUser(5));
        usersId.push(user._id);
        expect(user.rol).to.be.equals("user");
    });

    it("La propiedad 'age' debe ser del tipo number si se define", async () => {
        const user = await userModel.create(createMockUser(6));
        usersId.push(user._id);

        if (user.age !== null) {
            expect(user.age).to.be.a("number");
        } else {
            expect(user.age).to.be.null;
        }
    });

    it("La propiedad 'cart' debe ser null o undefined al momento de creación", async () => {
        const user = await userModel.create(createMockUser(7));
        usersId.push(user._id);
        expect(user.cart === null || user.cart === undefined).to.be.true;
    });



    //---------------Find-------------------------------------------------------------------------------------------
    it("Debe recuperar todos los usuarios de la base de datos como un array", async () => {
        const users = await userModel.find();
        expect(Array.isArray(users)).to.be.true;
    });

    it("Debe devolver un array vacío si no encuentra usuarios con cierto nombre", async () => {
        const users = await userModel.find({ first_name: "NoExiste" });
        expect(users).to.have.lengthOf(0);
    });

    it("Debe recuperar un usuario existente por su ID", async () => {
        const user = await userModel.findById(usersId[0]);
        expect(user).to.not.be.null;
        expect(user).to.have.property("email");
        expect(user).to.have.property("first_name");
    });

    it("Debe recuperar un usuario existente por su email", async () => {
        const email = "email1@dom.com";
        const user = await userModel.findOne({ email });
        expect(user).to.not.be.null;
        expect(user.email).to.equal(email);
    });

    //---------------Update-------------------------------------------------------------------------------------------
    it("Debe actualizar correctamente el campo 'rol' de un usuario", async () => {
        const updated = await userModel.findByIdAndUpdate(
            usersId[0],
            { rol: "admin" },
            { new: true }
        );
        expect(updated.rol).to.be.equals("admin");
    });

    //---------------Delete-------------------------------------------------------------------------------------------
    it("Debe eliminar correctamente el usuario 1 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[0]);
        const user = await userModel.findById(usersId[0]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 2 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[1]);
        const user = await userModel.findById(usersId[1]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 3 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[2]);
        const user = await userModel.findById(usersId[2]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 4 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[3]);
        const user = await userModel.findById(usersId[3]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 5 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[4]);
        const user = await userModel.findById(usersId[4]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 6 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[5]);
        const user = await userModel.findById(usersId[5]);
        expect(user).to.be.a("null");
    });

    it("Debe eliminar correctamente el usuario 7 de la base de datos", async () => {
        await userModel.findByIdAndDelete(usersId[6]);
        const user = await userModel.findById(usersId[6]);
        expect(user).to.be.a("null");
    });

});