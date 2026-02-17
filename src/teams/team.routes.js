import { Router } from 'express';
import {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    changeTeamStatus,
} from './team.controller.js';
import {
    validateCreateTeam,
    validateUpdateTeamRequest,
    validateTeamStatusChange,
    validateGetTeamById,
} from '../../middlewares/team-validators.js';
import { uploadTeamImage } from '../../middlewares/file-uploader.js';

const router = Router();

// Rutas GET
router.get('/', getTeams);
router.get('/:id', validateGetTeamById, getTeamById);

// Rutas POST
router.post(
    '/',
    uploadTeamImage.single('image'),
    validateCreateTeam,
    createTeam
);

// Rutas PUT/PATCH
router.put(
    '/:id',
    uploadTeamImage.single('image'),
    validateUpdateTeamRequest,
    updateTeam
);

router.put('/:id/activate', validateTeamStatusChange, changeTeamStatus);
router.put('/:id/deactivate', validateTeamStatusChange, changeTeamStatus);

// Ruta DELETE (Borrado lógico)
router.delete('/:id', validateTeamStatusChange, changeTeamStatus);

export default router;