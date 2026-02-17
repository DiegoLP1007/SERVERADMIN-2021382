import { Router } from 'express';
import {
    getTournaments,
    createTournament,
    updateTournament,
    changeTournamentStatus
} from './tournament.controller.js';
import {
    validateCreateTournament,
    validateUpdateTournament,
    validateTournamentStatus
} from '../../middlewares/tournament-validators.js';

const router = Router();

router.get('/', getTournaments);
router.post('/', validateCreateTournament, createTournament);
router.put('/:id', validateUpdateTournament, updateTournament);

// Rutas de estado y borrado lógico
router.delete('/:id', validateTournamentStatus, changeTournamentStatus);
router.put('/:id/activate', validateTournamentStatus, changeTournamentStatus);
router.put('/:id/deactivate', validateTournamentStatus, changeTournamentStatus);

export default router;