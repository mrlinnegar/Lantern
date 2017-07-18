import express from 'express';
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
      light.update(req.body);
      res.json(light.getData());
    } else {
      res.status(404).send("no light found");
    }
  });

  return router;
}

export default createRoutes;
