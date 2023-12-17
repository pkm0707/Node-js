const fs = require("fs")
let quotes = "Dont stop until you done !"
fs.writeFile("quotes.pdf",quotes,()=>{
    console.log("writing completed")
})
fs.readFile("")
