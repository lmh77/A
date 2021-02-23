lmh = init();
lmh_10010 = lmh.getdata("10010ck")
headers_10010 = JSON.parse(lmh_10010)
const headers = headers_10010
function run() {
    const url3 = "https://m.client.10010.com/welfare-mall-front/mobile/show/bj2205/v2/Y";
    const body = "";
    const request3 = {
        url: url3,
        headers: headers,
        body: body
    };
    lmh.post(request3, function (error, response, data) {
        try {
            //lmh.log(data)
            const jsons = JSON.parse(data)
            const jifen =jsons.resdata.data
            tongxin = jifen[0].name + jifen[0].number
            jiangli = jifen[1].name + jifen[1].number
            dingxiang = jifen[2].name + jifen[2].number
            jf = tongxin+","+jiangli+","+dingxiang
            lmh.log(jf)
            result =
            "💵    待兑换:" + "\n" +
            "🥇    通信积分:" + tongxin + "\n" +
            "🥈    奖励积分:" + jiangli + "\n" +
            "🥉    定向积分:" + dingxiang
            lmh.log(result)
            lmh.msg("中国联通", "",result)
            lmh.done();

        } catch (e) {
            lmh.log(e)
            lmh.done();
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