const fs = require("fs")
const text = "Finally I am added to the text file"
// to write the file
fs.writeFile("./backup/notes.txt",text,()=>{console.log("Notes is inserted in backup folder 😉")})
// to read the file
fs.readFile("./backup/notes.txt","utf-8",(err,data)=>{
    if(err) console.log("Error ❎",err) 
    console.log("eureka ! i have readed the text inside the file(notes.txt) 🤩",data)
})
// to write the file using for loop
for(let i=1;i<=3;i++){
    fs.writeFile(`./backup/notes-${i}.html`,text,()=>{console.log("Notes is inserted in backup folder 😉")})
}
// to write the file using given input from the terminal
const[,,nooffiles]=process.argv
const quote = "If you want to shine like a sun, first burn like a sun"
for(let i=1;i<=nooffiles;i++){
    fs.writeFile(`./backup/quote-${i}.txt`,quote,()=>{console.log("quote is inserted in backup folder 😉")})
}

