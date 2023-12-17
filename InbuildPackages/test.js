// console.log("hello, welcome to the world of mark antony mamae !")
// console.log(global)
console.log(process.argv)
const[,,n1,n2] = process.argv
function multiply(n1,n2){
    console.log(+n1 * +n2);
}
multiply(n1,n2)