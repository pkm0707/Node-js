import express from 'express';
import { genPassword } from '../helper.js';
import { createuser } from '../helper.js';
import { getUserByName } from '../helper.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router()

// register
router.post("/register", async (req, res) => {
    const {username,password} = req.body;
    console.log(username,password)
    const isUserExist = await getUserByName(username)
    console.log(isUserExist)
    if (isUserExist){
        res.status(400).send({message : "User Already Exist"})
        return;
    }
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/g.test(password)){
        res.status(400).send({message : "Password Pattern is not match"})
        return;
    }
    const hashedPassword = await genPassword(password)
    const result = await createuser(username, hashedPassword)
    res.send(result);
});

// Login
router.post("/login", async (req, res) => {
    const {username,password} = req.body;
    console.log(username,password)
    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    if (!userFromDB){
        res.status(400).send({message : "Invalid Credential"})
        return;
    }
    const storedPassword = userFromDB.password
    console.log(storedPassword)
    const isPasswordMatch = await bcrypt.compare(password,storedPassword)
    if (!isPasswordMatch){
        res.status(400).send({message : "Invalid Credential"})
        return;
    }
    const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY,{ expiresIn: 86400 })
    res.send({message:"Succesfully Logged in",token:token})
});

export const userRouter = router