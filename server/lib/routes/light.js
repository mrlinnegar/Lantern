import express from 'express';
import LightingController from '../controllers/LightingController';

let lighting = new LightingController();
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

router.post('/on', (req, res)=> {
  lighting.allLightsOn()
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    })
});

router.post('/off', (req, res)=> {
  lighting.allLightsOff()
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    });
});



router.post('/color/:color', (req, res)=> {
  lighting.allColor(req.params.color)
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      console.log(error);
      res.status(500).send("unknown error");
    });
});



router.get('/:light', (req, res)=> {

  lighting.getLightById(req.params.light)
    .then((light)=>{
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });

});



router.post('/:light/on', (req, res)=> {

  lighting.onById(req.params.light)
    .then((light)=>{
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });

});


router.post('/:light/off', (req, res)=> {
  lighting.offById(req.params.light)
    .then((light)=>{
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });
});


router.post('/:light/color/:color', (req, res)=> {
  lighting.colorById(req.params.light, req.params.color)
  .then((lights)=>{
    res.json(lights);
  })
  .catch((error)=>{
    res.status(500).send("unknown error");
  });
});


export default router;
