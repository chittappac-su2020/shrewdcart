cd /home/ubuntu
npm install --save nodemon
npm install --save bcrypt
npm install
npm install --save dotenv
echo "IP address value"
echo $IP_ADDRESS
echo "Installing pm2 for the backend"
sudo npm install pm2 -g -f
ip=`cat ipaddress.txt`
sudo sed -i -e "s|ipaddress|$ip|g" app.js
pm2 start server.js -f --name "server" 
echo "Backend started"
pm2 list
cd front/
echo "Inside the client directory"
npm install
cd src/api
sudo sed -i -e "s|ipaddress|$ip|g" request.js
cd ../../
cd componets
sudo sed -i -e "s|ipaddress|$ip|g" Seller.js
cd ../
REACT_APP_IP_ADDRESS=$IP_ADDRESS pm2 start node_modules/react-scripts/scripts/start.js --name "front" -f