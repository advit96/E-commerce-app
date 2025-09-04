const express = require ("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (user) => {

   return jwt.sign( {id : user._id , role: user.role } , process.env.JWT_SECRET, { expiresIn: "7d"}
   );
};

router.post("/register" , async(req , res) => {
   try { 
    const { name , email ,password } = req.body;

    const exist = await User.findOne({email});
    if(exist) return res.status(404).json( {message: "user already exists"});
    
    const user = await user.create ({name , email , password});
    const token = generateToken(user);

    json(
        { _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
         }
    );
} catch (err) {
    res.status(500).json({ message: err.message});
}
});

router.post("/login" , async ( req , res) => {
    const { email , password } = req.body;

    try {
        const user = await User.findOne( { email });
        if(!user) return res.status(404).json( { message: "invalid email"} );

        const isMatch = user.matchPassword(password);
        if(!isMatch) return res.status(404).json( { message: "invalid password"} );

        const token = generateToken(user);

        res.json( {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token ,
          
        } );
    } catch (err) {
        res.status(500).json( { message: err.message });
    }
});

module.exports = router;