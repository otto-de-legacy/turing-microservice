import publicController from '../../controller/public/publicController';
import express from 'express';
const Router = express.Router();

Router.get('/', publicController.index);

export default Router;
