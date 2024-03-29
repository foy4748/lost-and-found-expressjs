import express from 'express';
//import userRoutes from '../modules/user/user.route';
import userRoutes from '../modules/user/user.route';
const globalRoutes = express.Router();

const routes = [
  {
    path: '/',
    element: userRoutes,
  },
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
