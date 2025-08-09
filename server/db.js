const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hcl', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const productSchema = new mongoose.Schema({
  price: Number,
  image: String,
  category: String,
  title: String
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Helper functions
const add = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  console.log("-----", existingUser);
  if (existingUser.email) {
    return { success: false, message: 'User already exists' };
  }
  else {
    const user = new User(data);
    return await user.save();
  }
};

const get = async (email) => {
  return await User.findOne({ email });
};

const putProduct = async (body)=>{
  let prd = new Product(body);
  console.log(prd);
  return await prd.save();
}

const getAllProducts = async (page=1, limit=10)=>{  
  let count = await Product.countDocuments();
  console.log(count);
  const posts = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
   return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      posts
    };
  //return await Product.find();
}



module.exports = { add, get, putProduct,getAllProducts };
