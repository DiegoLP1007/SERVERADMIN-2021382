import { Router } from 'express';
import {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} from './reservation.controller.js';
import {
    validateCreateReservation,
    validateUpdateReservation,
    validateGetReservationById
} from '../../middlewares/reservation-validators.js';

const router = Router();

router.get('/', getReservations);
router.get('/:id', validateGetReservationById, getReservationById);
router.post('/', validateCreateReservation, createReservation);
router.put('/:id', validateUpdateReservation, updateReservation);
router.delete('/:id', validateGetReservationById, deleteReservation);

export default router;