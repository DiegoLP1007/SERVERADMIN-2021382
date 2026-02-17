import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateReservation = [
    body('field')
        .notEmpty().withMessage('La cancha es requerida')
        .isMongoId().withMessage('ID de cancha no válido'),
    body('customerName')
        .trim()
        .notEmpty().withMessage('El nombre del cliente es requerido')
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
    body('customerEmail')
        .trim()
        .notEmpty().withMessage('El correo es requerido')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('reservationDate')
        .notEmpty().withMessage('La fecha es requerida')
        .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD)'),
    body('startTime')
        .notEmpty().withMessage('La hora de inicio es requerida'),
    body('endTime')
        .notEmpty().withMessage('La hora de finalización es requerida'),
    body('totalPrice')
        .notEmpty().withMessage('El precio total es requerido')
        .isFloat({ min: 0 }).withMessage('El precio debe ser mayor o igual a 0'),
    checkValidators
];

export const validateUpdateReservation = [
    param('id').isMongoId().withMessage('ID de reservación no válido'),
    body('status')
        .optional()
        .isIn(['PENDIENTE', 'CONFIRMADA', 'CANCELADA'])
        .withMessage('Estado de reservación no válido'),
    checkValidators
];

export const validateGetReservationById = [
    param('id').isMongoId().withMessage('ID no válido'),
    checkValidators
];