import { genSaltSync, hashSync, compareSync } from "bcrypt";

const hashPassword = (password) => {
    const salt = genSaltSync(parseInt(process.env.SALT));
    return hashSync(password, salt);
}

const validatePassword = (password, passwordBDD) => {
    return compareSync(password, passwordBDD);
}

export { hashPassword, validatePassword };