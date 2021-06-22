# plandid-appdata-driver
The database driver api for allowing other Plandid services to access sensitive cross service information such as pricing schemas and ids to access databases.

# building
$ Docker build -t plandid-appdata-driver:<version> ./

$Docker run --env-file <envfile> -p 80:6080 443:6443 plandid-appdata-driver:<version>