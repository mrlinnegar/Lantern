import express from 'express';
import lightDataValidator from '../validators/validators';
import Animations from '../animations/Animations'

function createRoutes() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const animations = Animations.keys();
    const output = [];

    for(let animationName of animations ) {
      output.push(animationName);
    };

    res.json(output);
  });

  return router;
}

export default createRoutes;
