import express from 'express';
//import userRoutes from '../modules/user/user.route';
import userRoutes from '../modules/user/user.route';
import foundItemCategoryRoutes from '../modules/foundItemCategory/foundItemCategory.route';
import foundItemRoutes from '../modules/foundItem/foundItem.route';

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
  {
    path: '/found-items',
    element: foundItemRoutes,
  },
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
