const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

app.use(cors());
app.get('/api/getUser', (req, res) => {
  const user = 'Evgeni';
  res.json(user);
})

const port = 8000;

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//Connect to db with mongoose
const uri = "mongodb+srv://talya:password1234@roomateshub.hhxlb.mongodb.net/myFinalProjectDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log("Database connect");
  });
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`)
});
