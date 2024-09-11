import mongoose from "mongoose";
const urlmongo = process.env.BD_URI

const dbconection = async()=>{
    try {
        await mongoose.connect(urlmongo);
        console.log( 'Base de datos inicializada correctamente' );
    }
    catch( error ) {
        console.error( error );
        throw new Error( 'Error al inicializar la base de datos' );
    }
}

export default dbconection