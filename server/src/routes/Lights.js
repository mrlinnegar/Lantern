import express from 'express';
import lightDataValidator from '../validators/validators';

function createRoutes(lighting) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const lights = lighting.getLights();
    res.json(lights);
  });

  router.get('/:light', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      res.json(light.getData());
    } catch (error) {
      res.status(error).json(error);
    }
  });

  router.post('/:light', (req, res) => {
    try {
      const light = lighting.getLightById(req.params.light);
      const validatedInput = lightDataValidator(req.body);
      light.update(validatedInput);
      res.json(light.getData());
    } catch (error) {
      res.status(error.code).json(error);
    }
  });

  return router;
}

export default createRoutes;
