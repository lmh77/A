/*
[Script]
http-request ^https://mp\.weixin\.qq\.com/mp/getappmsgad script-path=https://gitee.com/lmh77/JSFiles/raw/master/JS/wechatads.js

[MITM]
hostname = mp.weixin.qq.com
*/

var data = {
  body: "{}",
  headers: {
    "Content-Type": "application/json"
  }
};
$done({response: data});