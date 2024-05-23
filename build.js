#!/usr/bin/env node
// Import the necessary modules
// const yargs = require('yargs');
// import yargs from 'yargs';
  const yargs = require('yargs');
 const ProgressBar = require('progress');

 const defaultPath = `**/!(*.d).ts`;
 import('./modifyDecorator.mjs').then((module)=>{
   module.modifyPropertyDecorator(defaultPath);
 });


// Set up yargs to parse command-line arguments
const argv = yargs
  .option('path', {
    alias: 'p',
    description: 'Path to ts files',
    type: 'string',
    default:defaultPath 
  })
  .help()
  .alias('help', 'h')
  .argv;

// Function to simulate a task
const simulateTask = (steps, updateProgress) => {
  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(interval);
      updateProgress(null);  // Indicate completion
    } else {
      currentStep++;
      updateProgress(currentStep);
    }
  }, 100); // Adjust the interval time as needed
};

// Initialize the progress bar
const bar = new ProgressBar('Progress [:bar] :percent :etas', {
  total: 50,
  width: 40,
});

const steps = 50;
// Simulate a task and update the progress bar
simulateTask(steps, (currentStep) => {
  if (currentStep !== null) {
    bar.tick();
    if (bar.complete) {
      console.log('Task completed!');
    }
  }
});
