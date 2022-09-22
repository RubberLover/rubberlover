import mongoose from 'mongoose';

const uri = process.env.MONGO_URI ? process.env.MONGO_URI : '';
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

export default db;