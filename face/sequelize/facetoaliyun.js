const fs = require('fs');
const Core = require('@alicloud/pop-core');

var info = [];
async function faceToaliyun() {
    for (var i = 1; i < 320; i++) {
        let base64
        // if not exist file, return and continue
        // if () {
        //     continue
        // }
        console.log(i)
        try {
            let bitmap = fs.readFileSync(`/Users/abser/go/src/github.com/yhyddr/projector/fileserver/${i}.jpg`);
            base64 = Buffer.from(bitmap, 'binary').toString('base64')
        } catch (err) {
            continue
        }

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

        var result = await client.request('AddFace', params, requestOption).then((result) => {
            let info = {
                status: 200,
                result: result
            }
            return info;
        }, (ex) => {
            let info = {
                status: 400,
                result: ex
            }
            return info
        })
        console.log(result)
        if (result.status == 400) {
            info.push(i+result.result.name)
        }
    }
}

faceToaliyun()
console.log(info.length)