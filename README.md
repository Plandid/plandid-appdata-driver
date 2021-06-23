# plandid-appdata-driver
The database driver api for allowing other Plandid services to access sensitive cross service information such as pricing schemas and ids to access databases.

# building
$ docker build -t plandid-appdata-driver:<version> ./

$ docker run --env-file <envfile> -p 80:8080 -p 443:8443 plandid-appdata-driver:<version>