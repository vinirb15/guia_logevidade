const express = require('express');
const routes = express.Router();
const HouseController = require('./app/controllers/HouseController');

const authMiddleware = require('./app/middlewares/auth');


routes.get('/house', HouseController.index);
routes.post('/house', HouseController.create);
routes.post('/house/auth', HouseController.auth);



routes.use(authMiddleware);
routes.put('/house/:id', HouseController.update);
routes.get('/house/:id', HouseController.profile);
routes.delete('/house/:id', HouseController.delete);

module.exports = routes;