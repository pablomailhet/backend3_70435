import { genSaltSync, hashSync, compareSync } from "bcrypt";

const hashPassword = (password) => {
    const salt = genSaltSync(5);
    return hashSync(password, salt);
}

const validatePassword = (password, passwordBDD) => {
    return compareSync(password, passwordBDD);
}

export { hashPassword, validatePassword };