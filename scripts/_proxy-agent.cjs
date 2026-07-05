/* 轻量 HTTPS 代理 agent（无外部依赖，仅本地抓取用）。
 * CI 无需代理，不会 require 此文件。
 * 用法：const agent=new HttpsProxyAgent('http://127.0.0.1:10808');
 *      https.get(url,{agent},cb)
 */
"use strict";
const http=require('http');
const tls=require('tls');
const {URL}=require('url');
const https=require('https');

class HttpsProxyAgent extends https.Agent{
  constructor(proxyUrl){
    super();
    const u=new URL(proxyUrl);
    this.proxyHost=u.hostname;this.proxyPort=u.port||(u.protocol==='https:'?443:80);
  }
  createConnection(opts,callback){
    const req=http.request({
      host:this.proxyHost,port:this.proxyPort,method:'CONNECT',
      path:`${opts.host}:${opts.port}`,
      headers:{Host:`${opts.host}:${opts.port}`}
    });
    req.setTimeout(15000,()=>{req.destroy(new Error('代理CONNECT超时'));});
    req.on('connect',(res,socket)=>{
      if(res.statusCode!==200){callback(new Error('代理CONNECT失败 '+res.statusCode));return;}
      const tlsSock=tls.connect({socket,servername:opts.host,rejectUnauthorized:false},()=>callback(null,tlsSock));
      tlsSock.on('error',callback);
    });
    req.on('error',callback);
    req.end();
  }
}
module.exports=HttpsProxyAgent;
