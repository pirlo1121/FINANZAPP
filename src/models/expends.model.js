import { Schema, model } from "mongoose";

const gastoSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        enum: ['fijos', 'esporadicos'],
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Gasto = model('Gasto', gastoSchema);

export default Gasto;
