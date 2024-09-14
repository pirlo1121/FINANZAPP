import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salario: {
        type: Number,
        required: true
    },
    tope: {
        type: Number,
        required: true
    }, // máximo a gastar
    ingresosExtras: [Number],
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Usuario = model('Usuario', usuarioSchema);

export default Usuario;
