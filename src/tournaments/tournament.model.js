'use strict';

import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: [true, 'El nombre del torneo es requerido'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['MASCULINO', 'FEMENINO', 'MIXTO'],
            message: 'Categoría no válida'
        }
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es requerida']
    },
    endDate: {
        type: Date,
        required: [true, 'La fecha de fin es requerida']
    },
    maxTeams: {
        type: Number,
        required: true,
        min: [2, 'Mínimo 2 equipos para un torneo']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Tournament', tournamentSchema);