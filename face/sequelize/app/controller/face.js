'use strict';

const Controller = require('egg').Controller;
const Core = require('@alicloud/pop-core');

class FaceController extends Controller {
async add() {
        const ctx = this.ctx;
        const client = new Core({
            accessKeyId: 'LTAI4FoT6xpqEFa1qEwzjuaB',
            accessKeySecret: 'Bs1kLZiWWY2NDDVHMqYaD0a2IFxZmk',
            endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
            apiVersion: '2018-12-03'
        });
        
        let params = {
            "RegionId": "cn-shanghai",
            "Group": "workers",
            "Person": "wbofeng",
            "Image": "front",
            "ImageUrl": "https://www.yuque.com/wbofeng/mkvtgz/1587710?artboard_type=artboard&view=&from="
        }
        
        
        const requestOption = {
            method: 'POST'
        };
        
        client.request('AddFace', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            res = JSON.stringify(result);
            console.log(2)
        }, (ex) => {

            console.log(3)
            console.log(ex);
        })
    }
}

module.exports = FaceController;
