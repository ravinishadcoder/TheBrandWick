const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const userController = {
    signup : async (req,res)=>{
        try{
            const { email, password } = req.body;
            // Check if user already exists
            let user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({ message: "User already registered." });
            }
            const newUser = new User({email,password});
            // Encrypt the password
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();
            return res.status(200).send({
                message: "Signup Successful",
                email: newUser.email,
              });
        }catch(e){
            res.status(401).send({message:'something went wrong'});
        }
    },
    login: async (req,res)=>{
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({message:'User does not exist'});
            } 
            //check if password is correct
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword ) {
                return res.status(401).send({message:'Password is incorrect'});
            } else {
                let token = jwt.sign({ id: user._id,email: user.email}, process.env.SECRET);
                return res.status(200).send({ message: "login successful", token: token });
            }
        }catch(e){
            res.status(401).send({message:'something went wrong'});
        }
    }
}

module.exports = userController;