import { Schema, model } from "mongoose";

const finanzasSchema = new Schema({
    nombre: String,
    salario: {
        required: true,
        type: Number
    },
    tope: {
        type: Number,
        required: true
    }, // maximo a gastar
    ingresosExtras: [Number],
    gastosFijos: [{ descripcion: String, monto: Number }],
    gastosEsporadicos: [{ descripcion: String, monto: Number }],
    inversiónes: [{descripcion: String, monto: Number}]
});

// Modelo para finanzas
const Finanzas = model('Finanzas', finanzasSchema);

export default Finanzas