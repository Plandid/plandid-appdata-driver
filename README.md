# plandid-appdata-driver
The database driver api for allowing other Plandid services to access sensitive cross service information such as pricing schemas and ids to access databases.

# building/running

Make sure you have defined environment variables or a .env file that conforms to the .env.sample file. 
The SSL variables are optional. If you supply, them the server will serve over https.

$ npm start

Or

If you have docker installed

$ npm run build-image

$ npm run run-container

The container will serve over ports 8080 for http and if you have defined SSL environment variables it will serve https over 8443 and redirect http traffic to that port.