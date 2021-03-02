#!/bin/bash
#订阅名
Subname=JDTask
#需要转换的LOON订阅URL
URL=https://jdsharedresourcescdn.azureedge.net/jdresource/lxk0301_LoonTask.conf
#订阅描述
SubDesc=elecv2p订阅
#作者
SubAuthor=lmh77


#cron列表，临时生成cron.list用于读取，cron带星号不知道怎么处理筛选，最后执行删除
curl -s $URL | grep ^cron | cut -f2 -d\"|sed 's/[ \t]*$//g'|sed 's/^/"&/g'|sed 's/$/&"/g'>cron.list
#地址列表
js=(`curl -s $URL | grep ^cron | cut -f2 -d= |sed 's/[tag\t]*$//g'|sed 's/[ \t]*$//g'|sed 's/[,\t]*$//g'`)
#任务列表
name=(`curl -s $URL | grep ^cron | sed "s/.*tag=\(.*\)/\1/"`)

printf "{\n"
printf '\t"name":"'${Subname}'",\n'
printf '\t"desc":"'${SubDesc}'",\n'
printf '\t"author":"'${SubAuthor}'",\n'
printf '\t"date":"'$(date +%Y/%m/%d__%H:%M:%S)'",\n'
printf '\t"surl":"https://raw.githubusercontent.com/lmh77/A/main/elecv2p/lxk0301_cdn_elecv2p.json",\n'
printf '\t"list":[\n'
for ((i=0;i<${#name[@]};i++))
do
        printf '\t\t{\n'
        num=$(echo $((${#name[@]}-1)))
        if [ "$i" == ${num} ];
        then
                printf "\t\t\t\"name\":\"${name[$i]}\",\n"
                printf "\t\t\t\"type\":\"cron\",\n"
                printf "\t\t\t\"time\":"
                echo "$(sed -n "$(($i+1)) p" cron.list)",
                printf "\t\t\t\"job\":{\"type\":\"runjs\",\"target\":\"${js[$i]}\"}}\n"
        else
                printf "\t\t\t\"name\":\"${name[$i]}\",\n"
                printf "\t\t\t\"type\":\"cron\",\n"
                printf "\t\t\t\"time\":"
                echo "$(sed -n "$(($i+1)) p" cron.list)",
                printf "\t\t\t\"job\":{\"type\":\"runjs\",\"target\":\"${js[$i]}\"}},\n"
        fi
done
printf "\t]\n"
printf "}\n"
rm -rf cron.list