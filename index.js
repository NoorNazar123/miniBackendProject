const express = require("express");
const path = require("path");
const fs = require("fs");
const { log } = require("console");


const app = express(); 
const PORT = process.env.PORT || 7000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the home page
app.get('/', (req, res) => {
   fs.readdir(`./files`, function (err, files){
      res.render('index', {files:files} );    
   })     
  
});
app.get('/files/:filename', (req, res) => {
   fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata){
      res.render('show', {filename: req.params.filename, filedata: filedata});  
      
   })     
  
});

app.post('/create', (req, res) => {
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/")
     }); 
     //"some issue".splite("") => ["some", "issue"].join('') => someissue
   
});  
 
// Start the server 
app.listen(PORT, () => {
   console.log(`Server is running on port: ${PORT}`);
});
