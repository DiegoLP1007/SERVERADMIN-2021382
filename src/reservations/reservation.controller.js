import Reservation from './reservation.model.js';

// Obtener reservaciones con paginación
export const getReservations = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const filter = status ? { status, isActive: true } : { isActive: true };

        const reservations = await Reservation.find(filter)
            .populate('field', 'fieldName fieldType') // Trae info de la cancha
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Reservation.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: reservations,
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
            message: 'Error al obtener las reservaciones',
            error: error.message,
        });
    }
};

// Obtener reservación por ID
export const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id).populate('field');

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservación no encontrada',
            });
        }

        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la reservación',
            error: error.message,
        });
    }
};

// Crear reservación
export const createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();

        res.status(201).json({
            success: true,
            message: 'Reservación creada exitosamente',
            data: reservation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la reservación',
            error: error.message,
        });
    }
};

// Actualizar reservación (Estado o datos)
export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservación no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reservación actualizada exitosamente',
            data: reservation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la reservación',
            error: error.message,
        });
    }
};

// Desactivar reservación (Soft Delete)
export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservación no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reservación eliminada (desactivada) exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la reservación',
            error: error.message,
        });
    }
};