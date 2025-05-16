import jwt from 'jsonwebtoken';

const jwtSecret = process.env.jwtSecret;

export const generateToken = (user) => {
    /*
        param1 = Objeto a almacenar (usuario)
        param2 = contraseña
        param3 = TTL o tiempo de vida
    */
    const token = jwt.sign({

        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        rol: user.rol

    }, jwtSecret, { expiresIn: '24h' });

    return token;

} 