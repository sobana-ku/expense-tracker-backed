// #creating http server

// 1. import http module
// const http = require('http');
// const calculate = require("./calculator")

// const sum=calculate.add(5,3);
// const sub=calculate.sub(5,3);
// const mul=calculate.mul(5,3);
// const div=calculate.div(5,3);
// const mod=calculate.mod(5,3);


// //2.Create http server
// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/plain"});
//     // res.end("Hello World\n");
//     res.end("Addition: "+sum.toString()+ "Subtraction: "+sub.toString()+"Multiplication: "+mul.toString()+"Division: \n"+div.toString()+"Modulo: \n"+mod.toString());
// });

// //3.Start the server
// server.listen(3000,()=>{
//     console.log("Server running at http://127.0.0.1:3000/");
// });



// //#calculator 
// // .listen(3000,()=>{

// // })
// // console.log("First number:5 and second number:3",calculate.add(5,3));

// // #File system

// const fs = require('fs');
// // read
// fs.readFile('sample.txt',"utf8",(err,data)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     else{
//         console.log(data);
//     }
// })
// // write
// fs.writeFile('sample.txt', 'Hello, World!', (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//         return;
//     }
//     console.log('File written successfully!');
// });
// // append
// fs.appendFile('sample.txt', '\nAppended content!', (err) => {
//     if (err) {
//         console.error('Error appending to file:', err);
//         return;
//     }
//     console.log('Content appended successfully!');
// });
// //write again to delete
// fs.writeFile('sample1.txt', 'Hello, World!', (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//         return;
//     }
//     console.log('File written successfully!');
// });
// //delete
// fs.unlink('sample1.txt', (err) => {
//     if (err) {
//         console.error('Error deleting file:', err);
//         return;
//     }
//     console.log('File deleted successfully!');
// });

// #json

// 

/*const fs = require('fs');

const filePath = 'sample.json';

const newPerson = { name: 'priya', age: 18, city: 'tenkasi' };


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading:', err);
        return;
    }
    try {
        jsonData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return;
    }

    const newFile = [...jsonData, newPerson];

    fs.writeFile(filePath, JSON.stringify(newFile), 'utf8', (err) => {
        if (err) {
            console.error('Error writing :', err);
            return;
        }
        console.log('New person added successfully!');
    });
});*/
const fs = require('fs');
const filePath = 'sample.json';
const updatePerson = (id, updatedDetails) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData = jsonData.map((person) => 
      person.id === id ? { ...person, ...updatedDetails } : person
    );
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Person updated successfully!');
    });
  });
};

const deletePerson = (id) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let jsonData = JSON.parse(data);

    jsonData = jsonData.filter((person) => person.id !== id);
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Person deleted successfully!');
    });
  });
};


updatePerson(2, { name: "Alice", city: "London" });

deletePerson(3);
