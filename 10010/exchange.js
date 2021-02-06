const lmh = init()
const url = "https://m.client.10010.com/MyAccount/exchangeDFlow/exchange.htm?userLogin=76_80_81_82_83_81_81_77_81_77_84_";
const body = "productId=ff80808166c5ee6701676ce21fd14716&productName=1GB%E6%B5%81%E9%87%8F%E6%97%A5%E5%8C%85&userLogin=76_80_81_82_83_81_81_77_81_77_84_&ebCount=1000000&pageFrom=4";
lmh_10010 = lmh.getdata("10010ck")
headers_10010 = JSON.parse(lmh_10010)
const headers = headers_10010
const request = {
    url: url,
    headers: headers,
    body: body
};

lmh.post(request, function (error, response, data) {
    try {
        exchange_result = data
            .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
            .replace(/<[^>]+?>/g, "")
            .replace(/\s+/g, " ")
            .replace(/ /g, "")
            .replace(/>/g, "");
        lmh.log(exchange_result)
        lmh.msg('联通流量兑换', '', exchange_result)
        lmh.done();
    } catch (e) {
        lmh.log(e)
        lmh.done();
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
