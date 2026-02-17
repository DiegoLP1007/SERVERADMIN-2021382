import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTournament = [
    body('tournamentName')
        .trim()
        .notEmpty().withMessage('El nombre del torneo es requerido'),
    body('category')
        .notEmpty().withMessage('La categoría es requerida')
        .isIn(['MASCULINO', 'FEMENINO', 'MIXTO']).withMessage('Categoría no válida'),
    body('startDate')
        .notEmpty().withMessage('La fecha de inicio es requerida')
        .isISO8601().withMessage('Formato de fecha de inicio inválido'),
    body('endDate')
        .notEmpty().withMessage('La fecha de fin es requerida')
        .isISO8601().withMessage('Formato de fecha de fin inválido'),
    body('maxTeams')
        .notEmpty().withMessage('El número máximo de equipos es requerido')
        .isInt({ min: 2 }).withMessage('Mínimo deben ser 2 equipos'),
    checkValidators
];

export const validateUpdateTournament = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('tournamentName').optional().trim(),
    body('category').optional().isIn(['MASCULINO', 'FEMENINO', 'MIXTO']),
    checkValidators
];

export const validateTournamentStatus = [
    param('id').isMongoId().withMessage('ID no válido'),
    checkValidators
];