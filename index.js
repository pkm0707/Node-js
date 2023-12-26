// const express = require("express"); // Inbuilt Package
// const { MongoClient } = require('mongodb');
import express from 'express';
import {MongoClient} from 'mongodb';
import { productRouter } from './routes/products.js';
import * as dotenv from 'dotenv'
dotenv.config()
const app = express(); // alternate of express are hapijs,sails
const PORT = process.env.PORT
//  if it is not connected, we have to give IP address -> 127.0.0.1:27017 ### changed to atlas link
const url_mongo = process.env.url_mongo
//const dotenv = require('dotenv').config()
// console.log(process.env)
app.use(express.json()) // interpretor || converting body to json || Inbuilt middleware
function createConnection(){
  const client = new MongoClient(url_mongo);
  client.connect()
  console.log("MongoDB Connected")
  return client;
}
export const client = createConnection();

// to get the home page
app.get("/", (req, res) => {
  res.send("Hello Praveen Kumar M!");
});

app.use("/products",productRouter)



app.listen(PORT, () => console.log("Server started on the PORT", PORT));


