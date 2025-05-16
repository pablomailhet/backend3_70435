import { faker } from "@faker-js/faker";
faker.locale = 'es';

const createMockUser = () => {

    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const name = first_name.toLowerCase() + "." + last_name.toLowerCase();
    const email = name + "@coder.com";
    const password = "coder1234";
    const age = faker.number.int({ min: 18, max: 70 })
    const roles = ["user", "admin"];
    const rol = roles[faker.number.int({ min: 0, max: 1 })];
    return { first_name, last_name, email, password, age, rol };

};

export default createMockUser;
