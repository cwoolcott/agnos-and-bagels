const mongoose = require('mongoose');


//mongodb://localhost/schools-db
mongoose.connect(
  //process.env.MONGODB_URI || "mongodb+srv://sample:sample@cluster0.1jgft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "mongodb://localhost/schools-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
