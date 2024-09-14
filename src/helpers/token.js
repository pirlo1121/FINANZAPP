import jwt from "jsonwebtoken";


export const generateToken = ( payload ) => {
    return jwt.sign(
        payload,                            // PayLoad
        process.env.SECRET,        // PALABRA-CLAVE
        { expiresIn: '1h' }                 // Configuracion
    );
}

export const validateToken = ( token ) => {
    return jwt.verify(
        token,                          // Token
        process.env.SECRET     // PALABRA CLAVE
    );
}
