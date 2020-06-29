cd /home/ubuntu
cd /
sudo chmod 757 userdata.txt
sudo cp userdata.txt /home/ubuntu
cd home/ubuntu
sudo chmod 757 ipadd.txt
sudo chmod 757 userdata.txt
cat userdata.txt
cat ipadd.txt
cat userdata.txt ipadd.txt > .env
cat .env
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