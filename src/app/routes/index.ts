import express from 'express';
//import userRoutes from '../modules/user/user.route';
import userRoutes from '../modules/user/user.route';
import foundItemCategoryRoutes from '../modules/foundItemCategory/foundItemCategory.route';
const globalRoutes = express.Router();

const routes = [
  {
    path: '/',
    element: userRoutes,
  },
  {
    path: '/found-item-categories',
    element: foundItemCategoryRoutes,
  },
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
