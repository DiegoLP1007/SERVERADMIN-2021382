'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

//Rutas
import fieldRoutes from '../src/fields/field.routes.js';
import reservationRoutes from '../src/reservations/reservation.routes.js';
import teamRoutes from '../src/teams/team.routes.js';
import tournamentRoutes from '../src/tournaments/tournament.routes.js';


const BASE_URL = '/kinalSportsAdmin/v1';

//Configuracion de mi aplicacion
//Se almacena en una funcion para que pueda ser exportada o usada en un archivo
//usada al crear la instancia de la aplicacion
const middlewares = (app) => {
  app.use(helmet(helmetConfiguration));
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.use(express.json({ limit: '10mb' }));
  app.use(requestLimit);
  app.use(morgan('dev'));
}

//Integracion de todas las rutas
const routes = (app) => {
  app.use(`${BASE_URL}/fields`, fieldRoutes);
  app.use(`${BASE_URL}/reservations`, reservationRoutes);
  app.use(`${BASE_URL}/teams`, teamRoutes);
  app.use(`${BASE_URL}/tournaments`, tournamentRoutes);
}


//Funcion para iniciar el servidor
const initServer = async (app) => {
  //Creacion de la instancia de la aplicacion
  app = express();
  const PORT = process.env.PORT || 3001;

  try {

    //Configuracion de los middlewares (Mi aplicacion)
    dbConnection();
    middlewares(app);
    routes(app);
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
    });

    //primera ruta
    app.get(`${BASE_URL}/health`, (req, res) => {
      res.status(200).json(
        {
          status: 'ok',
          service: 'kinalSport Admin',
          version: '1.0.0'
        }
      );
    });

  } catch (error) {
    console.log(error)
  }
}

export { initServer };