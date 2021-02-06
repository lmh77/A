#中国联通,查询流量奖励与用量,兑换1G日包
## 配置 (Loon)
```properties
[MITM]
hostname = m.client.10010.com

[Script]
^https?:\/\/m.client.10010.com\/mobileservicequery\/operationservice\/queryOcsPackageFlowLeftContent script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/getheader.js,timeout=10, enabled=false, tag=联通获取header
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/query.js,enabled=false, tag=查询流量奖励与用量
cron "0 0 * * *" script-path=https://raw.githubusercontent.com/lmh77/A/main/10010/exchange.js,enabled=false, tag=兑换1G日包
```

## 配置 (QuanX)

```properties
[MITM]
hostname = m.client.10010.com

[rewrite_local]
^https?:\/\/m.client.10010.com\/mobileservicequery\/operationservice\/queryOcsPackageFlowLeftContent url script-request-header https://raw.githubusercontent.com/lmh77/A/main/10010/getheader.js

[task_local]
55 23 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/query.js, tag=查询流量奖励与用量, enabled=false
0 0 * * * https://raw.githubusercontent.com/lmh77/A/main/10010/exchange.js, tag=兑换1G日包, enabled=false


```
