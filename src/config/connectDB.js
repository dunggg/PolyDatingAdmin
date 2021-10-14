const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://poly_dating:polydating123@cluster0.yvdeq.mongodb.net/poly_dating?retryWrites=true&w=majority`);
        console.log('Connect Database successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;