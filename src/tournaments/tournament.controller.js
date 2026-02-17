import Tournament from './tournament.model.js';

// Obtener todos los torneos
export const getTournaments = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const tournaments = await Tournament.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ startDate: 1 });

        const total = await Tournament.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: tournaments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener torneos',
            error: error.message
        });
    }
};

// Crear torneo
export const createTournament = async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();

        res.status(201).json({
            success: true,
            message: 'Torneo creado exitosamente',
            data: tournament
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear torneo',
            error: error.message
        });
    }
};

// Actualizar torneo
export const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!tournament) return res.status(404).json({ success: false, message: 'Torneo no encontrado' });

        res.status(200).json({
            success: true,
            message: 'Torneo actualizado correctamente',
            data: tournament
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Borrado lógico (Desactivar/Eliminar)
export const changeTournamentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.method === 'DELETE' ? false : req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const tournament = await Tournament.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!tournament) return res.status(404).json({ success: false, message: 'Torneo no encontrado' });

        res.status(200).json({
            success: true,
            message: `Torneo ${action} exitosamente`,
            data: tournament
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};