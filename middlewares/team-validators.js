import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTeam = [
    body('teamName')
        .trim()
        .notEmpty().withMessage('El nombre del equipo es requerido')
        .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
    body('coach')
        .trim()
        .notEmpty().withMessage('El nombre del entrenador es requerido')
        .isLength({ max: 100 }).withMessage('El nombre del coach es demasiado largo'),
    body('captain')
        .trim()
        .notEmpty().withMessage('El equipo debe tener un capitán asignado'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('La descripción es muy larga'),
    checkValidators
];

export const validateUpdateTeamRequest = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('teamName')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('La descripción es muy larga'),
    checkValidators
];

export const validateTeamStatusChange = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators
];

export const validateGetTeamById = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators
];