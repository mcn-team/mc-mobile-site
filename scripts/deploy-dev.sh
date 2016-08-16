#!/bin/sh

cd ../
gulp build
mkdir tmp
cp -rv client/dist tmp/
cp client/favicon.ico tmp/
cp client/index.html tmp/
cp client/style.css tmp/
tar -cvf mcms.tar tmp/
scp mcms.tar devmc:~/
rm -v mcms.tar
rm -rfv tmp/

