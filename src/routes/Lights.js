import express from 'express';
import { lightDataValidator, colorValidator } from '../validators/validators';
import Blink from '../animations/Blink';
import NYPD from '../animations/NYPD';

function createRoutes(lightingController) {
    const router = express.Router();

    router.get('/', (req, res) => {
        const response = lightingController.getAllLightsData();
        res.json(response);
    });


    router.post('/', (req, res) => {
        try {
            const validatedInput = lightDataValidator(req.body);
            const response = lightingController.updateAllLights(validatedInput);
            res.json(response);
        } catch (error) {
            res.status(error.status||500).json(error);
        }
    });


    router.post('/color', (req, res) => {

        try {
            const color = colorValidator(req.body.color);
            const data = new Blink(color).getData();
            const validatedInput = {data: data, status: 1, fps: 1};
            let response = lightingController.updateRandomLight(validatedInput);
            res.json(response);
        } catch(error) {
            res.status(error.status || 500).json(error || "Oops something went wrong");
        }
    });


    router.post('/nypd', (req, res) => {
        try {
            const data = new NYPD().getData();
            const validatedInput = { data: data, status: 1, fps: 16 }
            const response = lightingController.updateAllLights(validatedInput);
            res.json(response);
        } catch(error){
            res.status(error.status || 500).json(error || "Oops something went wrong");
        }

    });

    router.get('/:light', (req, res) => {
        try {
            const response = lightingController.getLightDataById(req.params.light);
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error);
        }
    });


    router.post('/:light', (req, res) => {
        try {
            const validatedInput = lightDataValidator(req.body);
            let response = lightingController.updateLight(req.params.light, validatedInput)
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error);
        }
    });

    return router;
}

export default createRoutes;
