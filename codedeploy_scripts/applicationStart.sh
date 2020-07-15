sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloudwatch-config.json -s
cd /home/ubuntu
pm2 stop server
pm2 stop front
sudo pm2 stop server
sudo pm2 stop front
npm install -g Unitech/pm2#development
pm2 update
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
sudo mkdir -p /etc/systemd/system/pm2-ubuntu.service.d
sudo touch /etc/systemd/system/pm2-ubuntu.service.d/10_auto_restart_pm2.conf
sudo echo "[Service]" >> /etc/systemd/system/pm2-ubuntu.service.d/10_auto_restart_pm2.conf
sudo echo "Restart=always" >> /etc/systemd/system/pm2-ubuntu.service.d/10_auto_restart_pm2.conf
sudo echo "RestartSec=3" >> /etc/systemd/system/pm2-ubuntu.service.d/10_auto_restart_pm2.conf
sudo systemctl daemon-reload
pm2 save 
sudo systemctl status pm2-ubuntu
npm install --save nodemon
npm install --save bcrypt
npm install
npm install --save dotenv
echo "IP address value"
echo $IP_ADDRESS
echo "Installing pm2 for the backend"
sudo npm install pm2 -g -f
ip=`cat ipaddress.txt`
# sudo sed -i -e "s|ipaddress|$ip|g" app.js
pm2 start server.js --name "server" 
echo "Backend started"
pm2 list
cd front/
echo "Inside the client directory"
npm install
cd src/api
# sudo sed -i -e "s|ipaddress|$ip|g" request.js
cd ../
cd componets
# sudo sed -i -e "s|ipaddress|$ip|g" Seller.js
cd ../../
REACT_APP_IP_ADDRESS=$IP_ADDRESS pm2 start node_modules/react-scripts/scripts/start.js --name "front" 