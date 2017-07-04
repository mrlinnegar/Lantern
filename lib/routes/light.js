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
    .then(()=>{
      res.send(true);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    })
});

router.put('/all/off', (req, res)=> {
  lighting.allLightsOff()
    .then(()=>{
      res.send(true);
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
    .then(()=>{
      res.send(true);
    })
    .catch((error)=>{
      res.status(500).send("unknown error");
    });
});

router.put('/:light/color/:color', (req, res)=> {
  lighting.colorById(id, color)
  .then(()=>{
    res.send(true);
  })
  .catch((error)=>{
    res.status(500).send("unknown error");
  });
    let mediators = lighting.getLights();
    let mediator = mediators.get(req.params.light);
    if(mediator){
      mediator.setColor(req.params.color);
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});


export default router;
