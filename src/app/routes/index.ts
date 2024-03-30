import express from 'express';
//import userRoutes from '../modules/user/user.route';
import userRoutes from '../modules/user/user.route';
import foundItemCategoryRoutes from '../modules/foundItemCategory/foundItemCategory.route';
import foundItemRoutes from '../modules/foundItem/foundItem.route';
import claimRoutes from '../modules/claim/claim.route';

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
  {
    path: '/claims',
    element: claimRoutes,
  },
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
