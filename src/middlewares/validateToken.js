import {validateToken} from '../helpers/token.js'

export function authUser(req, res, next){
    const token = req.header( 'X-Token' );
    if( ! token ) return res.json({ok: false, msg: 'Error al obtener el Token'});

    try {
        const payload = validateToken(token)
        console.log(payload)
        next()
    } catch (error) {
        console.error( error );
        return res.json({ ok: false, msg: 'Token no valido' });
    }

}

