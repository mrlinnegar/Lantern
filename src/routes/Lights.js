import express from 'express';
import { lightDataValidator, colorValidator } from '../validators/validators';
import AnimationList from '../animations/AnimationList';

function createRoutes(lighting) {
    const router = express.Router();

    router.get('/', (req, res) => {
        const lights = lighting.getAllLightsData();
        res.json(lights);
    });

    router.post('/', (req, res) => {
        try {
            const validatedInput = lightDataValidator(req.body);
            const lights = lighting.getLights();
            lights.forEach((light) => {
                light.update(validatedInput);
            });
            res.json(lighting.getAllLightsData());
        } catch (error) {
            res.status(error.status||500).json(error);
        }
    });


    router.post('/color', (req, res) => {

        try {
            const color = colorValidator(req.body.color);
            const randomAnimation = AnimationList.random();
            const data = new randomAnimation(color).getData();
            const validatedInput = {data: data, status: 1, fps: 8};
            const light = lighting.getRandomLight();

            light.update(validatedInput);

            res.json(lighting.getAllLightsData());
        } catch(error) {
            res.status(error.status || 500).json(error || "Oops something went wrong");
        }
    });

    router.get('/:light', (req, res) => {
        try {
            const light = lighting.getLightById(req.params.light);
            res.json(light.getData());
        } catch (error) {
            res.status(error.status).json(error);
        }
    });

    router.post('/:light', (req, res) => {
        try {
            const light = lighting.getLightById(req.params.light);
            const validatedInput = lightDataValidator(req.body);
            light.update(validatedInput);
            res.json(light.getData());
        } catch (error) {
            res.status(error.status).json(error);
        }
    });

    return router;
}

export default createRoutes;
