ls -al
pm2 stop server
pm2 stop cloud-ui
pm2 list
sudo rm -rf .circleci api client codedeployment_scripts config controllers front middlewares models test .DS_Store .gitignore README.md app.js appspec.yml package-lock.json package.json server.js
ls -al