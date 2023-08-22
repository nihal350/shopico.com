// config/database.js
const mongoose = require('mongoose')
const uri = process.env.DB_URL;

const connectWithDb = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('DB Connected');
      }).catch((err) => {
        console.log('DB Connection failed');
        console.error(err);
        process.exit(1);
      })
}

module.exports=connectWithDb