import express from 'express';
import lightDataValidator from '../validators/validators';

function createRoutes(lighting) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const lights = lighting.getLights();
    res.json(lights);
  });

  router.get('/random', (req, res) => {
    try {
      const lights = lighting.getLights();
      const random = Math.floor(Math.random() * lights.length);
      const light = lighting.getLightById(lights[random].id);
      const update = {color: Math.floor(Math.random()*16777215).toString(16)};
      light.update(update);
      res.json(light.getData());
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error);
    }
  });

  router.get('/:light', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      res.json(light.getData());
    } catch (error) {
      res.status(error.status).json(error);
    }
  });

  router.get('/:light/on', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      light.update({status:1});
      res.json(light.getData());
    } catch (error) {
      res.status(error.status).json(error);
    }
  });

  router.get('/:light/off', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      light.update({status:0});
      res.json(light.getData());
    } catch (error) {
      res.status(error.status).json(error);
    }
  });


  router.post('/:light', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      const validatedInput = lightDataValidator(req.body);
      light.update(validatedInput);
      res.json(light.getData());
    } catch (error) {
      res.status(error.status).json(error);
    }
  });

  return router;
}

export default createRoutes;
