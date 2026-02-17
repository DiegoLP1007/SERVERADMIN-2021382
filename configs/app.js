'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

// Importar rutas
import fieldRoutes from '../src/fields/field.routes.js';
// Se agrega la importación de las rutas de reservaciones
import reservationRoutes from '../src/reservations/reservation.routes.js';
import teamRoutes from '../src/teams/team.routes.js';
import tournamentRoutes from '../src/tournaments/tournament.routes.js';

const BASE_URL = '/kinalSportAdmin/v1';

// Configuración de mi aplicación
const middlewares = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

// Configuración de rutas
const routes = (app) => {
    app.use(`${BASE_URL}/fields`, fieldRoutes);
    // Se registra el endpoint para reservaciones
    app.use(`${BASE_URL}/reservations`, reservationRoutes);
    app.use(`${BASE_URL}/teams`, teamRoutes);
    app.use(`${BASE_URL}/tournaments`, tournamentRoutes);
}

// Función para iniciar el servidor
const initServer = async (app) => {
    app = express();

    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection(); // Es buena práctica usar await aquí si dbConnection es asíncrona

        middlewares(app);
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
            console.log(`Reservations: http://localhost:${PORT}${BASE_URL}/reservations`);
        });

        // Primera ruta 
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'KinalSport Admin',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log("Error al iniciar el servidor:", error);
    }
}

export { initServer };