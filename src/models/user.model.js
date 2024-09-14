import { Schema, model } from "mongoose";
import encryptPassword from "../middlewares/hashPass.js";

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
    password: {
        type: String,
        required: true,
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

// Usa el middleware importado
usuarioSchema.pre('save', encryptPassword);

const Usuario = model('Usuario', usuarioSchema);

export default Usuario;
