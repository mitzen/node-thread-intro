import request from 'request';
import process from 'node:process';
import 'dotenv/config';

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
console.time("phase2");
const promises = [];
for (let i = 0; i < 50; ++i) {
    promises.push(execHttpRequest(i));
}

Promise.all(promises)
.then((results) => {
    console.log("worker task done", results);
    console.timeEnd("phase2");
})
.catch((e) => {
    // Handle errors here
});