'use strict';

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'El nombre del equipo es requerido'],
        trim: true,
        unique: true,
        maxLength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [200, 'La descripción es muy larga']
    },
    // Añadimos el Entrenador como String
    coach: {
        type: String,
        required: [true, 'El nombre del entrenador es requerido'],
        trim: true,
        maxLength: [100, 'El nombre del coach es demasiado largo']
    },
    // Añadimos el Capitán
    captain: {
        type: String,
        required: [true, 'El equipo debe tener un capitán asignado']
    },
    logo: {
        type: String,
        default: 'teams/default_logo'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);