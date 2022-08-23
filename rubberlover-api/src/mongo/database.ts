import mongoose from 'mongoose';

const uri = 'mongodb://root:password@localhost:27017/rubberloverdb?authSource=admin&readPreference=primary';
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

export default db;