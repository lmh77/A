lmh = init();
lmh_10010 = lmh.getdata("10010ck")
headers_10010 = JSON.parse(lmh_10010)
const headers = headers_10010
function run() {
    const url2 = "https://m.client.10010.com/mobileservicequery/operationservice/queryOcsPackageFlowLeftContent";
    const body = "";
    const request2 = {
        url: url2,
        headers: headers,
        body: body
    };
    lmh.post(request2, function (error, response, data) {
        try {
            const jsons = JSON.parse(data)
            var sb = jsons.resources
            var a = sb[0]
            var b = a.details
            var i = 0,
                len = b.length
                result=""
            for (; i < len; i++) {
                const name = b[i].addUpItemName
                if (name == undefined) {
                    // 到期b[i].endDate 
                    result = result + "\n" + b[i].feePolicyName + ":使用" + b[i].use + "MB."+ "\n"
                } else {
                    result = result + b[i].addUpItemName + ":使用" + b[i].use + "MB剩余" + b[i].remain + "MB." + "\n"
                }
            }
            lmh.log(result)
            lmh.msg("中国联通", "",result)
            lmh.done()
        } catch (e) {
            lmh.log(e)
            lmh.done()
        }
    });

}

function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true;
    };
    isQuanX = () => {
        return undefined === this.$task ? false : true;
    };
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key);
        if (isQuanX()) return $prefs.valueForKey(key);
    };
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val);
        if (isQuanX()) return $prefs.setValueForKey(key, val);
    };
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body);
        if (isQuanX()) $notify(title, subtitle, body);
    };
    log = (message) => console.log(message);
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb);
        }
        if (isQuanX()) {
            url.method = "GET";
            $task.fetch(url).then((resp) => cb(null, resp, resp.body));
        }
    };
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb);
        }
        if (isQuanX()) {
            url.method = "POST";
            $task.fetch(url).then((resp) => cb(null, resp, resp.body));
        }
    };
    done = (value = {}) => {
        $done(value);
    };
    return {
        isSurge,
        isQuanX,
        msg,
        log,
        getdata,
        setdata,
        get,
        post,
        done,
    };
}
run()