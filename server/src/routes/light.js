import express from 'express';
import lightDataValidator from '../validators/validators'

function createRoutes(lighting) {
  let router = express.Router();

  router.get('/', (req, res)=> {
    const lights = lighting.getLights()
    res.json(lights);
  });

  router.get('/:light', (req, res)=> {
    const light = lighting.getLightById(req.params.light)
    if(light)
      res.json(light.getData());
    else
      res.status(404).send("no light found");
  });

  router.post('/:light', (req, res)=> {
    const light = lighting.getLightById(req.params.light)
    if(light){
      try {
        const validatedInput = lightDataValidator(req.body)
        light.update(validatedInput);
        res.json(light.getData());
      } catch (error) {
        res.status(error.code).json(error);
      }

    } else {
      res.status(404).send("no light found");
    }
  });

  return router;
}

export default createRoutes;
