lmh = init();
lmh_10010 = lmh.getdata("10010ck")
headers_10010 = JSON.parse(lmh_10010)
const headers = headers_10010
function run() {
    const url1 = "https://m.client.10010.com/MyAccount/trafficController/myAccount.htm?flag=1&cUrl=https://m.client.10010.com/myPrizeForActivity/querywinninglist.htm?pageSign=1";
    const body = "";
    const request1 = {
        url: url1,
        headers: headers,
        body: body
    };
    lmh.get(request1, function (error, response, data) {
        try {
//lmh.log(data)
            query_result = data
                .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
                .replace(/<[^>]+?>/g, "")
                .replace(/\s+/g, " ")
                .replace(/ /g, "")
                .replace(/>/g, "");
//lmh.log(query_result)

            MB_result = query_result.match(/奖品详情兑换兑换规则(\S*)流量明细累计获取/)[1];
lmh.log(MB_result)
            day = MB_result.match(/日流量(\S*)MB本月到期日流量/)[1];
            week = MB_result.match(/多日流量(\S*)本月到期多日流量/)[1];
            mon = MB_result.match(/月流量(\S*)本月到期月流量/)[1];
            result =
            "💵    待兑换:" + "\n" +
            "🥇    日流量:" + day + "MB\n" +
            "🥈    周流量:" + week + "\n" +
            "🥉    月流量:" + mon 
            lmh.log(result)
            lmh.msg("中国联通", "",result)
            lmh.done()
        } catch (e) {
            lmh.log(e);
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
