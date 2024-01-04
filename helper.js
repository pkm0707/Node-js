import  {client}  from "./index.js";
import bcrypt from "bcrypt";

async function getAllProducts(req) {
  return await client.db("Datas").collection("products").find(req.query).toArray();
}

async function getProductById(id) {
  return await client.db("Datas").collection("products").findOne({ id: id });
}

async function AddProducts(newProducts) {
  return await client.db("Datas").collection("products").insertMany(newProducts);
}

async function deleteProductById(id) {
  return await client.db("Datas").collection("products").deleteOne({ id: id });
}

async function UpdateProducts(id,updatedProduct) {
  return await client.db("Datas").collection("products").updateOne({id:id},{$set: updatedProduct});
}

async function genPassword(password){
  const salt = await bcrypt.genSalt(10) // bcrypt.genSalt(no. of rounds)
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password,salt)
  console.log(hashedPassword);
  return hashedPassword
}

async function createuser(username,hashedPassword) {
  return await client.db("Datas").collection("Users").insertOne({username:username,password: hashedPassword});
}

async function getUserByName(username) {
  return await client.db("Datas").collection("Users").findOne({username:username});
}

export{getAllProducts,getProductById,AddProducts,deleteProductById,UpdateProducts,genPassword,createuser,getUserByName}