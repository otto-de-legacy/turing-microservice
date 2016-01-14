import errorController from '../controller/errorController';
import express from 'express';
const Router = express.Router();

Router.use(errorController.notFound);

export default Router;
