import {Request, Response} from "express";
import { SensorController } from '../controllers/sensorController';

export class Routes {    
    
    public sensorController: SensorController = new SensorController();

    public routes(app): void {          
        app.route('/')
        .get(this.sensorController.getSensors)   
        
        app.route('/sensor')
        .get(this.sensorController.getSensorsByDate);
        
    }
}