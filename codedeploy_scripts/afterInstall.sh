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