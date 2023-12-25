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

// to append the file to another file (it does not override), but writefile can override the content...be carefull on this...
const phoneno = "\n04546457820"
fs.appendFile("./backup/quote-1.html",phoneno,()=>{console.log("updated...")})

// to delete the file
fs.unlink("./backup/notes-1.html",()=>{
    console.log("Deleted Succesfully 😥")
})

// to read the files in the folder available
fs.readdir("./InbuildPackages",(files)=>{
    console.log("Getting your Folder",files)
})

// to delete all files in backup folder
fs.readdir("./backup",(err,data)=>{
    data.forEach(fileName =>{
        fs.unlink("./backup",()=>{console.log("Deleted Succesfully",fileName)})
    })
})

// fs.writeFile,fs.readFile,fs.appendFile,fs.unlink => asynchronous
// fs.writeFileSync,fs.readFileSync,fs.appendFileSync,fs.unlinkSync => synchronous (uploading the file or login is must, at that time we can use synchronous code), we cannot use call back here
// writeFile => CallStack => WebGLShaderPrecisionFormat(whoever finishes writing first) => CallBaack Q => Event Loop => CallStack

// using sync functions - comes in order check the terminal
const[ , ,nooftimes] = process.argv
const quote4 = "Go ahead, make my day."
for(let i=1;i<=nooftimes;i++){
    fs.writeFileSync(`./backup/html-file/quote-${i}.html`,quote4)
        console.log(`quote is inserted in backup folder-${i} 😉`)
}
