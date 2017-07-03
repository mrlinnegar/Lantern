import LightingController from './LightingController';
import express from 'express';

let lighting = new LightingController();

const app = express();

app.get('/', (req, res)=> {
  let lights = lighting.getLights();
  let response = [];
  lights.forEach((lightMediator)=> {
    response.push(lightMediator.light);
  });
  res.json(response);
});

app.get('/:light', (req, res)=> {

    let lights = lighting.getLights();
    let lightMediator = lights.get(req.params.light);
    if(light){
      res.json(lightMediator.light);
    } else {
      res.status(404).send("no light found")
    }
});


app.get('/:light/on', (req, res)=> {

    let lights = lighting.getLights();
    let mediator = lights.get(req.params.light);
    if(mediator){
      mediator.on();
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});

app.get('/:light/off', (req, res)=> {
    let lights = lighting.getLights();
    let mediator = lights.get(req.params.light);
    if(mediator){
      mediator.off();
      res.json(true);
    } else {
      res.status(404).send("no light found")
    }
});

app.listen(3000, () => {
  console.log('lantern listening on port 3000');
});
