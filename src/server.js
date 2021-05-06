const path = require('path');
const app = require('./app');

const port = 8000;

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`)
});