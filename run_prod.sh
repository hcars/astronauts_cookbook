sudo docker build --target production -t app .
sudo docker run -p 80:80 app