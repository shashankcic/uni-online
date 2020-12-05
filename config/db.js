const mongoose = require('mongoose');
//const config = require('config');
//const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect( "mongodb://ramon:zxc123@uniufersa-shard-00-00.xlmih.mongodb.net:27017,uniufersa-shard-00-01.xlmih.mongodb.net:27017,uniufersa-shard-00-02.xlmih.mongodb.net:27017/test?ssl=true&replicaSet=atlas-ye3cu4-shard-0&authSource=admin&retryWrites=true&w=majority", {
            useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
        });

        console.log('MongoDB Connected')
    } catch (err) {
        console.error(message);
		// Exit process with failure
		process.exit(1);
    }
};

module.exports = connectDB;