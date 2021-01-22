
const senku=init()
const url = "https://games.mobileapi.hupu.com/3/7.5.8/task/getTaskReward?client=532E2388-755D-4246-AB16-7709D3360869";
const body = "time_zone=Asia%2FShanghai&client=532E2388-755D-4246-AB16-7709D3360869&advId=7D49CF49-30A1-4DAF-AA4E-0C7D65929D9D&night=0&id=1&crt=1590854837&clientId=85556581&token=MTEwOTUzMQ%3D%3D%7CMTU5MDU0NTM2MA%3D%3D%7Cdbb5d5daa93fd9cce4ea5d7159d87fd8&bddid=1943579482932103&sign=7fc3a89ca358200e8b5365ccdc34359e";
const headers = {
    "Accept-Encoding": "gzip",
    "Cookie": "ua=18498312; _gamesu=MTEwOTUzMQ%3D%3D%7CMTU5MDU0NTM2MA%3D%3D%7Cdbb5d5daa93fd9cce4ea5d7159d87fd8; pctpct=ccyvq%2FTE%2Fkw4Xxbo2ISkcCH8AzO4Z%2BwpcR7lCSjI40SsFxhyJAYxXsd1F8FjtyGVg6P0E3joWjWWTCxDKpN4Kg%3D%3D; u=19176585%7CTUVMT%2BS4tlNldmVu%7C4e79%7C04d88305cfd4a45583cc4768bcd6ab5c%7Ccfd4a45583cc4768%7CTUVMT%2BS4tueUnOWRsQ%3D%3D; us=07b43c6f0c08715d2587e730c0e190b9fb38373a347c501bf7d3ffe0b5f5230a38adfcfd966792a42f3bbe46c4a9dea0ab6b02e57815af4d9f72f528933fae6c; cpck=eyJwcm9qZWN0SWQiOiIzIiwiY2xpZW50IjoiNTMyRTIzODgtNzU1RC00MjQ2LUFCMTYtNzcwOUQzMzYwODY5IiwiaWRmYSI6IjdENDlDRjQ5LTMwQTEtNERBRi1BQTRFLTBDN0Q2NTkyOUQ5RCJ9; cid=85556581",
    "Connection": "close",
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    "Host": "games.mobileapi.hupu.com",
    "Content-Length": "300",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 isp/460.01 network/error prokanqiu/7.5.8 iPhone X"
};
const request = {
    url: url,
    headers: headers,
    body: body
};

senku.post(request, function(error, response, data) {
    try {
    	senku.log(data)
        const res=JSON.parse(data)
        //这里是以后要写的代码,大概几行就写完了
        senku.done();
        senku.msg("虎扑金豆","",`${res.result.text}`)
        
    } catch(e) {
        senku.log(e)
        senku.done();
    }
});

function init() {
  isSurge = () => {
      return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
      return undefined === this.$task ? false : true
  }
  getdata = (key) => {
      if (isSurge()) return $persistentStore.read(key)
      if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
      if (isSurge()) return $persistentStore.write(key, val)
      if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
      if (isSurge()) {
          $httpClient.get(url, cb)
      }
      if (isQuanX()) {
          url.method = 'GET'
          $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
  }
  post = (url, cb) => {
      if (isSurge()) {
          $httpClient.post(url, cb)
      }
      if (isQuanX()) {
          url.method = 'POST'
          $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
  }
  done = (value = {}) => {
      $done(value)
  }
  return {
      isSurge,
      isQuanX,
      msg,
      log,
      getdata,
      setdata,
      get,
      post,
      done
  }
}
