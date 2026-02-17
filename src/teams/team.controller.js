import Team from './team.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

// Obtener todos los equipos con paginación
export const getTeams = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const teams = await Team.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Team.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: teams,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los equipos',
            error: error.message,
        });
    }
};

// Obtener equipo por ID
export const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado',
            });
        }

        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el equipo',
            error: error.message,
        });
    }
};

// Crear nuevo equipo
export const createTeam = async (req, res) => {
    try {
        const teamData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const filename = req.file.filename;
            const relativePath = filename.substring(filename.indexOf('teams/'));
            teamData.logo = `${relativePath}.${extension}`;
        }

        const team = new Team(teamData);
        await team.save();

        res.status(201).json({
            success: true,
            message: 'Equipo creado exitosamente',
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el equipo',
            error: error.message,
        });
    }
};

// Actualizar equipo
export const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const currentTeam = await Team.findById(id);

            if (currentTeam && currentTeam.logo && currentTeam.logo !== 'teams/default_logo') {
                const photoPath = currentTeam.logo;
                const photoWithoutExt = photoPath.substring(0, photoPath.lastIndexOf('.'));
                const publicId = `kinal_sports/${photoWithoutExt}`;

                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.error(`Error al eliminar logo anterior: ${err.message}`);
                }
            }

            const extension = req.file.path.split('.').pop();
            const filename = req.file.filename;
            const relativePath = filename.includes('teams/') 
                ? filename.substring(filename.indexOf('teams/')) 
                : filename;
            updateData.logo = `${relativePath}.${extension}`;
        }

        const team = await Team.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Equipo actualizado exitosamente',
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el equipo',
            error: error.message,
        });
    }
};

// Cambiar estado (Borrado lógico)
export const changeTeamStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.method === 'DELETE' ? false : req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const team = await Team.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: `Equipo ${action} exitosamente`,
            data: team,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar estado del equipo',
            error: error.message,
        });
    }
};