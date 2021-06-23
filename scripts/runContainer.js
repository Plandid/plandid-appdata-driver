const { exec } = require("child_process");

const package = JSON.parse(require("fs").readFileSync("./package.json"));

const imageName = process.argv[2] ? process.argv[2] : package.name;
const version = process.argv[3] ? process.argv[3] : package.version;

exec(`docker run -d --env-file .env -p 80:8080 -p 443:8443 ${imageName}:${version}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});