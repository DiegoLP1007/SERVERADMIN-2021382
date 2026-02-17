import dotenv from 'dotenv';
import { initServer } from './configs/app.js';

dotenv.config();

// Errores no capturados
process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

// Promesas rechazadas o no manejadas
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

// Inicializacion del sevidor
console.log('Iniciando servidor de KinalSport...');
initServer();