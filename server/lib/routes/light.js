import express from 'express';
import LightingController from '../controllers/LightingController';

let lighting = new LightingController();
let router = express.Router();

router.get('/all', (req, res)=> {
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
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });

});


router.put('/all/on', (req, res)=> {
  lighting.allLightsOn()
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    })
});

router.put('/all/off', (req, res)=> {
  lighting.allLightsOff()
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    });
});



router.put('/:light/on', (req, res)=> {

  lighting.onById(req.params.light)
    .then((light)=>{
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });

});

router.put('/:light/off', (req, res)=> {
  lighting.offById(req.params.light)
    .then((light)=>{
      res.json(light);
    })
    .catch((error)=>{
      res.status(404).send("no light found");
    });
});


router.put('/all/color/:color', (req, res)=> {
  lighting.allColor(req.params.color)
    .then((lights)=>{
      res.json(lights);
    })
    .catch((error)=>{
      console.log(error);
      res.status(500).send("unknown error");
    });
});

router.put('/:light/color/:color', (req, res)=> {
  lighting.colorById(req.params.light, req.params.color)
  .then((lights)=>{
    res.json(lights);
  })
  .catch((error)=>{
    res.status(500).send("unknown error");
  });
});


export default router;
