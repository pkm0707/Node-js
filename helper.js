import  {client}  from "./index.js";

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


export{getAllProducts,getProductById,AddProducts,deleteProductById,UpdateProducts}