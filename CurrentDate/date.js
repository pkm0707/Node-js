const fs = require("fs")
const CurrentDate = new Date();
const content = `Current TimeStamp : ${CurrentDate}`
const currentdate = `${CurrentDate.getDate()}.${CurrentDate.getMonth() + 1}.${CurrentDate.getFullYear()}`
const currenttime = `${CurrentDate.getHours().toLocaleString()}-${CurrentDate.getMinutes().toLocaleString()}-${CurrentDate.getSeconds().toLocaleString()} PM`
const filename = `${currentdate}-${currenttime}.txt`
fs.writeFile(`${filename}`,content,(err)=>{
    if(err) console.log("Error ❎",err)
    console.log("Good to go")
})

