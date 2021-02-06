/*
^https?:\/\/m.client.10010.com\/mobileservicequery\/operationservice\/queryOcsPackageFlowLeftContent url script-request-header https://raw.githubusercontent.com/lmh77/A/main/10010/getheader.js

*/
const cookieName = '中国联通'
const lmh_10010ck_Key = '10010ck'
const lmh = init()

if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('queryOcsPackageFlowLeftContent') >= 0) {
    const lmh_10010ck_Val = JSON.stringify($request.headers)
    if (lmh_10010ck_Val) lmh.setdata(lmh_10010ck_Val, lmh_10010ck_Key)
    lmh.msg(cookieName, `获取成功`, ``)
}

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
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
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
lmh.done()