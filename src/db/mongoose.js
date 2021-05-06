const mongoose = require('mongoose');
// require('dotenv').config();

//Connect to db with mongoose
console.log(process.env.URI);
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log("Database Connected");
});
