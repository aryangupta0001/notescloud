const mongoose = require('mongoose');

const mongoose_url = "mongodb://127.0.0.1"

const connectToMongo = async () => {
    await mongoose.connect(mongoose_url)

    console.log("Connected To Mongo Successfully");
}

module.exports = connectToMongo;