import express = require('express');
import morgan from 'morgan';
var cluster = require('cluster')
var numWorkers = require('os').cpus().length
import cors from 'cors'

const app: express.Application = express()

async function loadServer() {
	app.use(morgan('dev'))
	app.use(cors());
	// app.use(cors({
 //     'allowedHeaders': ['sessionId', 'Content-Type'],
 //    'exposedHeaders': ['sessionId'],
 //    'origin': '*',
 //    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
 //    'preflightContinue': false
 //  }))
  await require('./loaders').default({ expressApp: app })
} 

loadServer()
// if(cluster.isMaster) {
// 	var numWorkers = require('os').cpus().length
// 	console.log('Master cluster setting up ' + numWorkers + ' workers...');
// 	for(var i = 0; i < numWorkers; i++) {
// 		cluster.fork();
// 	}

// 	cluster.on('online', function(worker:any) {
// 		console.log('Worker ' + worker.process.pid + ' is online');
// 	});
// 	cluster.on('exit', function(worker:any, code:any, signal:any) {
// 		console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
// 		console.log('Starting a new worker');
// 		cluster.fork();
// 	});
// } else {
	app.listen(3001, function () {
	    console.log('Example app listening on port 3000 and!');
  });
// }