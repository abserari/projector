'use strict';

const Controller = require('egg').Controller;
const Core = require('@alicloud/pop-core');

class ImageInfoController extends Controller {
  async index() {
    // 1. get image path
    const ctx = this.ctx;
    const base64 = ctx.params.image

    //  2. use aliyun api detect image person id
    const client = new Core({
        accessKeyId: 'LTAI4FoT6xpqEFa1qEwzjuaB',
        accessKeySecret: 'Bs1kLZiWWY2NDDVHMqYaD0a2IFxZmk',
        endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
        apiVersion: '2018-12-03'
      });
      
      let params = {
        "Group": "workers",
        // "Content": base64
        "ImageUrl": "https://www.yuque.com/wbofeng/mkvtgz/1587710?artboard_type=artboard&view=&from="
      }
      
      const requestOption = {
        method: 'POST'
      };
      
      client.request('RecognizeFace', params, requestOption).then((result) => {
        console.log(JSON.stringify(result));
      }, (ex) => {
        console.log(ex);
      })

    const id = 1111
    // 3. get personinfo from person id
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(id))
  } 
}


module.exports = ImageInfoController;
