const fs = require('fs');
const Core = require('@alicloud/pop-core');


let i = 274
let base64
// if not exist file, return and continue
// if () {
//     continue
// }
console.log(i)

let bitmap = fs.readFileSync(`/Users/abser/go/src/github.com/yhyddr/projector/fileserver/${i}.jpg`);
base64 = Buffer.from(bitmap, 'binary').toString('base64')


const client = new Core({
    accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
    accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
    endpoint: 'https://face.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-12-03'
});

let params = {
    "Group": "workers",
    "Person": i,
    "Image": "front",
    "Content": base64
}

const requestOption = {
    method: 'POST'
};

client.request('AddFace', params, requestOption).then((result) => {
    console.log(result)
}, (ex) => {
    console.log(ex)
})
