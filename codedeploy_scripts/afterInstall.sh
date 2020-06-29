cd /home/ubuntu
npm install
npm install --save nodemon
npm install --save bcrypt
npm install --save dotenv
echo "IP address value"
echo $IP_ADDRESS
echo "Installing pm2 for the backend"
sudo npm install pm2 -g -f
npm start
echo "Backend started"
pm2 list