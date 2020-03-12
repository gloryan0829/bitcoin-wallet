import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import webRoutes from '../web/routes';
import {
  NODE_ENV,
  CLIENT_URL
} from './constants/environment';

export default app => {
  const corsOptions = {
    origin: [
      `${CLIENT_URL}`
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  // Express 서버 로그
  if (NODE_ENV === 'production') {
    app.use(morgan('common', { skip: (req, res) => res.statusCode < 400 }));
  } else {
    app.use(morgan('dev'));
  }

  morganBody(app, {
    theme: 'inverted',
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));

  webRoutes(app); // API 라우팅
};
