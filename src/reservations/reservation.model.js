'use strict';
 
import mongoose from "mongoose";
 
const reservationSchema = new mongoose.Schema({
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'La cancha es requerida'],
    },
    customerName: {
        type: String,
        required: [true, 'El nombre del cliente es requerido'],
        trim: true,
        maxLenght: [100, 'El nombre no puede tener mas de 100 caracteres'],
    },
    customerEmail: {
        type: String,
        required: [true, 'El correo del cliente es requerido'],
        trim: true,
        lowercase: true,
    },
    reservationDate: {
        type: Date,
        required: [true, 'La fecha de la reservación es requerida'],
    },
    startTime: {
        type: String,
        required: [true, 'La hora de inicio es requerida'],
    },
    endTime: {
        type: String,
        required: [true, 'La hora de finalización es requerida'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es requerido'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    status: {
        type: String,
        enum: {
            values: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
            message: 'Estado de reservación no válido',
        },
        default: 'PENDIENTE',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});
 
// exportamos el modelo con el nombre Reservation
export default mongoose.model('Reservation', reservationSchema);