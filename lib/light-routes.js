import express from 'express';
import LightingController from './LightingController';

let lighting = new LightingController();
let router = express.Router();

router.get('/all', (req, res)=> {
  let lights = lighting.getLights();
  let response = [];
  lights.forEach((lightMediator)=> {
    response.push(lightMediator.light);
  });
  res.json(response);
});

router.get('/:light', (req, res)=> {

    let lights = lighting.getLights();
    let lightMediator = lights.get(req.params.light);
    if(lightMediator){
      res.json(lightMediator.light);
    } else {
      res.status(404).send("no light found")
    }
});


router.put('/all/on', (req, res)=> {
  lighting.allLightsOn();
  res.send(true);
});

router.put('/all/off', (req, res)=> {
  lighting.allLightsOff();
  res.send(true);
});

router.put('/all/color/:color', (req, res)=> {
  lighting.allColor(req.params.color);
  res.send(true);
});

router.put('/:light/color/:color', (req, res)=> {

    let lights = lighting.getLights();
    let mediator = lights.get(req.params.light);
    if(mediator){
      mediator.setColor(req.params.color);
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});

router.put('/:light/on', (req, res)=> {

    let lights = lighting.getLights();
    let mediator = lights.get(req.params.light);
    if(mediator){
      mediator.on();
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});

router.put('/:light/off', (req, res)=> {
    let lights = lighting.getLights();
    let mediator = lights.get(req.params.light);
    if(mediator){
      mediator.off();
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});


export default router;
