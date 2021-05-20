const mongoose = require('mongoose');

//Connect to db with mongoose
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Database Connected");
}).catch(err => console.log(`CONNECTION ERROR: ${err.message}`));



// make Database connection async

// const connectDB= async()=>{
//   try{
//     const connecting=await mongoose.connect(process.env.URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     })
//     console.log(`MongoDB Connected: ${connecting.connection.host}`);
//   }catch(error){
//     console.error(`Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// }
// export default connectDB;