'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import helmet from 'helmet';
import { helmetConfiguration } from './helmet-configuration.js';

// Ruta base de la API (prefijo común para todos los endpoints)
const BASE_PATH = '/kinalSportsAdmin/v1';


// Configuración de middlewares
// ----------------------------------------
const middlewares = (app) => {
app.use(helmet(helmetConfiguration));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
};

// Función para iniciar el servidor
// -----------------------------------------
export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  
	// Confía en el primer proxy (necesario cuando la app está detrás de un proxy o balanceador)
	app.set('trust proxy', 1);
	

  try {
	  // Registra y aplica los middlewares globales de la aplicación
    middlewares(app);

		// Iniciar servidor en el puerto especificado
    app.listen(PORT, () => {
      console.log(`KinalSports Admin Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
    });
    
		// Health Check Endpoint - CONVENCIÓN de monitoreo
		// Utilizado por sistemas externos para verificar estado del servicio
    app.get(`${BASE_PATH}/health`, (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'KinalSports Admin API'
    });
});
    
  } catch (err) {
    console.error(`Error starting Admin Server: ${err.message}`);
    process.exit(1);
  }
};