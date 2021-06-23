const fs = require("fs");

let packageJson = JSON.parse(fs.readFileSync("./package.json"));

let [major, feature, patch] = packageJson.version.split(".");

packageJson.version = `${major}.${feature}.${parseInt(patch) + 1}`;

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));