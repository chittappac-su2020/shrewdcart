cd /home/ubuntu
npm install --save nodemon
npm install --save bcrypt
npm install
npm install --save dotenv
echo "IP address value"
echo $IP_ADDRESS
echo "Installing pm2 for the backend"
sudo npm install pm2 -g -f
npm start
echo "Backend started"
pm2 list
cd client
echo "Inside the client directory"
sudo npm install pm2 --save
echo "Starting the react app"
REACT_APP_IP_ADDRESS=$IP_ADDRESS pm2 start node_modules/react-scripts/scripts/start.js --name "client"
pm2 list
echo "End"