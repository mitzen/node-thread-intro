import request from 'request';
import process from 'node:process';
import 'dotenv/config';

console.log(process.env.UV_THREADPOOL_SIZE);

function execHttpRequest(i: number): Promise<void>  {
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

////////////////////////////////////////////////
console.time("phase1");
const promises = [];
for (let i = 0; i < 50; ++i) {
  promises.push(execHttpRequest(i));
}

Promise.all(promises)
.then((results) => {
  console.log("main task", results);
  console.timeEnd("phase1");
})
.catch((e) => {
  // Handle errors here
});

const threadCount=3;
import { Worker, isMainThread, parentPort } from 'worker_threads';

const threads = new Set<Worker>();
for (let i = 0; i < threadCount - 1; i++) 
{
  threads.add(new Worker('./service.js'));
}

for (let worker of threads) {
  worker.on('error', (err) => { throw err; });
  worker.on('exit', () => {
    threads.delete(worker);
    console.log(`Thread exiting, ${threads.size} running...`);
    // if (threads.size === 0) {
    //   //console.log(primes.join('\n'));
    // }
  })
  worker.on('message', (msg) => {
    console.log(msg);
  });
}

