cd home/ubuntu
ls -al
pm2 stop server
pm2 stop front
pm2 list
sudo rm  /var/lib/apt/lists/lock
killall lock-front
sudo rm -rf .circleci api client codedeploy_scripts config controllers front middlewares models node_modules userdata.txt test .DS_Store .gitignore README.md app.js appspec.yml package-lock.json package.json server.js
ls -al