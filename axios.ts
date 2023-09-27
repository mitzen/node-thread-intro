import axios from 'axios';

console.time("axios");
const promises = [];
for (let i = 0; i < 50; ++i) {
  promises.push(execHttpRequest(i));
}

Promise.all(promises)
.then((results) => {
  console.log("main task", results);
  console.timeEnd("axios");
})
.catch((e) => {
  // Handle errors here
});

function execHttpRequest(i: number): Promise<number>
{
    return new Promise((resolve, reject) => { 
        axios.get('https://www.google.com')
        .then(response => {
            console.log(response.status, i);
            resolve(response.data);
            //resolve(response);
        })
        .catch(error => {
            console.error('ops', error);
            reject(error);
        });
    });
}

