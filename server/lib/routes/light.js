import express from 'express';
function createRoutes(lighting) {
  let router = express.Router();

  router.get('/', (req, res)=> {
    lighting.getLights()
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      res.status(500).send("Unknown error");
    })
  });

  router.get('/:light', (req, res)=> {

    lighting.getLightById(req.params.light)
      .then((light)=>{
        res.json(light.getLight());
      })
      .catch((error)=>{
        res.status(404).send("no light found");
      });

  });

  router.post('/:light', (req, res)=> {
    lighting.getLightById(req.params.light)
      .then((light)=>{
        light.update(req.body);
        res.json(light.getLight());
      })
      .catch((error)=>{
        console.log(error);
        res.status(404).send("no light found");
      });
  });

  return router;
}

export default createRoutes;
