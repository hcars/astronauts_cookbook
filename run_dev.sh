sudo docker build --target development -t app-dev .
sudo docker run -p 3000:3000 app-dev