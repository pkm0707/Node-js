const express = require("express"); // Inbuilt Package
const { MongoClient } = require('mongodb');
const url_mongo = 'mongodb+srv://praveen:8nvzo3hFXiodODJy@cluster0.xqtrrxx.mongodb.net/?retryWrites=true&w=majority'; //  if it is not connected, we have to give IP address -> 127.0.0.1:27017 ### changed to atlas link
const app = express(); // alternate of express are hapijs,sails
const PORT = 5000;
const initproduct = [
  {
    id: "1",
    name: " iPhone 15",
    poster: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UY218_.jpg",
    price: "₹ 77,900 ",
    rating: 4.5,
    summary:
      "DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can see who’s calling, track your next ride, check your flight status, and so much more.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"mobile"
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    poster: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_UY218_.jpg",
    price: "₹ 1,34,900 ",
    rating: 5.0,
    summary:
      " iPhone 15 Pro has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash, water, and dust resistant.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"mobile"
  },
  {
    id: "3",
    name: "Samsung Galaxy S23 5G",
    poster: "https://m.media-amazon.com/images/I/51L8W6d-DNL._AC_UY218_.jpg",
    price: "₹ 65,320",
    rating: 4.7,
    summary:
      "FASTEST MOBILE PROCESSOR AVAILABLE: Whether you’re working hard, playing hard or doing both at the same time, smoothly switch between apps with our fastest processor ever.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"mobile"
  },
  {
    id: "4",
    name: "Samsung Galaxy S23 Ultra 5G",
    poster: "https://m.media-amazon.com/images/I/51hqXIAVXAL._AC_UY218_.jpg",
    price: "₹ 1,00,000",
    rating: 5.0,
    summary:
      "Create crystal-clear content worth sharing with Galaxy S23 Ultra’s 200MP camera — the highest camera resolution on a phone; Whether you’re posting or printing, Galaxy S23 Ultra always does the moment justice.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"mobile"
  },
  {
    id: "5",
    name: "Apple AirPods Pro-2nd G",
    poster: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UY218_.jpg",
    price: "₹ 20,999 ",
    rating: 4.8,
    summary:
      "Active Noise Cancellation reduces unwanted background noise.Adaptive Transparency lets outside sounds in while reducing loud environmental noise.Personalised Spatial Audio with dynamic head tracking places sound all around you.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"accessories"
  },
  {
    id: "6",
    name: " Apple Watch Series 9",
    poster: "https://m.media-amazon.com/images/I/81I70qV6cOL._AC_UY218_.jpg",
    price: "₹ 75,900 ",
    rating: 4.9,
    summary:
      "Smartwatch with Gold Stainless steel Case with Gold Milanese Loop One Size. Fitness Tracker, Blood Oxygen & ECG Apps, Always-On Retina Display, Water Resistant",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"watch"
  },
  {
    id: "7",
    name: " Samsung Galaxy Watch5 BT",
    poster: "https://m.media-amazon.com/images/I/61aVQDazNHL._SX679_.jpg",
    price: "₹ 22,999",
    rating: 4.5,
    summary:
      "Analysis (BIA Measurement): Monitor everything from body fat percentage (BIA) to skeletal muscle weight. All the feedback you need to track your progress.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"watch"
  },
  {
    id: "8",
    name: "SAMSUNG Galaxy Buds2 Pro",
    poster: "https://m.media-amazon.com/images/I/51m4LnFz84L._SX466_.jpg",
    price: "₹ 27,141",
    rating: 4.3,
    summary:
      "Reduce unwanted noise with Galaxy Buds2 Pro; They use Intelligent Active Noise Cancellation* to quiet even the loudest outside sounds; Tune in to what matters most without being bothered by distracting sounds around you",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"accessories"
  },
  {
    id: "9",
    name: "Apple MacBook Air Laptop",
    poster: "https://m.media-amazon.com/images/I/71vFKBpKakL._SX679_.jpg",
    price: "₹ 84,990",
    rating: 5.0,
    summary:
      "Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power.",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"laptop"
  },
  {
    id: "10",
    name: "Samsung Galaxy Book2 Pro",
    poster: "https://m.media-amazon.com/images/I/71iBfI3rAYL._SX679_.jpg",
    price: "₹ 1,10,790",
    rating: 4.9,
    summary:
      "12th Generation Intel EVOTM Core i7-1260P processor (2.1 GHz up to 4.6 GHz 18 MB L3 Cache) | Memory: 16 GB LPDDR5 Memory (On BD 16 GB) | Storage: 512 GB NVMe SSD",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"laptop"
  },
  {
    id: "11",
    name: "Titan Crest Premium Watch",
    poster:
      "https://m.media-amazon.com/images/I/71x1fHTs82L._AC_UL480_FMwebp_QL65_.jpg",
    price: "₹ 7,995",
    rating: 3.9,
    summary:
      "Titan Crest with 1.43 AMOLED Display with AOD & Industry Best 466 x 466 Pixel Resolution, SingleSync BT Calling with Advanced Chipset & Favourite Contacts Storage",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"watch"
  },
  {
    id: "12",
    name: "Seiko Men's Watch",
    poster:
      "https://m.media-amazon.com/images/I/61wuhYnVUkL._AC_UL480_FMwebp_QL65_.jpg",
    price: "₹ 31,772",
    rating: 4.9,
    summary:
      "Item Shape: Round Watch Movement Type: Quartz Case, Material Type: Stainless Steel, Dial Window Material Type: Glass",
    video: "https://www.youtube.com/embed/xqyUdNxWazA",
    category:"watch"
  },
];
// Inbuilt middleware
app.use(express.json()) // interpretor || converting body to json
function createConnection(){
  const client = new MongoClient(url_mongo);
  client.connect()
  console.log("MongoDB Connected")
  return client;
}
const client = createConnection()

// to get the home page
app.get("/", (req, res) => {
  res.send("Hello Praveen Kumar M!");
});

// to get the products page and by category also
app.get("/products", async (req, res) => {
  const {category,rating} = req.query;
  console.log(req.query,category,rating)
  if(req.query.rating){
    req.query.rating = +req.query.rating
  }
  const product = await client.db("Datas").collection("products").find(req.query).toArray()
  res.send(product);
  console.log(product);
});

// to get the products by id
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  const product = await client.db("Datas").collection("products").findOne({id:id})
  product ? res.send(product) : res.status(404).send({Message:"Product is unavailable 🙁"})
  console.log(product);
});

// to delete the products by id
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  const product = await client.db("Datas").collection("products").deleteOne({id:id})
  res.send(product);
  console.log(product);
});

// to post the products (to insert the data in products @ mongoDB in Datas)
app.post("/products", async (req,res) =>{
  const newProducts = req.body
  console.log(newProducts)
  const product = await client.db("Datas").collection("products").insertMany(newProducts)
  res.send(product)
})


app.listen(PORT, () => console.log("Server started on the PORT", PORT));

