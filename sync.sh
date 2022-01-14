#!/bin/bash
time1=$(date "+%Y%m%d%H%M%S")
echo $time1

#git fetch&&git pull

#git show --stat

#yarn config set registry https://registry.npm.taobao.org -g

#yarn config get registry

#yarn

#yarn build

# back last time index.html
ssh root@47.105.113.47 "mv /home/html/build/index.html /home/html/build/index_${time1}.html"

# sync static files
scp -r -v /mnt/e/01work/self/bing/build/* root@47.105.113.47:/home/html/build/

echo "done.."
#ssh other
