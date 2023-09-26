
import request from 'request';
import process from 'node:process';
import 'dotenv/config';


console.log(process.env.UV_THREADPOOL_SIZE);

function exec(i: number): Promise<void>  {
  return new Promise((resolve, reject) => {   
    request.get('http://www.google.com', (err: any, resp: any) => {
      if(err) {
        reject('error');
        return console.error(err);
      }
      console.log("Total bytes received: ", resp.body.length, process.pid, i);  
      resolve(resp.body.length);
      });
  })
}

console.time("test");

const promises = [];
for (let i = 0; i < 50; ++i) {
    promises.push(exec(i));
}

Promise.all(promises)
.then((results) => {
    console.log("All done", results);
    console.timeEnd("test");
})
.catch((e) => {
    // Handle errors here
});


// Promise.all([exec(), exec(), exec()]).then((values) => {
//   console.log(values);
//   let end_time = process.hrtime(start_time);
//  console.log("End Time:", start_time);
// });

// for (let index = 0; index < 100; index++) {
//   exec();
// }



async function execAsync() {
  let resp = await request.get('http://www.google.com');
  console.log("Total bytes received: ", resp);
}

import { Worker, isMainThread, parentPort } from 'worker_threads';

async function main() { 
  console.time("normal");
  for (let index = 0; index < 100; index++) {
    await execAsync();
  }
  console.timeEnd("normal");  
}

//main().then(() => console.log("over!"));

// if (isMainThread) {
//   // This code is executed in the main thread and not in the worker.

//   // Create the worker.
//   const worker = new Worker('./service.js');
//   const worker2 = new Worker('./service.js');
//   const worker3 = new Worker('./service.js');
//   const worker4 = new Worker('./service.js');
//   const worker5 = new Worker('./service.js');
//   const worker6 = new Worker('./service.js');

//   console.log(worker.threadId);
//   console.log(worker2.threadId);
//   console.log(worker3.threadId);
//   console.log(worker4.threadId);
//   console.log(worker5.threadId);
//   console.log(worker6.threadId);

//   // Listen for messages from the worker and print them.
//   worker.on('message', (msg) => { console.log(msg); });
// } else {
//   // This code is executed in the worker and not in the main thread.

//   // Send a message to the main thread.
//   //parentPort.postMessage('Hello world!');
// }


// // const min = 2;
// // let primes = [];

// // function generatePrimes(start, range) {
// //     let isPrime = true;
// //     let end = start + range;
// //     for (let i = start; i < end; i++) {
// //       for (let j = min; j < Math.sqrt(end); j++) {
// //         if (i !== j && i%j === 0) {
// //           isPrime = false;
// //           break;
// //         }
// //       }
// //       if (isPrime) {
// //         primes.push(i);
// //       }
// //       isPrime = true;
// //     }
// //   }


// // if (isMainThread) {
// //     const max = 1e7;
// //     const threadCount = +process.argv[2] || 2;
// //     const threads = new Set();;
// //     console.log(`Running with ${threadCount} threads...`);
// //     const range = Math.ceil((max - min) / threadCount);
// //     let start = min;
// //     for (let i = 0; i < threadCount - 1; i++) {
// //       const myStart = start;
// //       threads.add(new Worker(__filename, { workerData: { start: myStart, range }}));
// //       start += range;
// //     }
// //     threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount)}}));
// //     for (let worker of threads) {
// //       worker.on('error', (err) => { throw err; });
// //       worker.on('exit', () => {
// //         threads.delete(worker);
// //         console.log(`Thread exiting, ${threads.size} running...`);
// //         if (threads.size === 0) {
// //           console.log(primes.join('\n'));
// //         }
// //       })
// //       worker.on('message', (msg) => {
// //         primes = primes.concat(msg);
// //       });
// //     }
// //   } else {
// //     generatePrimes(workerData.start, workerData.range);
// //     parentPort.postMessage(primes);
// //   }
