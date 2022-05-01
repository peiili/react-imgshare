#!/bin/bash
time1=$(date "+%Y%m%d%H%M%S")
echo $time1

#git fetch&&git pull

#git show --stat

#yarn config set registry https://registry.npm.taobao.org -g

#yarn config get registry

#yarn

# sudo yarn build

# back last time index.html
#ssh root@47.105.113.47 "mv /home/html/build/index.html /home/html/build/index_${time1}.html"

# sync static files
rsync -av ./dist/* aliyun:~/git/react-imgshare/dist/
ssh aliyun "pm2 restart web"
echo "done.."
#ssh other
