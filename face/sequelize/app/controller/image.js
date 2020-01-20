'use strict';

const Controller = require('egg').Controller;
// To-do: aliyun client should be resultful API. It's simple to add timeout etc. attribute.
const Core = require('@alicloud/pop-core');
const { performance } = require('perf_hooks');
const fs = require('fs');

// emitter config
const emitterKey = 'DdYjd8w_zH4UTj3OLWOqM8kSmbk9c68H';
const emitterChannel = 'personinfo';
const ec = require('emitter-io').connect({ host: "127.0.0.1", port: "8080" })

// aliyun config
const aliyunTimeOut = 2000
const aliyunGroups = 'workers'
const aliyunImageNumber = 'front'
const accessKeyId = 'LTAI4FcUTY6C6mReK4Eq8Bqz'
const accessKeySecret = 'WWwUZiaub9v17retzjuF6AmxcuEJ38'
const aliyunEndpoint = 'https://face.cn-shanghai.aliyuncs.com'

var myDate = new Date();


async function face(ctx) {
  const client = new Core({
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: aliyunEndpoint,
    apiVersion: '2018-12-03'
  });

  const requestOption = {
    method: 'POST'
  }
  
  for (let i = 0; i < ctx.request.body.imageurl.length; i++) {
    let start = performance.now()
    let params = {
      "Group": aliyunGroups,
      "Content": ctx.request.body.imageurl[i]
      // "ImageUrl": ctx.queries.imageurl[0]
    }

    let timeout = false
    var j = setTimeout(() => { timeout = true }, aliyunTimeOut)
    // set timeout 2000 ms 
    client.request('RecognizeFace', params, requestOption).then(async (result) => {
      if (timeout == true) {
        ctx.logger.warn(`timeout`)
        ec.publish({
          key: emitterKey,
          channel: emitterChannel,
          message: JSON.stringify("timeout")
        });
        return
      }

      var dataBuffer = new Buffer(ctx.request.body.imageurl[i], 'base64');
      fs.writeFile(`/Users/abser/image/${myDate.toLocaleTimeString()}--${result.Data[0].person}-${result.Data[0].score}.png`, dataBuffer, function (err) {
        if (err) {
          console.log(err);
        } else {
        }
      });

      if (result.Data[0].score < 0.42) {
        console.log(result.Data[0].person + ' too low score : '+ result.Data[0].score)
        return
      }
      clearTimeout(j)

      console.log(result.Data[0].person + ' face yes ------------------- '+result.Data[0].score)

      ctx.logger.info(`This image ${result.Data[0].person} score is ${result.Data[0].score}`)
      // 3. get personinfo from person id
      // console.log(result.Data[0])
      const userinfo = await ctx.service.user.find(ctx.helper.parseInt(result.Data[0].person));

      userinfo.dataValues.timespend =  performance.now()-start;
      userinfo.dataValues.score = result.Data[0].score
      // console.log(userinfo.dataValues)
      // publish a message to the chat channel
      ec.publish({
        key: emitterKey,
        channel: emitterChannel,
        message: JSON.stringify(userinfo.dataValues)
      });
    }, (ex) => {
      console.log(ex);
    })
  }
}

class ImageInfoController extends Controller {
  async index() {
    // 1. get image path
    const ctx = this.ctx;
    // console.log("body" + ctx.request.body.imageurl.length)
    console.time('face')
    // get image and call aliyun face Endpoint
    face(ctx)
    console.timeEnd('face')
    // 4. notify caller wait for info on emitter channel
    ctx.status = 200;
    ctx.body = {
      "please subscribe this channel to receive notifications": "personinfo"
    }
  }

  async add() {
    const ctx = this.ctx;

    const client = new Core({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      endpoint: aliyunEndpoint,
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": aliyunGroups,
      "Person": ctx.request.body.Person,
      "Image": ctx.request.body.Image || aliyunImageNumber,
      "ImageUrl" : ctx.request.body.ImageUrl
    }

    console.log("params: ", params)
    const requestOption = {
      method: 'POST'
    };

    var result = await client.request('AddFace', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      let info = {
        status:200,
        result: result
      }
      return info
    }, (ex) => {
      console.log(ctx.request.body.ImageUrl)
      console.log(ex);
      let info = {
        status:400,
        result: ex
      }
      return info
    })
    ctx.body = result
    ctx.status = result.status
  }

  async addByBase64() {
    const ctx = this.ctx;

    const client = new Core({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      endpoint: aliyunEndpoint,
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": aliyunGroups,
      "Person": ctx.request.body.Person,
      "Image": ctx.request.body.Image || aliyunImageNumber,
      "Content": ctx.request.body.Content
    }

    console.log("params: ", params)
    const requestOption = {
      method: 'POST'
    };

    var result = await client.request('AddFace', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      let info = {
        status:200,
        result:result
      }
      return info;
    }, (ex) => {
      let info = {
        status: 400,
        result: ex
      }
      console.log(ex);
      return info
    })
    ctx.status = result.status
    ctx.body = result
  }

  async destroy() {
    const ctx = this.ctx;
    const client = new Core({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      endpoint: aliyunEndpoint,
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": aliyunGroups,
      "Image": ctx.request.body.Image || aliyunImageNumber,
      "Person":  ctx.request.body.Person
    }

    console.log(params)
    const requestOption = {
      method: 'POST'
    };

    var result = await client.request('DeleteFace', params, requestOption).then((result) => {
      let quote = 'delete '+ctx.request.body.Person + ' '+ ctx.request.body.Image+ ' ' +aliyunImageNumber
      console.log('delete '+ctx.request.body.Person + ' '+ ctx.request.body.Image)
      console.log(JSON.stringify(result));
      let info = {
        status: 200,
        result: result,
        quote:quote
      }
      return info
    }, (ex) => {
      console.log(ex);
      let info = {
        status: 400,
        ex: ex
      }
      return info
    })
    ctx.status = result.status
    ctx.body = result
  }

  async list() {
    const ctx = this.ctx;
    const client = new Core({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      endpoint: aliyunEndpoint,
      apiVersion: '2018-12-03'
    });

    let params = {
      "Group": aliyunGroups,
    }

    const requestOption = {
      method: 'POST'
    };

    var result = await client.request('ListFace', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      let info = {
        status:200,
        result:result
      }
      return info
    }, (ex) => {
      let info = {
        status:400,
        ex:ex
      }
      console.log(ex);
      return info
    })
    
    ctx.body = result
    ctx.status = result.status
  }
}

module.exports = ImageInfoController;
