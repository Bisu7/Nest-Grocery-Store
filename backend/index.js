import connect from './configdb.js';
import express from 'express';
import cors from 'cors';
import {User} from './models/user.js';
import bcrypt from "bcryptjs";
connect();

const app = express();

const corsOption = {
    origin:"http://localhost",
    methods: ["GET","POST"],
    credential: true,
}
// app.use(express.json());
app.use(cors(corsOption));

app.post('/login', async(req, res)=>{
    const reqBody = req.body;
    const {email, password} = reqBody;
    const user = await User.findOne({email});
    if(!user)
    {
        res.json("user not found");
    }
    res.json("user found.");
});

// //register form
app.post('/register', async(req, res)=>{
    const reqBody = req.body;
    console.log("hey")
    console.log(reqBody);
    const { username, email, password } = reqBody;
    const user = await User.findOne({email});
    if( user)
    {
        res.json("user already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);
    
    const newUser = new User({
        email,
        username,
        password,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    res.json("new use successfully registered.");
});



app.listen(3000,() => {console.log("Running on port 3000")});
