import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SensorModel = new Schema({
    temperature: Number,
    humidity: Number,
    fine_dust: Number,
    date: { type: Date, default: Date.now  }
});