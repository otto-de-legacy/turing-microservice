import internalController from '../../controller/internal/internalController';
import express from 'express';
const Router = express.Router();

Router.get('/health', internalController.health);
Router.get('/status', internalController.status);

export default Router;
