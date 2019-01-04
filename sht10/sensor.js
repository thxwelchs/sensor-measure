require('dotenv').config();
const async = require('async');
const SHT1x = require('./pi-sht1x');
const cron = require('node-cron');
const mongoose = require('mongoose');

const connectConfig = {
	useNewUrlParser: true,
};

mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:27017/${process.env.MONGO_DB_NAME}`, connectConfig);

const db = mongoose.connection;

db.on('error', () => {
	console.error('mongodb connection failed');
});

db.once('open', () => {
	console.log('mongodb Connected');
})

const Schema = mongoose.Schema;
const sensorSchema = new Schema({
	temperature: Number,
	humidity: Number,
	fine_dust: Number,
	date: { type: Date, default: Date.now }
	
}, { versionKey: false});
const Sensor = mongoose.model('sensor', sensorSchema); 


cron.schedule('*/5 * * * * *', () => {
	async.series([
		  SHT1x.init,
		  SHT1x.reset,
		  function(callback) {
			      SHT1x.getSensorValues(function(error, values) {
					if(error) {
						return console.error(error);
					}
					//console.log(typeof values)
				      //const sensorValue = JSON.parse(values);

				      //console.log(sensorValue.temperature);
				    const { temperature, humidity } = values; 
				//console.log(temperature, humidity);
				const sensor = new Sensor({
					temperature,
					humidity,
					fine_dust: null,
				});
				sensor.save((err, sensor) => {
					if(err) {return console.error(err);}
					//console.dir(sensor);
				});

				    //console.log(values);
				    callback(error);
				  });
			    }
	], function(error) {
		  SHT1x.shutdown();
		  if (error) {
			      console.error(error);
			    }
	});
});

