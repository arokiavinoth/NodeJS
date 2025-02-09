const { error } = require("console");
let fs = require("fs");

/*fs.writeFile('mycode.txt', 'our code is inbuilt.', (err)=>{
    if(err) throw err;
    console.log('File Created.') 
});*/

// fs.appendFile("mycode.txt", "I am appending a line. \n", (err) => {
//   if (err) throw err;
//   console.log("File Appended.");
// });

// fs.readFile("mycode.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.unlink("mycode1.txt", (err) => {
//   if (err) throw err;
//   console.log("File Deleted.");
// });

fs.rename("mycode.txt", "mytext.txt", (err) => {
  if (err) throw err;
  console.log("File Renamed.");
});
