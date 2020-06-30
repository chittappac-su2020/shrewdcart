cd /home/ubuntu
cd /
sudo chmod 757 userdata.txt
sudo cp userdata.txt /home/ubuntu
cd home/ubuntu
sudo chmod 757 ipadd.txt
sudo chmod 757 userdata.txt
echo "creating the .dot env file"
cat userdata.txt ipadd.txt > .env
source .env
echo "Value of IP ADDRESS"
echo $IP_ADDRESS
echo "Installing node latest version"
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs