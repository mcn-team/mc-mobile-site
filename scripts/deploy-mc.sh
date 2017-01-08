#!/bin/sh

cd ../
sed -i '' 's/m\.dev/m\.mc/' client/app/config/config.js
gulp build
mkdir tmp
cp -rv client/dist tmp/
cp client/favicon.ico tmp/
cp client/index.html tmp/
cp client/style.css tmp/
tar -cvf mcms.tar tmp/
scp mcms.tar mc:~/
rm -v mcms.tar
rm -rfv tmp/
sed -i '' 's/m\.mc/m\.dev/' client/app/config/config.js

