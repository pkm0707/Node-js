import { getAllProducts, getProductById, deleteProductById, AddProducts,UpdateProducts} from '../helper.js';
import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router() // express router

// to get the products page and by category also
  router.get("/",auth, async (req, res) => {
    const {category,rating} = req.query;
    console.log(req.query,category,rating)
    if(req.query.rating){
      req.query.rating = +req.query.rating
    }
    const product = await getAllProducts(req)
    res.send(product);
    console.log(product);
  });
  
  // to get the products by id
  router.get("/:id",auth, async (req, res) => {
    const { id } = req.params;
    console.log(req.params, id);
    const product = await getProductById(id)
    product ? res.send(product) : res.status(404).send({Message:"Product is unavailable 🙁"})
    console.log(product);
  });
  
  // to delete the products by id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.params, id);
    const product = await deleteProductById(id)
    res.send(product);
    console.log(product);
  });
  
  // to post the products (to insert the data in products @ mongoDB in Datas)
  router.post("/", async (req,res) =>{
    const newProducts = req.body
    console.log(newProducts)
    const product = await AddProducts(newProducts)
    res.send(product)
  })

  // to update the products
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body
    console.log(req.params, id);
    const product = await UpdateProducts(id,updatedProduct)
    res.send(product);
    console.log(product);
  });
 export const productRouter = router