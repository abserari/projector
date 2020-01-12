'use strict';

const Controller = require('egg').Controller;
const Core = require('@alicloud/pop-core');

var emitterKey = "DdYjd8w_zH4UTj3OLWOqM8kSmbk9c68H";
var channel = "personinfo";

const groups = "workers"

async function face(ctx, params) {
  const client = new Core({
    accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
    accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
    endpoint: 'https://face.cn-shanghai.aliyuncs.com', // 注意修改这里
    apiVersion: '2018-12-03'
  });

  const requestOption = {
    method: 'POST'
  }

  client.request('RecognizeFace', params, requestOption).then(async (result) => {
      console.log( result.Data[0].score)
      // if (result.Data.score < 0.4) {
      //   return
      // }
      // 3. get personinfo from person id
    
      const userinfo = await ctx.service.user.find(ctx.helper.parseInt(result.Data[0].person));
      // console.log( userinfo.dataValues)
      // publish a message to the chat channel
      const ec = require('emitter-io').connect({host:"127.0.0.1", port:"8080"})
      ec.publish({
        key: emitterKey,
        channel: channel,
        message: JSON.stringify(userinfo.dataValues)
      });

    }, (ex) => {
      console.log(ex);
    })
}

class ImageInfoController extends Controller {
  async index() {
    // 1. get image path
    const ctx = this.ctx;

    // console.log("body" + ctx.request.body.imageurl.length)

    for (let i = 0 ; i< ctx.request.body.imageurl.length ; i++) {
      let params = {
        "Group": groups,
        "Content": ctx.request.body.imageurl[i]
        // "ImageUrl": ctx.queries.imageurl[0]
      }

      await face(ctx, params)
    }
    
    // 4. notify caller wait for info on emitter channel
    ctx.status = 200;
    ctx.body = {
      "please subscribe this channel to receive notifications": "personinfo"
    }

  }

  async add() {
    const ctx = this.ctx;

    const client = new Core({
      accessKeyId: 'LTAI4FcUTY6C6mReK4Eq8Bqz',
      accessKeySecret: 'WWwUZiaub9v17retzjuF6AmxcuEJ38',
      endpoint: 'https://face.cn-shanghai.aliyuncs.com',
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
      endpoint: 'https://face.cn-shanghai.aliyuncs.com',
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
