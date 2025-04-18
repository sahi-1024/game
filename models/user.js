const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    name: String,
    email:{type: String,
        unique: true
    },
    password: String
})
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;

mongoose.connect('mongodb+srv://Sneha123:AhCiAMuf8DcyPE1e@cluster0.fydc8p5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ Connection error:', err.message);
});
