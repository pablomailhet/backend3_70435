import "dotenv/config.js";
import assert from "assert";

import { connectDB } from "../../src/helpers/db.helper.js";
import userModel from "../../src/models/users.model.js";

describe("TESTING: Users", () => {

    let usersId = [];

    before(async () => {
        await connectDB();
    });

    it("No debe crear un usuario cuando faltan datos requeridos", async () => {
        try {
            const user = await userModel.create({ first_name: "Juan" });
        } catch (error) {
            assert.ok(error.message, "Error esperado al faltar campos requeridos");
        }
    });

    it("Debe crear un usuario correctamente", async () => {
        const user = await userModel.create({
            first_name: "Pedro",
            last_name: "Pérez",
            email: "pedro.perez@example.com",
            password: "123456"
        });
        usersId.push(user._id);
        assert.ok(user._id, "El usuario no fue creado correctamente");
    });

    it("Debe crear un usuario con un email válido", async () => {
        const user = await userModel.create({
            first_name: "María",
            last_name: "García",
            email: "maria.garcia@example.com",
            password: "abcdef"
        });
        usersId.push(user._id);
        assert.ok(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(user.email), "El email no es válido");
    });

    it("Debe tener first_name y last_name de tipo string", async () => {
        const user = await userModel.create({
            first_name: "Carlos",
            last_name: "Lopez",
            email: "carlos.lopez@example.com",
            password: "securepass"
        });
        usersId.push(user._id);
        assert.strictEqual(typeof user.first_name, "string", "first_name no es string");
        assert.strictEqual(typeof user.last_name, "string", "last_name no es string");
    });

    it("Debe tener age como null por defecto", async () => {
        const user = await userModel.create({
            first_name: "Lucía",
            last_name: "Mendez",
            email: "lucia.mendez@example.com",
            password: "password123"
        });
        usersId.push(user._id);
        assert.strictEqual(user.age, null, "age no es null por defecto");
    });

    it("Debe tener rol por defecto como 'user'", async () => {
        const user = await userModel.create({
            first_name: "Andrés",
            last_name: "Romero",
            email: "andres.romero@example.com",
            password: "pass456"
        });
        usersId.push(user._id);
        assert.strictEqual(user.rol, "user", "rol por defecto no es 'user'");
    });

    it("Debe permitir especificar un age numérico", async () => {
        const user = await userModel.create({
            first_name: "Laura",
            last_name: "Gomez",
            email: "laura.gomez@example.com",
            password: "pass789",
            age: 30
        });
        usersId.push(user._id);
        assert.strictEqual(typeof user.age, "number", "age no es un número");
    });

    it("Debe buscar un usuario por ID", async () => {
        const user = await userModel.findById(usersId[1]);
        assert.ok(user, "No se encontró el usuario por ID");
    });

    it("Debe buscar un usuario por email", async () => {
        const user = await userModel.findOne({ email: "maria.garcia@example.com" });
        assert.ok(user, "No se encontró el usuario por email");
    });

    it("No debe encontrar un usuario con email inexistente", async () => {
        const user = await userModel.findOne({ email: "inexistente@example.com" });
        assert.strictEqual(user, null, "Se encontró un usuario que no debería existir");
    });

    it("Debe actualizar el rol de un usuario", async () => {
        const updated = await userModel.findByIdAndUpdate(
            usersId[1],
            { rol: "admin" },
            { new: true }
        );
        assert.strictEqual(updated.rol, "admin", "El rol no fue actualizado correctamente");
    });

    it("Debe actualizar múltiples campos de un usuario", async () => {
        const newData = {
            first_name: "Maria Actualizada",
            age: 35
        };
        const updated = await userModel.findByIdAndUpdate(
            usersId[1],
            newData,
            { new: true }
        );
        assert.strictEqual(updated.first_name, newData.first_name);
        assert.strictEqual(updated.age, newData.age);
    });

    it("Debe eliminar un usuario de la base de datos", async () => {
        for (const id of usersId) {
            await userModel.findByIdAndDelete(id);
            const user = await userModel.findById(id);
            assert.strictEqual(user, null, `El usuario con ID ${id} no fue eliminado`);
        }
    });
});
