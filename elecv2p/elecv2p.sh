#!/bin/bash
#cron
grep ^cron lxk0301_LoonTask.conf| cut -f2 -d\"|sed 's/[ \t]*$//g'|sed 's/^/"&/g'|sed 's/$/&"/g'>cron.list
#脚本地址
js=(`grep ^cron lxk0301_LoonTask.conf| cut -f2 -d= |sed 's/[tag\t]*$//g'|sed 's/[ \t]*$//g'|sed 's/[,\t]*$//g'`)
#脚本名字
name=(`grep ^cron lxk0301_LoonTask.conf| sed "s/.*tag=\(.*\)/\1/"`)

printf "{\n"
printf '\t"name":"JD Task",\n'
printf '\t"desc":"该订阅仅可用于 elecV2P, 与其他软件并不兼容。",\n'
printf '\t"author":"lmh77",\n'
printf '\t"date":"'$(date +%Y%m%d)'",\n'
printf '\t"surl":"https://raw.githubusercontent.com/lmh77/A/main/elecv2p/elecv2p.json",\n'
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