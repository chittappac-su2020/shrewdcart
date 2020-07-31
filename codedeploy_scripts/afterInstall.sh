cd /home/ubuntu
sudo pm2 stop server
sudo pm2 stop front
sudo rm  /var/lib/apt/lists/lock
sudo killall lock-frontend
sudo rm  /var/lib/apt/lists/lock
sudo killall lock-frontend
sudo rm  /var/lib/dpkg/lock
sudo rm  /var/lib/dpkg/lock-frontend
cd /
sudo chmod 757 userdata.txt
sudo cp userdata.txt /home/ubuntu
cd home/ubuntu
ip=`cat ipaddress.txt`
echo "This is the IP address value"
echo "$ip"
sudo chmod 757 ipadd.txt
sudo chmod 757 userdata.txt
echo "creating the .env file"
cat userdata.txt ipadd.txt > .env
source .env
echo "Value of IP ADDRESS"
echo $IP_ADDRESS
echo "Installing node latest version"