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
echo "creating the .dot env file"
cat .env
echo "Installing node latest version"
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - 
sudo apt-get install -y nodejs