const { exec } = require("child_process");

const version = require("fs").readFileSync("../package.json").vesion;

exec(`git tag ${version}`, (error, stdout, stderr) => {
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