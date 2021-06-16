const { MongoClient } = require("mongodb");
const { databaseName } = require("./config");

(async function() {
    const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    const db = client.db(databaseName);

    module.exports = {
        db: db,
        disconnect: async function() {
            try {
                await client.close();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        validateServiceId: async function(id) {
            
        }
    };
})();