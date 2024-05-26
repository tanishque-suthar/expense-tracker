const loginSchema = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginFunc = async(req,res,next)=>{
    try {
        const { username, password } = req.body;
        if(!username || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await loginSchema.findOne({ username });
        if(!user){
          return res.json({message:'Incorrect username' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password' }) 
        }
         const token = createSecretToken(user._id);
         res.cookie("token", token, {
           withCredentials: true,
           httpOnly: false,
         });
         res.status(201).json({ message: "User logged in successfully", success: true });
         next()
      } catch (error) {
        console.error(error);
    }
}

exports.signupFunc = async(req,res,next)=>{
    try {
        const { username, password} = req.body;
        const existingUser = await loginSchema.findOne({ username });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await loginSchema.create({ username, password });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res
          .status(201)
          .json({ token:token, message: "User signed in successfully", success: true, user });
        next();
      } catch (error) {
        console.error(error);
      }
}

createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {expiresIn: 3 * 24 * 60 * 60,});
};

module.exports.userVerification = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
  }