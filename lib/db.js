const mongoose = require("mongoose");
//  MongoDB url
const mlab_uri = process.env.mlab_uri;

const db = () => {
    return {
        config: conf => {
            mongoose.connect(
                mlab_uri,
                { useNewUrlParser: true }
            );
            let db = mongoose.connection;
            db.on("error", console.log.bind(console, "Error on database"));
            db.once("open", () => {
                console.log("MongoDB is connected");
            });
        }
    };
};

module.exports = db();
