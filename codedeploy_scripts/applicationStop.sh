ls -al
pm2 stop server
pm2 stop cloud-ui
pm2 list
sudo rm -rf  clientside code_deployment_scripts config controllers models services test  .circleci .gitignore README.md appspec.yml package-lock.json package.json route.js server.js
ls -al