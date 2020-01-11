'use strict';

const Controller = require('egg').Controller;
const Core = require('@alicloud/pop-core');

const groups = "workers"
class ImageInfoController extends Controller {
  async index() {
    // 1. get image path
    const ctx = this.ctx;

    //  2. use aliyun api detect image person id
    const client = new Core({
      accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
      accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
      endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
      apiVersion: '2018-12-03'
    });
    let params = {
      "Group": groups,
      // "Content": ctx.params.image
      "ImageUrl": ctx.queries.imageurl[0]
    }

    const requestOption = {
      method: 'POST'
    };
    // call aliyun api to get id from picture
    client.request('RecognizeFace', params, requestOption).then(async (result) => {
      // console.log(result)
      // 3. get personinfo from person id
      ctx.body = await ctx.service.user.find(ctx.helper.parseInt(result.Data[0].person));
    }, (ex) => {
      console.log(ex);
    })

    // 4. notify caller wait for info on emitter channel
    ctx.status = 200;
    ctx.body = {
      "please subscribe this channel to receive notifications": channel
    }

    // ctx.status = 200
    // ctx.body = 

  }

  async add() {
    const ctx = this.ctx;

    const client = new Core({
      accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
      accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
      endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": groups,
      "Person": ctx.queries.person[0],
      "Image": "front",
      "ImageUrl": ctx.queries.imageurl[0]
    }

    console.log("params: ", params)
    const requestOption = {
      method: 'POST'
    };

    client.request('AddFace', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      ctx.body = JSON.stringify(result);
    }, (ex) => {
      console.log(ctx.queries.imageurl)
      console.log(ex);
    })

    ctx.body = {
      name: ctx.queries.person[0],
      imageurl: ctx.queries.imageurl[0]
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const client = new Core({
      accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
      accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
      endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": groups,
      "Person": ctx.queries.person[0],
      "Image": "front"
    }


    const requestOption = {
      method: 'POST'
    };

    client.request('DeleteFace', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      ctx.body = JSON.stringify(result);
      console.log(2)
    }, (ex) => {
      console.log(3)
      console.log(ex);
    })
    ctx.body = {
      name: ctx.queries.person[0]
    }
  }
}

module.exports = ImageInfoController;
