import * as mongoose from 'mongoose';
import { SensorModel } from '../models/sensorModel';
import { Request, Response } from 'express';
import { start } from 'repl';

const Sensor = mongoose.model('sensor', SensorModel);

export class SensorController{
    public getSensors (req: Request, res: Response) {                   
        Sensor.find({}, (err, sensors) => {
            if(err) {
                res.status(500);
            }


            if(sensors && sensors.length > 0) {
                res.status(200).json({
                    count: sensors.length,
                    sensors
                });
            }
            else {
               res.status(204);
            }
            
        })
    }

    public getSensorsByDate (req: Request, res: Response) {                   
        let { start, end } = req.query;

        Sensor.find({
            date: {
                $gte: new Date(new Date(start).toISOString()),
                $lte: new Date(new Date(end).toISOString()),
            }
        }, (err, sensors) => {
            if(err) {
                 res.status(500);
             }


             if(sensors && sensors.length > 0) {
                 res.status(200).json({
                     count: sensors.length,
                     sensors
                 });
             }
             else {
                res.status(204);
             }            
        })
    }
}