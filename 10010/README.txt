## 中国联通
## 查询流量礼包
## 查询积分
## 查询流量详细用量
## 营业厅我的礼包兑换1G日包
## header获取点主页进已用流量，查明细即可获取
## 配置 (Loon)
```properties
[MITM]
hostname = m.client.10010.com

[Script]
http-request ^https?:\/\/m.client.10010.com\/mobileservicequery\/operationservice\/queryOcsPackageFlowLeftContent script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/getheader.js,timeout=10, enabled=true, tag=联通获取header
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/querygif.js,enabled=true, tag=流量礼包
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/queryjf.js,enabled=true, tag=查询积分
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/queryll.js,enabled=true, tag=查询流量用量
cron "0 0 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/exchange.js,enabled=true, tag=兑换1G日包
```

## 配置 (QuanX)

```properties
[MITM]
hostname = m.client.10010.com

[rewrite_local]
^https?:\/\/m.client.10010.com\/mobileservicequery\/operationservice\/queryOcsPackageFlowLeftContent url script-request-header https://raw.githubusercontent.com/lmh77/A/main/10010/getheader.js

[task_local]
55 23 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/querygif.js, tag=流量礼包, enabled=true
55 23 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/queryjf.js, tag=查询积分, enabled=true
55 23 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/queryll.js, tag=查询流量用量, enabled=true
0 0 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/exchange.js, tag=兑换1G日包, enabled=true


```
