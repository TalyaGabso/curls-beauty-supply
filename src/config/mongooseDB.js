const mongoose = require('mongoose');

//Connect to db with mongoose
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log("Database Connected");
});
