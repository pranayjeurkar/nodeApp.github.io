// const http = require('http');
// const path = require('path');
// const fs = require('fs');

// const PORT = process.env.PORT || 5000;
// const server = http.createServer((req, res) => {
//     // if (req.url === '/') {
//     //     fs.readFile(path.join(__dirname, 'public1', 'index.html'), (err, content) => {
//     //         if (err) {
//     //             throw err;
//     //         }

//     //         res.writeHead(200, { 'Content-Type': 'text/html' });
//     //         res.end(content);
//     //     });
//     // }

//     // if (req.url === '/about') {
//     //     fs.readFile(path.join(__dirname, 'public1', 'about.html'), (err, content) => {
//     //         if (err) {
//     //             throw err;
//     //         }

//     //         res.writeHead(200, { 'Content-Type': 'text/html' });
//     //         res.end(content);
//     //     });
//     // }

//     // if (req.url === '/api/users') {
//     //     const users = [
//     //         {name: "Pranay", age: 27},
//     //         {name: "Amey", age: 23},
//     //     ];

//     //     res.writeHead(200, { 'Content-Type': 'application/json' });
//     //     res.end(JSON.stringify(users));
//     // }


//     // console.log(req.url);
//      let filePath = path.join(__dirname, "public1", req.url === "/" ? "index.html" : req.url);
//      const extName = path.extname(filePath);

//     //  console.log(filePath, extName);
//     //  res.end();

//      let contentType = 'text/html';
//      switch (extName) {
//          case '.js':
//             contentType = 'text/javascript';
//              break;
//          case '.html':
//             contentType = 'text/html';
//              break;
//          case '.json':
//             contentType = 'application/json';
//              break;
//          case '.jpg':
//              contentType = 'image/jpg';
//              break;
//          case '.png':
//             contentType = 'image/png';
//              break;
//          default:
//             contentType = 'text/html';
//             break;
//      }

//     // Check if contentType is text/html but no .html file extension
//     if (contentType == "text/html" && extName == "") {
//         filePath += ".html";
//     }
    

    //  fs.readFile(filePath, (err, content) => {
    //      console.log(filePath, err, contentType);
    //      if(err) {
    //          if (err.code === 'ENOENT') {
    //             fs.readFile(
    //                 path.join(__dirname, "public1", "404.html"),
    //                 (err, content) => {
    //                   res.writeHead(404, { "Content-Type": "text/html" });
    //                   res.end(content);
    //                 }
    //               );
    //             // fs.readFile(path.join(__dirname, 'public1', '404.html'), (err, result) => {
    //             //     // console.log("i am here ");
    //             //     res.writeHead(404, { "Content-Type": 'text/html' });
    //             //     res.end(result, 'utf8');
    //             // });
    //          } else {
    //             res.writeHead(500);
    //             res.end(`Server Error ${err.code}`);
    //          }
    //      } else {
    //         res.writeHead(200, { "Content-Type": contentType });
    //         res.end(content, 'utf8');
    //      }
    //  });
// })

// server.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });


const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if (req.url === '/') {
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'index.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Bob Smith', age: 40 },
  //     { name: 'John Doe', age: 30 }
  //   ];
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public1",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public1", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));