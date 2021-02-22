lmh = init();
lmh_10010 = lmh.getdata("10010ck")
headers_10010 = JSON.parse(lmh_10010)
const headers = headers_10010
function run() {
    const url1 = "https://m.client.10010.com/MyAccount/trafficController/myAccount.htm?flag=1&cUrl=https://m.client.10010.com/myPrizeForActivity/querywinninglist.htm?pageSign=1";
    const url2 = "https://m.client.10010.com/mobileservicequery/operationservice/queryOcsPackageFlowLeftContent";
    const url3 = "https://m.client.10010.com/welfare-mall-front/mobile/show/bj2205/v2/Y";
    const body = "";
    const request1 = {
        url: url1,
        headers: headers,
        body: body
    };
    const request2 = {
        url: url2,
        headers: headers,
        body: body
    };
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
            result = tongxin+","+jiangli+","+dingxiang
            lmh.done();

        } catch (e) {
            lmh.log(e)
            lmh.done();
        }
    });
    lmh.get(request1, function (error, response, data) {
        try {
            query_result = data
                .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
                .replace(/<[^>]+?>/g, "")
                .replace(/\s+/g, " ")
                .replace(/ /g, "")
                .replace(/>/g, "");

            MB_result = query_result.match(/奖品详情兑换兑换规则(\S*)明细每日可兑换/)[1];
            lmh.log(MB_result)
            day = MB_result.match(/日流量(\S*)MB多日流量/)[1];
            week = MB_result.match(/多日流量(\S*)月流量/)[1];
            mon = MB_result.match(/月流量(\S*)流量/)[1];
            result =
                result+
                "💵  待兑换:" + "\n" +
                "🥇  日流量:" + day + "MB    " +"\n"
                "🥈  周流量:" + week + "    " +"\n"
                "🥉  月流量:" + mon +"    " 
            //lmh.log(result)
        } catch (e) {
            lmh.log(e);
            lmh.done()
        }
    });
    lmh.post(request2, function (error, response, data) {
        try {
            //lmh.log(data)
            const jsons = JSON.parse(data)
            var sb = jsons.resources
            var a = sb[0]
            var b = a.details
            var i = 0,
                len = b.length
            for (; i < len; i++) {
                const name = b[i].addUpItemName

                if (name == undefined) {
                    // 到期b[i].endDate 
                    result = result + "\n" + b[i].feePolicyName + ":\n使用" + b[i].use + "MB剩余" + b[i].remain + "MB " + "\n"
                } else {
                    result = result + "\n" + b[i].addUpItemName + ":\n使用" + b[i].use + "MB剩余" + b[i].remain + "MB " + "\n"
                }

            }
            console.log(result)
            lmh.msg("中国联通", "", result)
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