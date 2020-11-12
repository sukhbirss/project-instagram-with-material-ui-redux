const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


const {MONGOURL} = require('./config/keys');

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));
mongoose.connection.on('error',(err)=>{
	console.log("err in mongodb connection",err)
})

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

