const express = require("express");
const https = require("https");
const http = require("http");
const { validateSSLCert, validateSSLKey, validateCertKeyPair} = require("ssl-validator");
require("dotenv").config();

const { connect, isValidServiceId } = require("./database");
const { serviceName, httpPort, httpsPort } = require("./config");

(async function() {
    await connect();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(function(req, res, next) {
        if (isValidServiceId(1)) {
            next();
        } else {
            res.status(403).json({message: "no credentials sent"});
        }
    });

    app.use(require("./routes"));

    app.use("*", function(req, res) {
        res.status(404).json({message: "no route found"});
    });

    if (process.env.SSL_KEY && process.env.SSL_CERTIFICATE) {
        try {
            validateSSLCert(process.env.SSL_CERTIFICATE);
            validateSSLKey(process.env.SSL_KEY);
            validateCertKeyPair(process.env.SSL_CERTIFICATE, process.env.SSL_KEY);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        
        const httpsOptions = {
            key: process.env.SSL_KEY,
            cert: process.env.SSL_CERTIFICATE
        };
        https.createServer(httpsOptions, app).listen(httpsPort);
        http.createServer(express().use(function(req, res) {
            res.redirect(`https://${req.headers.host}${req.url}`);
        })).listen(httpPort);
        console.log(`${serviceName} running https on port: ${httpsPort}, and redirecting http on port: ${httpPort}...`);
    } else {
        http.createServer(app).listen(httpPort);
        console.log(`${serviceName} running http on port: ${httpPort}...`);
    }
})();